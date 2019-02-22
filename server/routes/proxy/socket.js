var model = require('./model.js');

class Socket {
    constructor(){
        console.log('socket created');
        this.addedUser = false;
    }

    init(server){
        console.log('socket initialized');
        this.io = require('socket.io')(server);
        this.io.on('connection',socket => this.onConnection(socket));
    }


    onConnection(socket) {
        console.log('socket connected!');
        this.socket = socket;


        this.socket.on('add user', username => this.onUserAdd(username));
        this.socket.on('new message', data => this.onMessage(data));
        this.socket.on('init', () => this.onInit());
    }

    send(data,gameId) {
        if (!this.socket)return;
        const message = {gameId: gameId,text:data};
        model.messages.push(message);
        this.socket.emit('new message', message);
    }

    onUserAdd(username) {
        if (this.addedUser) return;


        this.socket.username = username;

        this.addedUser = true;
        this.socket.emit('login', {

        });

        this.socket.broadcast.emit('user joined', {
            username: this.socket.username,

        });
    }

    onMessage(data) {
        model.data = data;
        model.useData = true;
    }

    onInit() {
        this.socket.emit('init',{messages:model.messages});
    }
}

module.exports = new Socket();

