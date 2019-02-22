class Messenger {
    constructor() {

        this.me = 1; // completely arbitrary id
        this.them = 5; // and another one

        this.onRecieve = (message) => console.log('Recieved: ' + message.text);
        this.onSend = (message) => console.log('Sent: ' + message.text);
        this.initSocket();
        this.prevTime = Date.now();
    }

    send(data) {

        this.socket.emit('new message', data);

    }

    recieve(data) {
        console.log('recieve', data);

        let title = data.gameId;

        title += `   ${data.text.result.request}`;

        if (data.text.result.state){
            title += ` ${data.text.result.state.currentScene}`;
        }

        if (data.text.result.totalWin){
            title += `  win:${data.text.result.totalWin}`;
        }

        if (data.text.result.reels){
            title += `  pos:${data.text.result.reels.positions.join(',')}`;
        }
        let time = new Date();
        title += ` ${time.getMinutes()}-${time.getSeconds()}-${time.getMilliseconds()}//${time.getTime()-this.prevTime}`;
        this.prevTime = time.getTime();
        //title += ` ${data.text.balance.currency}-${data.text.balance.amount}`;

        let message = {
            text: title,
            data:data.text,
            gameId:data.gameId
        };

        this.onRecieve(message);

    }

    registerUser(name) {
        this.socket.emit('add user', name);
    }

    initSocket() {
        this.socket = io();


        this.socket.on('new message', (data) => {

            this.recieve(data);
        });


        this.socket.on('init', (data) => {
            this.onInit(data);
        });

        this.socket.emit('init');

    }

    onInit(data) {
        const messages = data.messages;
        messages.forEach(message => this.recieve(message));
    }
}

export const messenger = new Messenger();
