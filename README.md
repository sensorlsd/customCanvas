# Screenshots atomation project for Skywing games

This project contains both: client and server side

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
### Installing server

* Go to server folder
* Run npm i

```
cd server/
npm i
```

### Running server

* Go to server folder
* Run npm run start
* By default server will be available on http://localhost:3000

```
cd server/
npm run start
```

## Running the tests locally

* Create test case. See example at https://bitbucket.skywindgroup.com/projects/TRAN/repos/screenshotsautomation/browse/server/public/testCases/fortunecase.feature
* Copy test case into server/public/testCases folder
* Open yor game with cheats
* Add in the end of url testId and script params. Also better to add fpsmeter=no param.
* Launch game with these params.
* Screenshots appears in the server/data/files folder

```
http://gc.gaming.skywindgroup.com/fortunecase/46/index.html?fpsmeter=no&testId=fortunecase.feature&script=http://localhost:3000/automation/autotest.js
```
### Running tests on mobile phone or another pc

* Ensure that mobile phone and server pc use the same wifi
* Switch mobile device into "no sleep" mode
* Do like running locally but replace localhost to server IP

```
http://gc.gaming.skywindgroup.com/fortunecase/46/index.html?fpsmeter=no&testId=fortunecase.feature&script=http://192.168.1.1:3000/automation/autotest.js
```

## Authors

* **Valery Pesetski** - *Initial work* 

