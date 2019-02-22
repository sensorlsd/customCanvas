import {TestAction} from "../actions/TestAction";

export class WaitForAPIAction extends TestAction {

    constructor() {
        super();
    }

    protected start(): void {
        console.log(`==> WaitForAPIAction`);
        const interval = setInterval(() => {
            if (window['GameAPI']) {
                clearInterval(interval);
                console.log('==> autotest | WaitUntil | done');
                this.runNext();
            } else {
                console.log(`waiting for api ${window['GameAPI']}`);
            }
        }, 100);
        
    }
}
