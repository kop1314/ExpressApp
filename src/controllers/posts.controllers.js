const {
    Post,
    Photo,
} = require('../../models');

const {
    uploadToS3,
} = require('../service/awsS3.service');

const TWO_SEC_AGO = "2s ago";
const TEN_DAY_AGO = "10d ago";
const FOUR_WEEK_AGO = "4w ago";
const EIGHT_MON_AGO = "8m ago";
const ONE_YEAR_AGO = "1yr ago";

const SEC_TO_MILLISEC = 1000;
const DAY_TO_MILLISEC = 24 * 60 * 60 * SEC_TO_MILLISEC;
const WEEK_TO_MILLISEC = 7 * DAY_TO_MILLISEC;
const MONTH_TO_MILLISEC = 30.4167 * DAY_TO_MILLISEC;
const YEAR_TO_MILLISEC = 365 * DAY_TO_MILLISEC;



async function createPost(req, res) {
    try {
    
        const {title, description} = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Missing input!"
            })
        }

        //create Post in db
        const post = await Post.create({
            title: title,
            description: description,
            userId: req.user.id,
        });


        //upload to AWS S3 and create Photo in db
        if (req.files) {
            const results = await uploadToS3(req.files);
            results.map(async (result) => {
                await Photo.create({
                    postId: post.id,
                    photoUrl: result.Location,
                })
            })
        }


        return res.status(201).json({
            message: 'Post was created successfully!'
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}

async function getPhotoUrlsByPostId(postId) {
    var photoUrls = [];
    const photos = await Photo.findAll({
        where: {
            postId: Number(postId)
        }
    });
    photos.forEach((photo) => {
        photoUrls.push(photo.photoUrl);
    });
    
    return photoUrls;
}

function calculateTimeDiff(createdTime) {
    var createdDate = new Date(createdTime);
    return Date.now() - createdDate.getTime();
}

async function getPostsByUserIdWrapper(posts) {
    var results = [];

    await Promise.all(posts.map(async (post) => {
        const photoUrls = await getPhotoUrlsByPostId(post.id);
        //console.log(photoUrls);
        var timeDiff = "";
        timeInMilliSec = calculateTimeDiff(post.createdAt);
        if (timeInMilliSec/YEAR_TO_MILLISEC > 1){
            timeDiff = ONE_YEAR_AGO;
        } else if (timeInMilliSec/MONTH_TO_MILLISEC > 8) {
            timeDiff = EIGHT_MON_AGO;
        } else if (timeInMilliSec/WEEK_TO_MILLISEC > 4) {
            timeDiff = FOUR_WEEK_AGO;
        } else if (timeInMilliSec/DAY_TO_MILLISEC > 10) {
            timeDiff = TEN_DAY_AGO;
        } else {
            timeDiff = TWO_SEC_AGO;
        }
    
        const result = {
            id: post.id,
            title: post.title,
            description: post.description,
            userId: post.userId,
            timeDiff: timeDiff,
            photoUrls: photoUrls
        }
    
        results.push(result);
    }));

    //console.log(results);
    return results;
}

async function getPostsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        
        //missing userId
        if (!userId) {
            return res.status(400).json({
                message: "Missing userId!"
            })
        }

        //userId is valid number
        if (!isNaN(userId)) {
            const posts = await Post.findAll({
                where:{
                    userId: Number(userId)
                }
            })

            const results = await getPostsByUserIdWrapper(posts);
            //console.log(results);
            return res.status(200).json(results);
        }

        return res.status(400).json({
            message: "Invalid route params type!"
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }

}

module.exports = {
    createPost,
    getPostsByUserId,
}