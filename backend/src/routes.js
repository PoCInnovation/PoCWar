const challenge = require('./routes/challenge');

function addRoutes(app) {
  app.post('/challenge/submit/:id', challenge.submitChallenge);

  app.post('/challenge', challenge.addChallenge);
}

module.exports = {
  addRoutes,
};
