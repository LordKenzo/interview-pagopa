import { createServer, IncomingMessage, ServerResponse } from 'http';
import { MessageHandler } from '../Handlers/MessageHandler';
import { AuthHandler } from '../Handlers/AuthHandler';
import { Utils } from '../Utils/Utils';
import { Handler } from '../Handlers/Handler';

/**
 * Server: this class is built on createServer method from http NodeJS standard library
 * It takes a request, check the Base Path and resolve with the appropriate Handler (just one for this project!)
 */
export class Server {

    private user: AuthHandler = new AuthHandler();

    constructor(public port: number = 8080) {}

    createServer() {
        createServer(
            async (req: IncomingMessage, res: ServerResponse) => {
                // To allow preflight from my client (Options + Post)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                const endpoint = Utils.getBasePath(req);
                switch(endpoint) {
                    case 'message':
                        await new MessageHandler(req, res, this.user).handleRequest();
                        break;
                    default:
                        await new Handler(req, res).handleMethodNotFound();
                }
                res.end();
            }
        ).listen(this.port, () => {
            console.log(`Server started at ${this.port}`)
        });
    }
}