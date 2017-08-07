const express = require('express');
const apiai = require('apiai')('153cd2c04c6549afa4c94f603a6657ea');
const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public' ));




const server = app.listen(5000);

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function (socket) {
    socket.on('chat message', (text) => {
        let apiaiReq = apiai.textRequest(text, {
            sessionId: '591af603305983a0957bc8bc'
        });
        apiaiReq.on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            socket.emit('bot reply', aiText);
        });
        apiaiReq.on('error', (error) => {
            console.log(error);
        });
        apiaiReq.end();
    });
});
app.get('/', (req, res)=> {
    res.sendFile('index.html');
});