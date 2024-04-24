// packages
const mariadb = require('mariadb');
const fs = require('fs');
const mysql = require('mysql2');
const { promisify } = require('util');

// envrionmentVariables
require('dotenv').config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const sqlTablePath = './model/01_schema.sql';
const sqlPopulatePath = './model/02_init.sql';

console.log(dbHost)
console.log(dbUser)
console.log(dbPassword)

//database setup
let databaseConnection;

const connectToDatabase = new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      databaseConnection = mysql.createConnection({
          
          //host: "db",  //uncomment this if using docker
          //user: "root", //uncomment this if using docker
          //password: "password" //uncomment this if using docker

          // host: "localhost", //uncomment this if using XAMPP
          // user: "root", //uncomment this if using XAMPP
          // password: "" //uncomment this if using XAMPP

          host: 'roundhouse.proxy.rlwy.net', //uncomment for hosted site
          user: 'root', //uncomment for hosted site
          password: '', //uncomment for hosted site
          port: '42503', //uncomment for hosted site
          database: 'mmgadb' //uncomment for hosted site
      });

      console.log(`Connected!`);

      //creates the database if it does not exist already
      databaseConnection.query("CREATE DATABASE IF NOT EXISTS mmgadb", (err, results) => {
        if (err) {
            console.error('Error creating database:', err);
            reject(err);
            return;
        }
        console.log('Database "mmgadb" created');
      });

      databaseConnection.query("USE mmgadb", (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
          return;
        }
        console.log('"Use mmgadb" executed successfully');
      });

      const executeSqlFile = (filePath, connection) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(`Error reading SQL file ${filePath}:`, err);
            reject(err);
            return;
          }
      
          // Split SQL file into individual queries
          const queries = data.split(';').filter(query => query.trim() !== '');
      
          // Execute each query
          queries.forEach(query => {
            connection.query(query, (err, results) => {
              if (err) {
                console.error(`Error executing query from ${filePath}:`, err);
                reject(err);
                return;
              }
              console.log(`Query from ${filePath} executed successfully`);
            });
          });
        });
      };

      executeSqlFile("./db_init/01_schema.sql", databaseConnection);
      // executeSqlFile("./db_init/02_init.sql", databaseConnection);

      // Resolve the promise with the database connection
      resolve(databaseConnection);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }, 15000); //delay can be decreased to 0 when running on XAMPP
});

module.exports = connectToDatabase;
