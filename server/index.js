const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/config', function(req, res) {
  res.send({
    API_BASE_URL: process.env.API_BASE_URL,
    CHECK_SESSION_URL: process.env.CHECK_SESSION_URL,
    LOGIN_URL: process.env.LOGIN_URL,
    LOGIN_PROVIDER: process.env.LOGIN_PROVIDER,
    LOGOUT_URL: process.env.LOGOUT_URL,
  });
});

app.get('/uiConfig', function(req, res) {
  res.send({
    REACT_APP_PRIMARY_COLOR: process.env.REACT_APP_PRIMARY_COLOR,
    REACT_APP_SECONDARY_COLOR: process.env.REACT_APP_SECONDARY_COLOR,
    REACT_APP_ACCENT_COLOR: process.env.REACT_APP_ACCENT_COLOR,
    REACT_APP_LOGO: process.env.REACT_APP_LOGO,
    REACT_APP_TITLE: process.env.REACT_APP_TITLE,
    REACT_APP_COUNTRY_LOGO: process.env.REACT_APP_COUNTRY_LOGO,
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);
