# Chat API - backend side - (=•́ܫ•̀=)

[<img src="https://img.shields.io/badge/last%20updated-march%202022-yellow">](https://img.shields.io/badge/last%20updated-march%202022-yellow)

Backend of a simple Chat API developped with Node Js and Express, connected to a [client](https://github.com/Emlych/Chat-miaou-client) bootstrapped with React.

## Features

✔️ Authentication system using middleware and Mongoose model<br>
✔️ A route to create a conversation channel <br>
✔️ A route to display all chatrooms' name<br>
✔️ A route to enter a specific conversation channel<br>

## Packages

- express
- express-formidable
- cors
- mongoose
- crypto-js
- uid2
- cloudinary

## Future features to work on

- A route to send messages
- Routes to delete messages
- Send pictures / files in a message
- Routes to update / delete chatrooms
- Routes to update (change avatar) and delete user
- Routes to invite / kick out users from a conversation channel

## How to install and run the project

Clone this repository :

### `git clone https://github.com/Emlych/Chat-miaou-back`

### `cd Chat-miaou-client`

Install dependencies :

### `npm install `

When installation is complete, run :

### `npx nodemon server.js`
