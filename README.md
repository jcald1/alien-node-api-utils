# alien-node-api-utils
Helper functions for API handling on NodeJS. The functions are pure and curried with Ramda.

[![Build Status](https://travis-ci.org/AlienCreations/alien-node-api-utils.svg?branch=master)](https://travis-ci.org/AlienCreations/alien-node-api-utils) [![Coverage Status](https://coveralls.io/repos/AlienCreations/alien-node-api-utils/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlienCreations/alien-node-api-utils?branch=master) [![npm version](http://img.shields.io/npm/v/alien-node-api-utils.svg)](https://npmjs.org/package/alien-node-api-utils) [![Dependency Status](https://david-dm.org/AlienCreations/alien-node-api-utils.svg)](https://david-dm.org/AlienCreations/alien-node-api-utils)

## Install

```
$ npm install alien-node-api-utils --save
```

Run the specs

```
$ npm test
```

## Usage

```js

// Example API route such as '/users' which could reasonably leverage a 
// 'user' model which would return a promise or catch with an error object.

// The error object passed in the catch should include a 'statusCode' property
// that is specific to the respective error. If it does not, the api utils 
// will default to 500.

// Note: Because the util functions are curried, we can keep them pure and by 
// invoking with req and res, as shown below.

var apiUtils  = require('alien-node-api-utils'),
    userModel = require('./models/user');

function getUsers(req, res) {
  userModel.getUsers().
    then(apiUtils.jsonResponseSuccess(req, res)).
    catch(apiUtils.jsonResponseError(req, res));
};

module.exports = getUsers;

```

## Changelog

##### 0.1.3

  - fix circular json in response