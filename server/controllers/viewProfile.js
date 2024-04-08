const express = require('express');
const router = express.Router();
const databaseConnection = require('../model/model');


module.exports = function(databaseConnection) {
    const router = express.Router();


    router.post('/', async (req, res) => {
        const {username} = req.body;
        databaseConnection.query('SELECT username, role, bio FROM users where username = ?', [username], (error, result) => {
            if(error){
                console.error("Unable to perform user query");
                return res.status(500).json({message: 'Internal server error'});
            }
    
            if(result.length < 1){
                return res.status(400).json({message: 'Failed to find user profile ',username});
            }
    
            if(result.length > 1){
                return res.status(400).json({message: 'Found multiple users with identical name'});
            }
    
            return res.json(result);
        });
      });


    return router;
};