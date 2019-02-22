import { TestAction } from "../actions/TestAction";
import { ServerModel } from "../model/ServerModel";
import { Utils } from "../utils/Utils";
import * as html2canvas from "html2canvas";
import { TestModel } from "../model/TestModel";

export class ScreenShotAction extends TestAction {
  drawImageNewWay() {
    window["c_rootGroup"]._rendereManager.render(true);
    html2canvas(document.body, {
      logging: false,
      height: window.innerHeight
    }).then(canvas => {
      console.log("+++++++++++++ ", canvas.width, canvas.height);
      console.log(window.innerHeight, window.devicePixelRatio);
      this.saveImageToServer(canvas);
    });
  }

  protected start(): void {
    console.log("==> autotest | ScreenShotAction | execute");
    this.drawImageNewWay();
  }

  private saveImageToServer(canvas: HTMLCanvasElement) {
    const serverModel = ServerModel.getInstance();
    const data = canvas.toDataURL("image/jpeg");
    const lang = Utils.getWrapper().device.getParams["lang"]
      ? Utils.getWrapper().device.getParams["lang"]
      : "en";
    const index = TestModel.getInstance().testIndex;
    const session =
      Utils.getWrapper().device.getParams["ses"] ||
      TestModel.getInstance().session;
    const testid = Utils.getWrapper().device.getParams["testId"];

    fetch(
      serverModel.url +
        "/api/saveScreenShot/" +
        session +
        "?step=" +
        index +
        "&lang=" +
        lang +
        "&test=" +
        testid,
      {
        method: "POST",
        headers: {
          "Content-Type": "You will perhaps need to define a content-type here"
        },
        body: data // This is your file object
      }
    )
      .then(
        response => {} // if the response is a JSON object
      )
      .then(
        success => {
          console.log("==> autotest | ScreenShotAction ok");
          this.runNext();
        } // Handle the success response object
      )
      .catch(
        error => {
          return console.log("==> " + error);
        } // Handle the error response object
      );
  }
}
