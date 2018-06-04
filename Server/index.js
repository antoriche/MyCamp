import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

const port = 8080;

app.use(cors());

app.get('/', function (req, res) {
  console.log("request");
  res.send('OK');
});

app.get('/ping', function (req, res) {
  console.log('Server has been pinged');
  res.send('pong')
})

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`)
})