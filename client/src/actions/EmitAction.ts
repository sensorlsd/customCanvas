import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";

export class EmitAction extends TestAction {
    private readonly task: any;

    constructor(task: TaskModel) {
        super();
        this.task = task;
    }

    protected start(): void {
        const target: string = this.task.target;
        const prop = this.task.property;
        const value = this.task.value;
        console.log(`==> Emit | ${target} | ${value} | ${prop}`);

        const props = target.split('.');
        let tempTarget = window[props[0]];

        for (let i = 1; i < props.length; i++) {
            tempTarget = tempTarget[props[i]];
        }
        tempTarget.emit(value, prop);
        this.runNext();

    }

}
