import { TestAction } from "../actions/TestAction";

export class CallAPIAction extends TestAction {
  functionName: string;

  constructor(eventName: string) {
    super();
    this.functionName = eventName;
  }

  protected start(): void {
    console.log(`==> CallAPIAction ${this.functionName}`);
    if (window["GameAPI"][this.functionName]){
      window["GameAPI"][this.functionName]();
      this.runNext();
    }else{
      this.runNext(new Error(`API function ${this.functionName} is not found`));
    }
  }
  
}
