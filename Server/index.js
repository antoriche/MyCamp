import express from 'express';
import path from 'path';
import cors from 'cors';
import controllers from './Controllers';
import config from './config.json';
import bodyParser from 'body-parser';


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/', function (req, res) {
  console.log("request");
  res.send('OK');
});

app.get('/ping', function (req, res) {
  console.log('Server has been pinged');
  res.send('pong')
});

controllers.forEach( controller => controller(app) );

app.listen(config.port, function () {
  console.log(`Server listening on port ${config.port}!`)
})