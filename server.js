const express = require('express');

const app = express();


const http = require('http').Server(app);

const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

let clients = 0;

io.on('connection', function(socket) {


    socket.on("NewClient", function() {

        if (clients < 2) {

            if (clients == 1) {

                this.emit("CreatePeer");
            }

        } else {


            this.emit("SessionActive");
            clients++;

        }



    })


    socket.on('Offer', sendOffer);
    socket.on('Answer', sendAnswer);
    socket.on('Disconnect', Disconnect);



})


function Disconnect() {
    if (clients > 0) {
        clients--;
    }
}

function sendOffer(offer) {

    this.broadcast.emit("BackOffer", offer);

}

function sendAnswer(data) {
    this.broadcast.emit("BackAnswer", data);
}

http.listen(port, () => console.log('Active on ${port} port'))