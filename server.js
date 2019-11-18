const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080

const app = express();

//Protocolo WSS (Websocket)
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use('/',(req,res) =>{
  res.render('index.html');
})

let mensagens = []

io.on('connection', socket => {
  console.log('Conectado:',socket.id);

  socket.on('sendMessage',data => {
    mensagens.push(data)
    socket.broadcast.emit('receivedMessage',data);
  })

})

server.listen(port)
