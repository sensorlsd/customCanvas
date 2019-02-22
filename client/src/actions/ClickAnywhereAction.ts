import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";
import {Utils} from "../utils/Utils";

export class ClickAnywhereAction extends TestAction {

    constructor() {
        super();
    }

    protected start(): void {
        document.getElementById('canvas').dispatchEvent(new Event(Utils.getWrapper().device.event.click));
        this.runNext();
    }

}
