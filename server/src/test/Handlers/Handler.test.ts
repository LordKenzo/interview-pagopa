import { Handler } from "../../app/Handlers/Handler";
import { HTTP_CODES } from "../../app/Models/Models";

describe('Server Handler Test Suite', () => {
    let handler: Handler;

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

    beforeEach(() => { 
        handler = new Handler(
            resMock as any,
            resMock as any
        );
    });

    test('it handle Method Not Found', async () => {
        await handler.handleMethodNotFound();
        expect(resMock.statusCode).toBe(HTTP_CODES.NOT_FOUND);
    });

});