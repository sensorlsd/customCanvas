import {TestAction} from "../actions/TestAction";

export class DelayAction extends TestAction {
    private readonly _delayTime: number;

    constructor(ms: number) {
        super();
        this._delayTime = ms;
    }

    protected start(): void {
        console.log(`==> DelayTask ${this._delayTime}`);
        setTimeout(() => {
            console.log("==> DelayAction ok");
            this.runNext();
        }, this._delayTime);
    }
}
