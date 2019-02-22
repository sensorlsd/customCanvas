import { TestAction } from "../actions/TestAction";

export class WaitForEventAction extends TestAction {
  eventName: string;

  constructor(eventName: string) {
    super();
    this.eventName = eventName;
  }

  protected start(): void {
    console.log(`==> WaitForEventAction ${this.eventName}`);
    window["GameAPI"].addListener(this.eventName, data => {
      this.onEvent();
    });
  }
  onEvent(): any {
    window["GameAPI"].removeListener(this.eventName);
    this.runNext();
  }
}
