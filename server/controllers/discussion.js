const express = require('express');
const router = express.Router();
const databaseConnection = require('../model/model');

module.exports = router;

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