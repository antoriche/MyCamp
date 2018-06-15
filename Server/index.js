import express from 'express';
import path from 'path';
import cors from 'cors';
import controllers from './Controllers';
import config from './config.json';
import bodyParser from 'body-parser';


const app = express();
const api = express.Router();

app.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json({ type: 'application/*+json' }));

api.get('/ping', function (req, res) {
  console.log('Server has been pinged');
  res.send('pong')
});

controllers.forEach( controller => controller(api) );

app.use('/api',api);

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['js', 'html', 'ico'],
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

// Render production app. Be sure you ran the build script
app.use(express.static('build', options));

app.listen(config.port, function () {
  console.log(`Server listening on port ${config.port}!`)
})