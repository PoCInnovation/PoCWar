const { execLang } = require('./execLang');
const { addChallenge } = require('./challenge');
const endpoints = [
  { lang: 'clang',      image: 'c_app',          ext: 'c'   },
  { lang: 'cpp',        image: 'cpp_app',        ext: 'cpp' },
  { lang: 'go',         image: 'go_app',         ext: 'go'  },
  { lang: 'javascript', image: 'javascript_app', ext: 'js'  },
  { lang: 'python',     image: 'python_app',     ext: 'py'  },
  { lang: 'rust',       image: 'rust_app',       ext: 'rs'  },
];

function addRoutes(app) {
  endpoints.forEach(endpoint => {
    app.post(`/${endpoint.lang}`, async function (req, res) {
      console.log(`request POST on ${endpoint.lang}`);
      await execLang(endpoint, res, req.body.code);
    });
  });
  app.post('/add-challenge', addChallenge);
}

module.exports = {
  addRoutes,
};