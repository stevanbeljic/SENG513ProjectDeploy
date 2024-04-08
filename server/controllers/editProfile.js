const express = require('express');
const router = express.Router();
const databaseConnection = require('../model/model');
const saltTime = 2;

module.exports = function(databaseConnection) {
    const router = express.Router();

    router.post('/', (req, res) => {
    
        const {username, password, bio} = req.body;
    
        //check if provided form has a username, and one field to update
        if (!username || (!password && !bio)){
            return res.status(400).send('Nothing to update');
        }
    
        databaseConnection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
            if(error){
                console.error('Unable to execute query');
                return res.status(500).send('Internal server error');
            }
    
            //no user found
            if(results.length < 1){
                return res.status(400).send('No identifiable user to modify');
            }
    
            //only update password if a password was provided
            if(password!="" || password!=null){
                const hashedPassword = await bcrypt.hash(password, saltTime);
                databaseConnection.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (error, results) => {
                    if (error) {
                        console.error('Unable to execute query');
                        return res.status(500).send('Internal server error');
                    }
                });
            }
    
            //only update bio if a bio was provided
            if(bio!="" || bio!=null){
                databaseConnection.query('UPDATE users SET bio = ? WHERE username = ?', [bio, username], (error, results) => {
                    if (error) {
                        console.error('Unable to execute query');
                        return res.status(500).send('Internal server error');
                    }
                });
            }
            res.status(200).send('User updated successfully');
        });
    });


    return router;
};