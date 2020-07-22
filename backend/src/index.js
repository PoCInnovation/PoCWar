const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { addRoutes } = require('./routes');

function main() {
  const host = 4000;
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  addRoutes(app);
  app.listen(host, () => {
    console.log(`listening on port ${host}`);
  });
}

main();
