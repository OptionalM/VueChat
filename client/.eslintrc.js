module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "parserOptions": {
        "parser": "babel-eslint",
     },
    "extends": [
        "plugin:vue/recommended",
        "airbnb-base",
    ],
    "plugins": ["import", "vue"],
    "rules": {
      "no-unused-vars": 1,
    },
    "globals": {
      // empty
    }
};