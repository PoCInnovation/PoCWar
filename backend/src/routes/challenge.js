const firebase = require('firebase');
require('firebase/storage');

const { execLang } = require('../execution/execLang');

const langs = {
    'clang':      { image: 'c_app',          ext: 'c'   },
    'cpp':        { image: 'cpp_app',        ext: 'cpp' },
    'go':         { image: 'go_app',         ext: 'go'  },
    'javascript': { image: 'javascript_app', ext: 'js'  },
    'python':     { image: 'python_app',     ext: 'py'  },
    'rust':       { image: 'rust_app',       ext: 'rs'  },
};

module.exports = {
    /**
	 * POST /api/v1/challenge
	 *
	 * @api {post} /api/v1/challenge Add challenge
	 * @apiName Add challenge
	 * @apiGroup Accounts
	 *
	 * @apiHeader {String} authorization Authorization token
	 * @apiHeader {String="application/json"} accept
	 *
	 * @apiParam {Object} challengeData Account code, name, type, and description
	 */
    addChallenge(req, res) {
        firebase.database().ref('challenges/').push(req.body)
            .then(() => {
                res.send('All good!').status(200);
            })
            .catch((e) => {
                res.send(`error: ${e}`).status(500);
            });
    },

    submitChallenge(req, res) {
        const lang = langs[req.body.lang];

        if (lang === undefined) {
            res.status(500).send('Unknown lang');
        } else {
            execLang(lang, res, req.body.code);
        }
    }
}
