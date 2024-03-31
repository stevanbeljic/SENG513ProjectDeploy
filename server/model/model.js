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

  try {
      // Create a new connection
      databaseConnection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
      });

      // Print connection thread
      console.log(`Connected!`);
  } catch (err) {
      // Print error
      console.log(err);
  }

  //creates the database if it does not exist already
  databaseConnection.query("CREATE DATABASE IF NOT EXISTS MMGADB", (err, results) => {
    if (err) {
        console.error('Error creating database:', err);
        return;
    }
    console.log('Database "mmgadb" created');
  });

  databaseConnection.query("USE MMGADB", (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('"Use mmgadb" executed successfully');
  });


  const executeSqlFile = (filePath, connection) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading SQL file ${filePath}:`, err);
        return;
      }
  
      // Split SQL file into individual queries
      const queries = data.split(';').filter(query => query.trim() !== '');
  
      // Execute each query
      queries.forEach(query => {
        connection.query(query, (err, results) => {
          if (err) {
            console.error(`Error executing query from ${filePath}:`, err);
            return;
          }
          console.log(`Query from ${filePath} executed successfully`);
        });
      });
    });
  };

  executeSqlFile("./db_init/01_schema.sql", databaseConnection);
  executeSqlFile("./db_init/02_init.sql", databaseConnection);

  /*
    // Read SQL file
    fs.readFile("./db_init/01_schema.sql", 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading SQL file:', err);
        return;
      }
  
      // Split SQL file into individual queries
      const queries = data.split(';').filter(query => query.trim() !== '');
  
      // Execute each query
      queries.forEach(query => {
        databaseConnection.query(query, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          console.log('Query executed successfully');
        });
      });
    });
*/
    module.exports = databaseConnection;