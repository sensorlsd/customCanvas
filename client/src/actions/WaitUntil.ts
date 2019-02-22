import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";

export class WaitUntil extends TestAction {
    private readonly task: any;

    constructor(task: TaskModel) {
        super();
        this.task = task;
    }

    protected start(): void {
        console.log('==> autotest | WaitUntil | execute');
        const target = this.task.target;
        const prop = this.task.property;
        const value = this.task.value;

        const interval = setInterval(() => {
            if (window[target] && window[target][prop] === value) {
                clearInterval(interval);
                console.log('==> autotest | WaitUntil | done');
                this.runNext();
            } else {
                console.log('waiting for: ', target, `${prop} = ${value}`);
            }
        }, 100);

    }

}
