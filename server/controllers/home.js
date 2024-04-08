const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const databaseConnection = require('../model/model');

const AMOUNT_TO_SEND = 8; //how many articles will be sent to client



module.exports = function(databaseConnection) {
  const router = express.Router();



//retrieves the feed for the user
router.get('/homeDashboard', async (req, res) => {
  try {
    const response = await fetch('https://www.gamespot.com/api/articles/?api_key=8e0b735d55b6853d8c0b99bc69033830d7bc3409&format=json');
    const data = await response.json();
    const articles = data.results;

    if (articles) {
      const articlesToSend = [];
      for (let article of articles) {
        if (article.image && article.image.original) {
          articlesToSend.push({
            title: article.title,
            imageLink: article.image.original,
            articleLink: article.site_detail_url,
            deck: article.deck
          });
        }
        if (articlesToSend.length === AMOUNT_TO_SEND) {
          break;
        }
      }

      if (articlesToSend.length < 1) { //did not find one suitable article
        res.status(404).json({ message: 'No suitable article found.' });
      } else {
        res.json(articlesToSend);
      }
    } else {
      res.status(404).json({ message: 'No articles found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



  return router;
};