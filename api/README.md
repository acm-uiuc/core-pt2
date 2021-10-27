# Express JWT Template

A Basic Express application that does user registration and authentication through JWT. Runs on top of a Postgres Database (managed with Sequelize) but could easily use any other database (done easily by changing the sequelize dialect.)

Requires a few customizations to run, namely editing the `.env` file, and filling in some info in the `services/mailService.js` file.