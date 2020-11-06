import { IncomingMessage } from 'http';
import { Utils } from '../../app/Utils/Utils';

describe('Server Util Test Suite', () =>{
    test('it be a valid endpoint', () => {
        // A simple stub object to mimic an IncomingMessage
        const req = {
            url: 'http://localhost:3000/message'
        } as IncomingMessage;
        const res = Utils.getBasePath(req);
        expect(res).toBe('message');
    });

    test('an empty path is not a valid endpoint', () => {
        const req = {
            url: 'http://localhost:3000/'
        } as IncomingMessage;
        const res = Utils.getBasePath(req);
        expect(res).toBeFalsy();
    });

    test('an empty URL is not a valid request', () => {
        const req = {
            url: ''
        } as IncomingMessage;
        const res = Utils.getBasePath(req);
        expect(res).toBeFalsy();
    });
})