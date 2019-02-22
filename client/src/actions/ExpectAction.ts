import { TestAction } from "../actions/TestAction";
import { TaskModel } from "../model/TaskModel";

export class ExpectAction extends TestAction {
  private readonly task: any;

  constructor(task: TaskModel) {
    super();
    this.task = task;
  }

  protected start(): void {
    const prop = this.task.property;
    const value = this.task.value;
    console.log(`==> Expect | ${prop}| to be | ${value}`);

    const props = prop.split(".");
    let tempTarget = window[props[0]];

    for (let i = 1; i < props.length; i++) {
      tempTarget = tempTarget[props[i]];
    }
    if (String(tempTarget) === value) {
      this.runNext();
    } else {
        
        this.runNext(new Error(`Expect failed| ${tempTarget}| is not | ${value}`));
    }
  }
}
