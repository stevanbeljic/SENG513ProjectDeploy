const express = require('express');
const router = express.Router();
const databaseConnection = require('../model/model');
const multer  = require('multer');


var storageDef = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb (null, `${Date.now()}-!${file.originalname}`);
    },
});

const upload = multer({storage: storageDef,});
let defaultImage = '/uploads/defaultImage.svg';

module.exports = function(databaseConnection) {
    const router = express.Router();


    router.get('/getAllGames', (req, res) => {
    
        databaseConnection.query('SELECT * FROM game',(err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              return res.status(500).send('Internal server error');
            }
            else {
                results.forEach(g => {
                    if (g.thumbnail == null){
                        g.thumbnail = defaultImage;
                    }
                });
    
                return res.json(results);
            }
        })
    });
    
    router.get('/getGameById', (req, res) => {
        const {id} = req.query;
        databaseConnection.query('SELECT * FROM game WHERE id=?', [id],(err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              return res.status(500).send('Internal server error');
            }
            else {
                try{
                    if(results[0].thumbnail == null){
                        results[0].thumbnail = defaultImage;
                    }
                    res.json(results);
                } catch (error){
                    return res.status(500).send('Internal server error');
                }
            }
        })
    });
    
    router.get('/trendingGame', (req, res) => {
        databaseConnection.query('SELECT * FROM `game` ORDER BY RAND() LIMIT 1', (err, results) => {
            if (err) {
                console.error('Error fetching trending game', err);
                return res.status(500).send('Internal server error');
            }
                
            if(results[0].thumbnail == null){
                results[0].thumbnail = defaultImage;
            }
    
            //console.log(results[0]);
            return res.json(results[0]);
        })
    });
    
    router.post('/addTopGame', (req, res) => {
        const { userid, gameid } = req.query;
        databaseConnection.query('INSERT IGNORE INTO `topgames` (`user_id`, `game_id`) VALUES (? ,?) ', [userid, gameid], (err, result) => {
            if(err){
                console.error('Error adding top game', err);
                return res.status(500).send("Internal server error");
            }
    
            return res.status(200).send("Added top game");
        });
    });
    
    router.get('/existsTopGame', (req, res) => {
        const { userid, gameid } = req.query;
        databaseConnection.query('SELECT * FROM `topgames` WHERE user_id = ? AND game_id = ?', [userid, gameid], (err, results) => {
            if (err) {
                console.error('Error reading from topgames table: ',err);
                return res.status(500).send('Internal server error');
            }
            return res.status(200).json({ length: results.length });
        })
    });
    
    router.post('/uploadGame', upload.single('imageFile'), (req, res) => {
        const { title, description, link, googlePrice, appStorePrice, genre, publisher} = req.body;
        let thumbnail = '/uploads/'+req.file.filename;
    
        databaseConnection.query('SELECT developer_id FROM developer WHERE developer_id IN (SELECT id FROM users WHERE username = ?)', [publisher], (err, results) => {
            if (err){
                console.error('Error identifying author id: ', err);
                return res.status(500).send('Internal server error');
            } else if (results.length==0){
                return res.status(400).send('Invalid developer');
            }
            let author_id = results[0].id;
            databaseConnection.query('INSERT INTO `game` (`name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`)'+
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, description, genre, thumbnail, appStorePrice, googlePrice, publisher, author_id], (err, results) =>{
                
                if(err){
                    console.error("Error inserting game to database: ",err);
                    return res.status(500).send('Internal server error: Unable to publish game');
                }
    
                return res.status(200).send("Game published");
            })
        });
    });


    return router;
};
