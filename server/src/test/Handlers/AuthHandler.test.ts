import { AuthHandler } from "../../app/Handlers/AuthHandler";
import axios from 'axios';

jest.mock('axios', () => {
    return Object.assign(jest.fn(), {
      post: jest.fn().mockReturnValue({data: { sender_allowed: true } }),
    });
});

describe("Test suite", () => {
    let handler: AuthHandler;

    beforeEach(() => {
        handler = new AuthHandler();
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("No valid fiscal code return undefined", async () => {
        const spyOnAxiosPost = jest.spyOn(axios, 'post');

        const result = await handler.getProfile({fiscal_code: ''});

        expect(spyOnAxiosPost).toBeCalledTimes(0);
        expect(result).toEqual(undefined);
        

    });

    test("It want a message from you :*", async () => {
        const spyOnAxiosPost = jest.spyOn(axios, 'post');

        const result = await handler.getProfile({fiscal_code: 'AAAAAA00A00A000A'});

        expect(spyOnAxiosPost).toBeCalledTimes(1);
        expect(result).toEqual({ sender_allowed: true });
    });

    test("it doesn't want a message from you :_(", async () => {
        const spyOnAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({data:{ sender_allowed: false }});

        const result = await handler.getProfile({fiscal_code: 'BAAAAA00A00A000A'});

        expect(spyOnAxiosPost).toBeCalledTimes(1);
        expect(result).toEqual({ sender_allowed: false });
    });



    
});

/*import { AuthHandler } from "../../app/Handlers/AuthHandler";
import axios from 'axios';

jest.mock('axios');

describe('Server Auth Handler Test Suite', () => {
    let authHandler: AuthHandler;
    const axiosMock = axios as jest.Mocked<typeof axios>;
    beforeEach(() => {
        authHandler = new AuthHandler();
    });


    test('Valid Fiscal Code', async () => {
        axiosMock.post.mockResolvedValue({ sender_allowed: false }); 
    });

    test('Not Allowed Valid Fiscal Code', async () => {
        axiosMock.post.mockRejectedValue({ data: false }); 
    });

    test('Not Valid Fiscal Code', async () => {
        await expect(authHandler.getProfile({
            fiscal_code: '123'
        })).resolves.toBe(undefined);

    });
});*/