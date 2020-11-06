## Environemnt API KEY

To run the server project you need a valid API KEY. Insert inside a `.env` file inside the `root` folder:

```
APISECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
APIFAKEFORTEST = 0123456789
```

The `APIFAKEFORTEST` it's just for Jest and testing purpose 🤦‍♂️

If you run the built project you need to set you env variable in your operating system.


## Run the project

You need NodeJS in order to be able to run the project and install all the Dependencies. Run the command below inside both client and server folder:

```
npm install
```

You can start the server and use `POSTMAN` or `curl` or whatever you wanna use to make rest calls. Inside the project there is a web client written in "poor" TypeScript (no React, no Angular).

To run the server:
```
npm run server
```

To run the client:
```
npm run client
```

To run both just type `npm start`, thank to `concurrently`.


The server will start as a `Webpack Dev Serve`, if you want to run your web server, please make the `build` first to have a `dist` folder.

Don't forget to insert you API KEY and if you change the default `3000` port, please change it on the client side. At the time of writing this documentation, it's hardcoded (😢) in the `FormController`!!!

## The Server

The main project is the server side, where I'll interact with IO Rest Api. It's a very simple HTTP Server, without any kind of framework/libraries. For this purpose it was good enough to use the NodeJS native http createServer.

Server accept a base url path (an endpoint) and for every internal endpoint it runs an Handler Function. For this project there is only one hanlder that interact with IO Rest API and a "private" AuthHandler (not exposed to the client) to handle the User Profile Authorization.

## The Client

This is the UI part that I used to check my work. It's just a form, with Toastr and Bootstrap CSS (v.4). 

## Main Developer Dependencies

* TypeScript: Transpiler
* Ts-Node: A runner typescript on the fly on NodeJS
* @types/node: Type Definition for NodeJS
* Jest: test library
* ts-jest: typescript library for unit test (transform)
* @types/jest: Type Definition for Jest
* Nodemon: a file watcher useful during development
* Axios: to fetch data from endpoint

## Jest Test

To run test for both server and client side just run: `npm test`. I know, I'm very low skilled in testing software ( ´･･)ﾉ(._.`)

The project comes with a `launch.json` for VSCode so you can debug inside the IDE for both NodeJS and Jest Test.
In this way, can add your breakpoint on your code and on your tests file. Open Debug, Play your `Jest Current File` config and Enjoy debugging 😜
