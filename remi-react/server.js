import express from 'express';
const app = express();


/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:9090/build/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css');
  } else {
    res.redirect('//localhost:9090/build/style.css');
  }
});

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/settings', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/doctors', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/doses', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/logout', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/pharmacy', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/text', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/thanks', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/assets/:file', function(req, res) {
    res.sendFile(__dirname + '/assets/' + req.params.file);
});



/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  console.log(process.env);

  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
