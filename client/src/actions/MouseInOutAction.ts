import {TestAction} from "../actions/TestAction";

export class MouseInOutAction extends TestAction {
    protected _target: string;
    protected _event: string;

    constructor(target: string, event: string) {
        super();
        this._target = target;
        this._event = event;
    }

    protected start(): void {
        console.log(`==> autotest | MouseInOutAction | ${this._event} | execute`);
        const mouseInOutEvent = window[this._target]._events[this._event];
        mouseInOutEvent.fn.call(mouseInOutEvent.context);
        setTimeout(() => {
            this.runNext();
        }, 3000);
    }
}
