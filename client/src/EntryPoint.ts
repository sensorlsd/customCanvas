import {Utils} from "./utils/Utils";
import {ServerModel} from "./model/ServerModel";
import {DisplayTreeHelper} from "./utils/DisplayTreeHelper";
import {CucumberFabric} from "./main/CucumberFabric";

export class EntryPoint {

    private _startInterval: any;

    public run() {
        this.disableFocusLost();
        DisplayTreeHelper.getInstance().addHelper();
        this._startInterval = setInterval(() => {
            if (Utils.getWrapper()) {
                this.initApp();
                clearInterval(this._startInterval);
            }
        }, 1000);
    }

    disableFocusLost() {
        if (window.top) {
            try {
                window.top.addEventListener("blur", (e) => {
                    e.stopPropagation();
                    window.top.dispatchEvent(new Event('focus'));
                }, true);
                window.top.dispatchEvent(new Event('focus'));
            } catch (e) {
                console.warn(e);
            }
        }
        document.getElementsByClassName('btnOpen')[0].setAttribute('data-html2canvas-ignore', 'true');
        document.getElementsByClassName('combinations-toggle')[0].setAttribute('data-html2canvas-ignore', 'true');
    }

    private initApp() {

        const serverAddress: string = Utils.getWrapper().device.getParams['script'].replace('/automation/autotest.js', '');

        const serverModel: ServerModel = ServerModel.getInstance();
        serverModel.url = serverAddress;
        this.loadTestCase();
    }

    private loadTestCase() {
        const testId = Utils.getWrapper().device.getParams['testId'];
        if (!testId) {
            return;
        }
        fetch(`${ServerModel.getInstance().url}/testCases/${testId}`, {
            method: 'GET'
        }).then((data: any) => {
            data.text().then(data => {
                const cucubreFabric = CucumberFabric.getInstance();
                cucubreFabric.init(data);
            });
        }, e => {
            console.log(`==>> TestCase: #${testId} not found`);
        }).catch(e => {
            console.log(`==>> TestCase: #${testId} not found`);
        });
    }
}
