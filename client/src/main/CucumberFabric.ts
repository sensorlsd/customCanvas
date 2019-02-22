// import {defineSupportCode} from "../../typings";
import { supportCodeLibraryBuilder } from "cucumber/dist/cucumber";
import {
  Given,
  Then,
  When,
  Runtime,
  formatterHelpers,
  getTestCases,
  PickleFilter,
  FormatterBuilder,
  After,
  setDefaultTimeout
} from "cucumber/dist/cucumber";
import { WaitUntil } from "../actions/WaitUntil";
import { ScreenShotAction } from "../actions/ScreenShotAction";
import { TaskModel } from "../model/TaskModel";
import EventEmitter = require("eventemitter3");
import { DelayAction } from "../actions/DelayAction";
import { ClickAction } from "../actions/ClickAction";
import { ScrollPaytableByStepAction } from "../actions/ScrollPaytableByStepAction";
import { CheatAction } from "../actions/CheatAction";
import { EmitAction } from "../actions/EmitAction";
import { ClickAnywhereAction } from "../actions/ClickAnywhereAction";
import { ReloadAction } from "../actions/ReloadAction";
import { TestConfig } from "../model/TestConfig";
import { ExpectAction } from "../actions/ExpectAction";
import { WaitForAPIAction } from "../actions/WaitForAPIAction";
import { WaitForEventAction } from "../actions/WaitForEvent";
import { CallAPIAction } from '../actions/CallAPIAction';
import { ExpectApiCallAction } from '../actions/ExpectApiCallAction';

export class CucumberFabric {
  private static instance: CucumberFabric;
  private config: TestConfig;

  static getInstance() {
    if (!CucumberFabric.instance) {
      CucumberFabric.instance = new CucumberFabric();
    }
    return CucumberFabric.instance;
  }

  init(data: string) {
    this.config = new TestConfig();

    supportCodeLibraryBuilder.reset("");

    Given("locales {string}", locales => {
      this.config.languageList = locales.split(",");
    });

    When("{string} is visible", (string, done) => {
      const action = new WaitUntil(
        new TaskModel({ target: string, property: "visible", value: true })
      );
      action.next = done;
      action.execute();
    });

    When("api is available", done => {
      const action = new WaitForAPIAction();
      action.next = done;
      action.execute();
    });

    When("event {string} is dispatched", (string, done) => {
      const action = new WaitForEventAction(string);
      action.next = done;
      action.execute();
    });

    Then("call api {string}",(string,done) =>{
      const action = new CallAPIAction(string);
      action.next = done;
      action.execute();
    });
    Then("make screenshot", done => {
      const action = new ScreenShotAction();
      action.next = done;
      action.execute();
    });

    Then("anywhere click", done => {
      const action = new ClickAnywhereAction();
      action.next = done;
      action.execute();
    });

    Then("reload", done => {
      const action = new ReloadAction(this.config);
      action.next = done;
      action.execute();
    });

    Then("wait {int}", (value, done) => {
      const action = new DelayAction(value);
      action.next = done;
      action.execute();
    });

    Then("click {string}", (component, done) => {
      const action = new ClickAction(component);
      action.next = done;
      action.execute();
    });

    Then("scroll paytable by {int}", (value, done) => {
      const action = new ScrollPaytableByStepAction(value);
      action.next = done;
      action.execute();
    });

    Then("send cheat {string}", (value, done) => {
      const action = new CheatAction(JSON.parse(value));
      action.next = done;
      action.execute();
    });

    Then(
      "emit {string} to {string} with data {string}",
      (string, string2, string3, done) => {
        console.log(string, string2, string3);

        const action = new EmitAction(
          new TaskModel({
            target: string2,
            property: JSON.parse(string3.replace(/`/g, '"')),
            value: string
          })
        );
        action.next = done;
        action.execute();
      }
    );

    Then("expect {string} to have value {string}", (string, string2, done) => {
      const action = new ExpectAction(
        new TaskModel({
          property: string,
          value: string2
        })
      );
      action.next = done;
      action.execute();
    });

    Then("expect api call {string} to have value {string}", (string, string2, done) => {
      const action = new ExpectApiCallAction(
        new TaskModel({
          property: string,
          value: string2
        })
      );
      action.next = done;
      action.execute();
    });

    Then("pointer down {string}", (string, done) => {
      const action = new EmitAction(
        new TaskModel({
          target: string,
          property: { data: { originalEvent: null } },
          value: "pointerdown"
        })
      );
      action.next = done;
      action.execute();
    });

    Then("pointer up {string}", (string, done) => {
      const action = new EmitAction(
        new TaskModel({
          target: string,
          property: null,
          value: "pointerup"
        })
      );
      action.next = done;
      action.execute();
    });

    const supportCodeLibrary = supportCodeLibraryBuilder.finalize();

    const eventBroadcaster = new EventEmitter();

    const eventDataCollector = new formatterHelpers.EventDataCollector(
      eventBroadcaster
    );

    setDefaultTimeout(30 * 1000);

    const testCases = getTestCases({
      eventBroadcaster,
      pickleFilter: new PickleFilter({}),
      source: data,
      uri: "/feature"
    });

    const formatterOptions = {
      colorsEnabled: true,
      cwd: "/",
      eventBroadcaster,
      eventDataCollector,
      log(data) {
        console.log(data);
      },
      supportCodeLibrary
    };
    FormatterBuilder.build("progress", formatterOptions);

    const runtime = new Runtime({
      eventBroadcaster,
      options: {},
      testCases,
      supportCodeLibrary
    });
    runtime.start();
    console.log("Starting Cucumber");
  }
}
