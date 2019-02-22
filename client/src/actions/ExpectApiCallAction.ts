import { TestAction } from "../actions/TestAction";
import { TaskModel } from "../model/TaskModel";

export class ExpectApiCallAction extends TestAction {
  private readonly task: any;

  constructor(task: TaskModel) {
    super();
    this.task = task;
  }

  protected start(): void {
    const prop = this.task.property;
    const value = this.task.value;
    console.log(`==> Expect method| ${prop}| to return | ${value}`);

    let returnedValue = window["GameAPI"][prop]();

    
    if (String(returnedValue) === value) {
      this.runNext();
    } else {
        
        this.runNext(new Error(`Expect failed| ${returnedValue}| is not | ${value}`));
    }
  }
}
