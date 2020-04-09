module.exports = {
    'env': {
        'node': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'react-app',
        'google',
    ],
    'parserOptions': {
      'ecmaVersion': 2018,
      'sourceType': 'module',
    },
    'parserOptions': {
      'ecmaVersion': 2018,
      'sourceType': 'module',
    },
    'rules': {
      'linebreak-style': 0,
      'max-len': ["warn", { 'code': 150 }]
    },
    'plugins': ['jsx-a11y']
  };
  