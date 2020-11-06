if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import { MessageHandler } from "../../app/Handlers/MessageHandler"
import { HTTP_CODES, HTTP_VERBS } from "../../app/Models/Models";
import axios from 'axios';

describe('Server MessageHandler Test Suite', () => {
    let messageHandler: MessageHandler;

    // Mock Object needed for my Handler
    const reqMock = {
        method: ''
    };
    const resMock = {
        // Mock method called by my tests
        statusCode: jest.fn(),
        writeHead: jest.fn(),
        write: jest.fn()
    };
    const authMock = {
        getProfile: jest.fn()
    };

    const getBodyMock = jest.fn();

    beforeEach(() => {
        messageHandler = new MessageHandler(
            reqMock as any,
            resMock as any,
            authMock as any
        );
        // Implicit casting for protected method to be testable
        (messageHandler as any).getBody = getBodyMock;
        authMock.getProfile.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
       
    });

    test('On OPTIONS send an OK', async () => {
        reqMock.method = HTTP_VERBS.OPTIONS;
        await messageHandler.handleRequest();
        expect(resMock.writeHead).toBeCalledWith(HTTP_CODES.OK);
    });

    test('On Default don\'t call WriteHead', async () => {
        reqMock.method = 'PATCH'
        await messageHandler.handleRequest();
        expect(resMock.writeHead).not.toBeCalled();

    });

    test('On Default send a Wrong Message', async () => {
        reqMock.method = 'PATCH'
        await messageHandler.handleRequest();
        expect(resMock.write).toBeCalledWith('Wrong Verb for method');
    });

    test('It be a valid POST Request', async () => {
       
        reqMock.method = HTTP_VERBS.POST;
        getBodyMock.mockReturnValueOnce({
            content: {
                subject: '0123456789',
                markdown: '01234567890123456789012345678901234567890123456789012345678901234567890123456789',
            },
            fiscal_code: 'AAAAAA00A00A000A'
        });
        authMock.getProfile.mockReturnValueOnce({
            sender_allowed: true
        });
        await messageHandler.handleRequest();
        expect(resMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(resMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, {
            'Content-Type': 'application/json'
        });
        //jest.spyOn(axios, 'post')
        //.mockReturnValueOnce({message: 'success'} as any);
        //expect(resMock.write).toBeCalledWith(JSON.stringify({success: true}));

    });

    test('It be unauthorized on some fiscal code', async () => {
        reqMock.method = HTTP_VERBS.POST;
        getBodyMock.mockReturnValueOnce({
            content: {
                subject: '0123456789',
                markdown: '01234567890123456789012345678901234567890123456789012345678901234567890123456789',
            },
            fiscal_code: 'BAAAAA00A00A000A'
        });
        authMock.getProfile.mockReturnValueOnce({
            sender_allowed: false
        });
        await messageHandler.handleRequest();
        expect(resMock.statusCode).toBe(HTTP_CODES.UNAUTHORIZED);
    });

    test('It be a NOT FOUND fiscal Code on POST Request', async () => {
        reqMock.method = HTTP_VERBS.POST;
        getBodyMock.mockReturnValueOnce({
            content: {
                subject: '0123456789',
                markdown: '01234567890123456789012345678901234567890123456789012345678901234567890123456789',
            },
            fiscal_code: 'BAAAAA00A00A000A'
        });
        authMock.getProfile.mockClear();
        authMock.getProfile.mockReturnValueOnce({
            sender_allowed: true
        });
        await messageHandler.handleRequest();
        expect(resMock.statusCode).toBe(HTTP_CODES.NOT_FOUND);
    });

    test('It will be a bad request', async () => {
        reqMock.method = HTTP_VERBS.POST;
        authMock.getProfile.mockRejectedValueOnce({
            sender_allowed: false
        });
        await messageHandler.handleRequest();
        expect(resMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });
});