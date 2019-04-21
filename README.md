### Start back on localhost:8000
```sh
$ npm i 
$ mv .env.example .env
$ pm2 start node_modules/babel-cli/bin/babel-node.js -- src
```

### Start front on localhost:3000
```sh
$ cd ./public
$ npm i 
$ pm2 start node_modules/react-scripts/bin/react-scripts.js -- start
```
