class BuildHTML {
    constructor() {
        this.messageWrapper = 'message-wrapper';
        this.circleWrapper = 'circle-wrapper';
        this.textWrapper = 'text-wrapper';

        this.meClass = 'me';
        this.themClass = 'them';

        this.nickname = 'nickname';
        this.pronounce = 'onMessageClick';

    }

    _build(text, who, index, name) {
        const element = document.createElement('div');
        element.innerHTML = `<div class="${this.messageWrapper} ${this[who + 'Class']}">
             
             
                 
                  <div class="${this.textWrapper} animated fadeIn" id="message-${index}"><pre>${text}</pre></div>
                  
              
            </div>`;
        return element;
    }

    me(text, index, name) {
        return this._build(text, 'me', index, name);
    }

    them(text, index, name) {
        return this._build(text, 'them', index, name);
    }
}

export const buildHTML = new BuildHTML();
