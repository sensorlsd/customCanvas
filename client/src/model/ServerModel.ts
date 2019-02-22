export class ServerModel {

    private static instance: ServerModel;
    url: string;

    static getInstance() {
        if (!ServerModel.instance) {
            ServerModel.instance = new ServerModel();
        }
        return ServerModel.instance;
    }
}
