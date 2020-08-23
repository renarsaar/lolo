import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Mercury from '@postlight/mercury-parser';

const app = express();

app.use(cors());

app.use(express.static('./client/build'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const BASE_URL = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss';

// Get content from rss feed
app.get('/content', (req, res) => {
  axios.get(BASE_URL)
    .then((response) => {
      res.set('Content-Type', 'text/xml');
      res.send(response.data);
    })
    .catch((error) => res.send(error));
});

// Free article from clutter
app.get('/article', (req, res) => {
  const { url } = req.query;

  Mercury.parse(url, { contentType: 'markdown' })
    .then((response) => res.send(response))
    .catch((error) => res.send(error))
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);