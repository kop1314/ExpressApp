const http = require("http");
const app = require("./src/app");

require('dotenv').config();

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})