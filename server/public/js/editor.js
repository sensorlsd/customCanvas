


class Editor {

    constructor() {
        this.testFrameworkAddon = '?fpsmeter=no&script='+getServerUrl()+'/automation/autotest.js';
        this.init();
    }


    init() {
        // add listener to disable scroll
        //window.addEventListener('scroll', ()=>this.noScroll());
        this.editor = ace.edit("main");
        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/gherkin");
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });

        const url = localStorage.getItem('gameUrl');
        if (url) {
            document.getElementById('adressBar').value = url;
            this.loadButtonClickHandler();
        }

        const loadButton = document.getElementById('loadButton');
        loadButton.addEventListener('click', () => {
            this.loadButtonClickHandler()
        });

        const runButton = document.getElementById('runButton');
        runButton.addEventListener('click', () => {
            this.runButtonClickHandler()
        });

        const runNewTabButton = document.getElementById('runNewTabButton');
        runNewTabButton.addEventListener('click', () => {
            this.runNewTabButtonClickHandler()
        });

        const saveButton = document.getElementById("save");
        saveButton.addEventListener('click', () => {
            this.onSave()
        });

        const qrButton = document.getElementById("qrButton");
        qrButton.addEventListener("click", ()=>{
            this.generateQR();
            
        });

        this.qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 300,
            height : 300
        });
    }

    generateQR() {
        const adressBar = document.getElementById('adressBar');
        const url = adressBar.value;
        this.qrcode.makeCode(url+this.testFrameworkAddon+'&testId=' + getFileName());
    }

    loadButtonClickHandler() {
        localStorage.setItem('gameUrl', document.getElementById('adressBar').value);
        this.launchGameWithParam(this.testFrameworkAddon);
    }

    launchGameWithParam(param) {
        const adressBar = document.getElementById('adressBar');
        const url = adressBar.value;

        if (this.iframe) {
            document.body.removeChild(this.iframe);
        }
        this.iframe = document.createElement('iframe');
        //this.iframe.setAttribute('src','http://gc.gaming.skywindgroup.com/fortunecase/48/index.html');
        this.iframe.setAttribute('src', url + param);

        this.iframe.className = 'game';
        this.iframe.setAttribute('frameBorder', '0');
        document.body.appendChild(this.iframe);
    }

    runButtonClickHandler() {
        this.launchGameWithParam(this.testFrameworkAddon + '&testId=' + getFileName());
    }

    runNewTabButtonClickHandler() {
        const adressBar = document.getElementById('adressBar');
        const url = adressBar.value;
        window.open(url+this.testFrameworkAddon+'&testId=' + getFileName());
    }

    onSave() {
        console.log(this.editor.getValue());
        console.log(getSaveUrl());


        const r = new XMLHttpRequest();
        r.open('PUT', getSaveUrl());
        r.onreadystatechange = function () {
            if (r.readyState !== 4) return;
            if (r.status < 200 || r.status >= 300) {
                return alert(r.statusText);
            }
            //location.reload();
        };
        r.send(this.editor.getValue());
        

    }
}

export const editor = new Editor();
