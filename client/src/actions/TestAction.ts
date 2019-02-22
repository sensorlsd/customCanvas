import { TestModel } from "../model/TestModel";

export abstract class TestAction {
  private nextAction: Function;

  public set next(nextAction: Function) {
    this.nextAction = nextAction;
  }

  public execute(): void {
    /*const interval = setInterval(() => {
            if (TestModel.isTestCanBeExecute) {
                clearInterval(interval);
                this.start();
            }
        }, 1000);*/
    this.start();
  }

  protected runNext(error?: Error): void {
    TestModel.getInstance().testIndex++;
    if (this.nextAction) {
      error ? this.nextAction(error) : this.nextAction();
    }
  }

  protected start(): void {}
}
