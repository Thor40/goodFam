# GoodFam
Social Network API

## Table of contents
--------------------
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Testing](#testing)
* [Features](#features)

## General info
--------------------
This project was created as an exercise practicing creating an API for a social network using MongoDB, Mongoose ODM, and several other quality of life packages.
	
## Technologies
--------------------
Project is created with:
* mongoDB: ^4.00.0,
* express: ^4.17.1,
* moment: ^2.27.0,
* mongoose: ^5.9.25
	
## Setup
--------------------
### To run this project, make sure to install [MongoDb](https://www.mongodb.com/try)

install the following locally using npm:

```
$ cd ../dir
$ npm init
$ npm install express
$ npm install moment
$ npm install mongoose
```

## Testing
--------------------
### To test this project, run the following in the terminal:
```
$ npm start
```
The server should run on PORT 3001
--------------------
Then you can test the routes using REST API client such as [Insomnia](https://insomnia.rest/)

## Features
--------------------
### Features include:
* GET, GET BY ID, POST, PUT, DELETE USER
* GET, GET BY ID, POST, DELETE THOUGHT
* PUT, DELETE REACTION ON THOUGHT