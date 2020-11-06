/* istanbul ignore file */
import { Server } from "./Server/Server";

export class Launcher {
    server: Server;
    constructor() {
        console.log('set you api in .env or set in you environment SO system in production!!!');
        console.log('You are using this API: ', process.env.APISECRET);
        this.server = new Server(3000);
    }

    startApp() {
        this.server.createServer();
    }
}

