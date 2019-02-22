import {messenger} from './messenger.js';
import {buildHTML} from './buildhtml.js';


class Chat {

    constructor() {


        this.name = 'user';
        this.messages = [];

        this.initControls();
        this.addListeners();
        this.selectedMessage = {};
        this.selectedIndex = 0;
    }

    addListeners() {
        messenger.onSend = message => this.buildSent(message);
        messenger.onRecieve = message => this.buildRecieved(message);
        this.send.addEventListener('click',e => this.onMessageUpdate());

    }

    initControls() {

        this.send = document.getElementById('send');
        this.content = document.getElementById('content');
        this.inner = document.getElementById('inner');
        this.preview = document.getElementById('codePreview');
    }


    scrollBottom() {
        this.inner.scrollTop = this.content.scrollHeight;
    }

    buildSent(message) {

        this.content.appendChild(buildHTML.me(message.text, this.messages.length, this.name));
        document.getElementById('message-' + this.messages.length).addEventListener('click', e => this.onMessageClick(e));
        this.messages.push(message);
        this.scrollBottom();

    }

    buildRecieved(message) {
        console.log(message);
        const messageIndex = this.messages.length;
        this.content.appendChild(buildHTML.them(message.text, messageIndex, ''));
        document.getElementById('message-' + messageIndex).addEventListener('click', e => this.onMessageClick(e));
        this.messages.push(message);
        this.scrollBottom();

    }

    onMessageClick(e) {
        const index = e.currentTarget.id.replace('message-', '');
        console.log(index,this.messages[index].selected);
        if (this.messages[index].selected){
            this.unselectItem(e.currentTarget,this.messages[index]);
            return;
        }
        e.currentTarget.style.backgroundColor = 'green';
        this.selectedMessage = this.messages[index];
        this.selectedMessage.selected = true;
        this.preview.value = JSON.stringify(this.messages[index].data,null,'   ');
        messenger.send(this.messages[index].data);
    }

    unselectItem(element,message){
        element.style.backgroundColor = 'darkslateblue';
        message.selected = false;
        this.selectedMessage = {};
        this.preview.value = '';

    }

    onMessageUpdate() {

        let data = eval('('+this.preview.value+')');
        this.selectedMessage.data = data;
        messenger.send(this.selectedMessage.data);
    }
}

export const chat = new Chat();
