require('dotenv').config();

module.exports = {
    "development": {
        "username": "postgres",
        "password": "admin",
        "database": "database_development",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      "production": {
        "username": process.env.RDS_USERNAME,
        "password": process.env.RDS_PASSWORD,
        "database": process.env.RDS_DB_NAME,
        "host": process.env.RDS_HOSTNAME,
        "dialect": "postgres"
      }
}