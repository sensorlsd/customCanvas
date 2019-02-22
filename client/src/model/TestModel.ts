import {TaskModel} from "./TaskModel";
import {TestConfig} from "./TestConfig";

export class TestModel {
    public static balanceAfterSpin: number = 0;
    public static isTestCanBeExecute: boolean = true;
    private static instance: TestModel;
    public session = Date.now();
    public testIndex: number = 0;

    private _config: TestConfig;

    get config(): TestConfig {
        return this._config;
    }

    set config(value: TestConfig) {
        this._config = value;
    }

    private _tasks: TaskModel[] = [];

    get tasks(): TaskModel[] {
        return this._tasks;
    }

    static getInstance() {
        if (!TestModel.instance) {
            TestModel.instance = new TestModel();
        }
        return TestModel.instance;
    }
}
