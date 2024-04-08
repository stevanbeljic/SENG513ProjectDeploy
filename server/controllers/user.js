const express = require('express');
const router = express.Router();
const databaseConnection = require('../model/model');
const mariadb = require('mariadb');
const bcrypt = require('bcryptjs');
const saltTime = 2;



module.exports = function(databaseConnection) {
  const router = express.Router();


  
router.post('/confirmRequest', (req, res) => {
  const {username} = req.query;
  const {friendUsername} = req.query;
  databaseConnection.query('INSERT IGNORE INTO `friends`(`user1_id`, `user2_id`) SELECT (SELECT id FROM users WHERE username=?), (SELECT id FROM users WHERE username=?)', [username, friendUsername], (err, results) => {
    if(err){
      console.error("Error executing insertion query ", err);
      return res.status(500).send('Internal server error');
    }
    databaseConnection.query('DELETE FROM friendrequests WHERE requestTo = (SELECT id FROM users WHERE username = ?) AND requestFrom = (SELECT id FROM users WHERE username = ?)', [username, friendUsername], (err, results) => {
      if(err){
        console.error("Error executing deletion query");
        return res.status(500).send('Internal server error');
      }
    });
    return res.sendStatus(200);
  });
});

router.post('/rejectRequest', (req, res) => {
  const {username} = req.query;
  const {friendUsername} = req.query;
  databaseConnection.query('DELETE FROM friendrequests WHERE requestTo = (SELECT id FROM users WHERE username = ?) AND requestFrom = (SELECT id FROM users WHERE username = ?)', [username, friendUsername], (err, results) => {
    if(err){
      console.error("Error executing deletion query");
      return res.status(500).send('Internal server error');
    }
    return res.sendStatus(200);
  });

});

router.post('/sendRequest', (req, res) => {
  const {username} = req.query;
  const {friendUser} = req.query;

  databaseConnection.query('SELECT id FROM users WHERE username = ?', [username], (error1, result) =>{
    if(error1){
      console.error("Error executing search query", error1);
      return res.status(500).send('Internal server error');
    }
    let userID = result[0].id;
    databaseConnection.query('SELECT username FROM users WHERE id IN (SELECT user2_id from friends WHERE user1_id = ? UNION SELECT user1_id from friends WHERE user2_id = ?)', [userID, userID], (error, result) =>{
      if(error){
        console.error("Error executing search query", error);
        return res.status(500).send('Internal server error');
      }
      for(let friend of result){
        if(friend.username == friendUser){
          //already friends with requested friend
          return res.sendStatus(409);
        }
      }

      databaseConnection.query('INSERT IGNORE INTO `friendrequests` (`requestTo`, `requestFrom`) SELECT (SELECT id FROM users WHERE username=?), (SELECT id FROM users WHERE username=?)', [friendUser, username], (err, results) => {
        if(err){
          console.error("Error executing send friend request query", err);
          return res.status(500).send('Internal server error');
        }
        return res.sendStatus(200);
      });
    });
  });
});

router.get('/getFriends', (req, res) => {
  const {username} = req.query;

  databaseConnection.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
    if(err){
      console.error("Error executing user query: ", err);
      return res.status(500).send('Internal server error');
    }

    if(results.length != 1){
      return res.status(400).send('Could not uniquely identify user');
    }

    let userId = results[0].id;

    databaseConnection.query('SELECT username FROM users WHERE id IN (SELECT user2_id from friends WHERE user1_id = ? ' +
                             'UNION '+
                             'SELECT user1_id from friends WHERE user2_id = ?)', [userId, userId], (error, friendResult) => {
                              if(error){
                                console.error("Unable to perform friends query: ", error);
                                return res.status(500).json({message: 'Internal server error'});
                              }

                              return res.status(200).json(friendResult);
                             });
  });

});

router.get('/getIncomingFriendRequests', (req, res) => {
  const {username} = req.query;
  databaseConnection.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
    if(err){
      console.error("Error executing user query: ", err);
      return res.status(500).send('Internal server error');
    }

    if(results.length != 1){
      return res.status(400).send('Could not uniquely identify user');
    }

    let userId = results[0].id;

    databaseConnection.query('SELECT username FROM users WHERE id IN (SELECT requestFrom FROM friendrequests WHERE requestTo = ?)', 
        [userId], (error, incomingResult) => {
          if(error){
            console.error("Error executing incoming friend request query: ", error);
            return res.status(500).send('Internal server error');
          }

          return res.status(200).json(incomingResult);
        });
  });
  
});

router.get('/getOutgoingFriendRequests', (req, res) => {
  const {username} = req.query;
  databaseConnection.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
    if(err){
      console.error("Error executing user query: ", err);
      return res.status(500).send('Internal server error');
    }

    if(results.length != 1){
      return res.status(400).send('Could not uniquely identify user');
    }

    let userId = results[0].id;

    databaseConnection.query('SELECT username FROM users WHERE id IN (SELECT requestTo FROM friendrequests WHERE requestFrom = ?)', 
        [userId], (error, outgoingResult) => {
          if(error){
            console.error("Error executing incoming friend request query: ", error);
            return res.status(500).send('Internal server error');
          }

          return res.status(200).json(outgoingResult);
        });
  });
});

// GET /user/getAccount?username=myusername&password=mypassword
router.get('/getAccount', (req, res) => {
    const { username, password } = req.query;
    // Check credentials against the database

    databaseConnection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      
      // Check if user with provided username and password exists
      if (results.length === 0) {
        return res.status(401).send('Unauthorized');
      }
      
      const passwordsEqual = await bcrypt.compare(password, results[0].password);

      if(!passwordsEqual){
        return res.status(401).send('Unauthorized');
      }

      res.status(201).json(results);
    });
  });

router.get('/topGames', (req, res) => {
  const { username } = req.query;
  let defaultImage = '/uploads/defaultImage.svg';
  databaseConnection.query('SELECT name, id, genre, thumbnail FROM game WHERE id IN ( SELECT game_id FROM `topgames` WHERE user_id = (SELECT id FROM users WHERE username = ?))', [username], (err, results) => {
    if (err){
      console.error('Error fetching top games: ', err);
      return res.status(500).send('Internal server error');
    }

    results.forEach(g => {
      if (g.thumbnail == null){
          g.thumbnail = defaultImage;
      }
    });

    return res.status(200).json(results);
  });
});

router.post('/createAccount', async (req, res) => {
  const { username, email, password, role} = req.body;
  if (!username || !email || !password || !role) {

    return res.status(400).send('All fields are required');
  }
  // Check if the username already exists
  databaseConnection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }

    // If username already exists, return error
    if (results.length > 0) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltTime);

    // Insert the new user into the database
    databaseConnection.query('INSERT INTO users (role, username, password) VALUES (?, ?, ?)', [role, username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }

      if(role == 'developer'){
        databaseConnection.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
          if (err){
            console.error("Error getting user id: ", err);
            return res.status(500).send("Internal server error");
          }

          const userId = results[0].id;

          databaseConnection.query('INSERT INTO developer (developer_id) VALUES (?)', [userId], (err, result) => {
            if (err){
              console.error("Error inserting developer: ", err);
              return res.status(500).send("Internal server error");
            }
          })
        })
      }
      res.status(201).send('User account created successfully');
      })
    });
  });

  return router;
};