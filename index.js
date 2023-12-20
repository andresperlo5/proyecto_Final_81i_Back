require('dotenv').config()
require('./dataBase/config')

const Server = require('./server/app')
const server = new Server()

server.listen()
