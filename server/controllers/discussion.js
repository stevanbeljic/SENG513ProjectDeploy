const express = require('express');
const router = express.Router();
const databaseConnection = require('../model/model');
const multer  = require('multer');
const upload = multer();


module.exports = function(databaseConnection) {
    const router = express.Router();


    router.get('/getDiscussionsByGame', (req, res) => {
        const {id} = req.query;
        databaseConnection.query('SELECT * FROM discussion WHERE game_id = ?', [id], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Internal server error');
              }
              else{
                  res.json(result);
              } 
        });
    });
    
    router.get('/getDiscussionAndPosterById', (req, res) => {
        const {id} = req.query;
        databaseConnection.query('SELECT d.title, d.description, g.name, g.id, u.username FROM discussion as d, users as u, game as g WHERE d.poster_id = u.id AND d.game_id = g.id AND d.discussion_id = ?', 
        [id], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Internal server error');
              }
              else{
                  res.json(result);
              }     
        });
    });
    
    router.post('/postDiscussion', upload.none(), (req, res) => {
        const { title, text, user, game, date } = req.body;
    
        databaseConnection.query('INSERT INTO `discussion` (`title`, `description`, `poster_id`, `game_id`, `post_date`) VALUES (?, ?, ?, ?, ?)', [title, text, user, game, date], (err, results) => {
    
            if(err){
                console.error("Error inserting new discussion: ", err);
                return res.status(500).send('Internal server error posting discussion');
            }
    
            return res.status(200).send('Discussion published');
        });
    });
    
    router.get('/getDiscussionResponses', (req, res) => {
        const {id} = req.query;
        databaseConnection.query('SELECT c.comment_text, u.username, c.comment_ordinal FROM comments AS c, users AS u, discussion AS d WHERE c.discussion_id = d.discussion_id AND c.poster_id = u.id AND d.discussion_id = ? ORDER BY c.comment_ordinal ASC', 
        [id], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Internal server error');
              }
              else{
                  res.json(result);
              }    
        });
    });
    
    router.post('/addDiscussionResponse', (req, res) => {
        const{ comment, discussion_id, poster_id} = req.body;
        if (!comment || !discussion_id || !poster_id) {
    
            return res.status(400).send('All fields are required');
        }
        databaseConnection.query('INSERT INTO comments (comment_text, discussion_id, poster_id) VALUES (?, ?, ?)', [comment, discussion_id, poster_id], (err, result) => {
            if(err){
                console.error("Error inserting game to database: ",err);
                return res.status(500).send('Internal server error: Unable to create comment');
            }
    
            return res.status(200).send("Comment added successfully");
        });
    });
    
    router.get('/trendingDiscussions', (req, res) => {
        databaseConnection.query('SELECT * FROM `discussion` ORDER BY `discussion_id` DESC LIMIT 5', (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Internal server error');
            } else {
                return res.status(200).json(result);
            }  
        });
    });

    router.get('/likedDiscussionsByUserID', (req, res) => {
        const {userid} = req.query;
        databaseConnection.query('SELECT * from likes WHERE user_id = ?', [userid], (err, result) => {
            if (err) {
                console.error('Error reading from likes table: ', err);
                return res.status(500).send('Internal server error');
            } else {
                return res.status(200).json(result);
            }
        })
    });
    
    router.post('/addLikedDiscussion', (req, res) => {
        const { userid, discussionid } = req.query;
        databaseConnection.query('INSERT IGNORE INTO `likes` (`user_id`, `discussion_id`) VALUES (?, ?)', [userid, discussionid], (err, result) => {
            if(err){
                console.error("Error inserting like into database: ", err);
                return res.status(500).send('Internal server error: Unable to add like');
            }
            return res.status(200).send("Like added successfully");
        });
    });
    
    router.post('/removeLikedDiscussion', (req, res) => {
        const { userid, discussionid } = req.query;
        databaseConnection.query('DELETE FROM `likes` WHERE user_id = ? AND discussion_id = ?', [userid, discussionid], (err, result) => {
            if(err){
                console.error("Error deleting from database database: ", err);
                return res.status(500).send('Internal server error: Unable to remove like');
            }
            return res.status(200).send("Like removed successfully");
        });
    });

    return router;
};
