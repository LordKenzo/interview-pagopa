import { IncomingMessage } from 'http';
import { parse } from 'url';

export class Utils {

    /**
     * Return the main handler called by the client (es. profile, message, etc...)
     * 
     * @param url the string address of endpoint
     */

    public static getBasePath(req: IncomingMessage): string {
        const url = req.url;
        if (url) {
            const parsedUrl = parse(url);
            return parsedUrl.pathname!.split('/')[1];
        } else {
            return '';
        }
    }

}