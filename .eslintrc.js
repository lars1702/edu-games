module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "parser" : "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-vars": [2],
    "react/jsx-uses-react": [2],
    "no-unused-vars":[1],
    "no-console":[1, {allow: ["warn", "error"]}],
  }
};