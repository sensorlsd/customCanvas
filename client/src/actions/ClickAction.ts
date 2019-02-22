import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";

export class ClickAction extends TestAction {
    protected target: string;

    constructor(target: string) {
        super();
        this.target = target;
    }

    protected start(): void {
        console.log(`==> autotest | TestClickButton | ${this.target}`);
        const deviceClickEventName = Utils.getWrapper().device.event.click;

        const props = this.target.split('.');
        let tempTarget = window[props[0]];

        for (let i = 1; i < props.length; i++) {
            tempTarget = tempTarget[props[i]];
        }
        tempTarget.emit("pointerdown", {data: {originalEvent: null}});
        tempTarget.emit("pointerup");
        tempTarget.emit(deviceClickEventName);
        this.runNext();

    }
}
