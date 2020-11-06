import { IncomingMessage, ServerResponse } from "http";
import { AuthorizeProfile, HTTP_CODES, HTTP_VERBS, Message, MessageCreated } from "../Models/Models";
import { Handler } from "./Handler";
import axios from 'axios';
import { API_BASE_URL, API_MESSAGE_URL } from "../Server/config";

/**
 * MessageHandler is the main class of the project. It received a request message and send a response.
 * It use an Authorization Handler to verify if the user is an allower sender.
 * 
 */
export class MessageHandler extends Handler {

    private auth: AuthorizeProfile;
    private header = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.APISECRET
    }

    public constructor(req: IncomingMessage, res: ServerResponse, auth: AuthorizeProfile) {
        super(req, res);
        this.auth = auth;
    }


    /**
     * The handleRequest method accepts only POST and OPTIONS HTTP VERBS, because I use only POST to IO Rest API
     */
    public async handleRequest() : Promise<void> {
        switch (this.req.method) {
            case HTTP_VERBS.POST:
                await this.handlePost();
                break;
            // I need it for PREFLIGHT CORS
            case HTTP_VERBS.OPTIONS:
                await this.res.writeHead(HTTP_CODES.OK);
                break;
            default:
                await this.handleVerbNotFound();
        }
        
    }

    /**
     * writeResponse is responsabile to write the response
     * 
     * @param httpCode enumeration to rapresent the status code of a HTTP response
     * @param message is an object (typed inline at this time) to represent the message from the HTTP operation
     */
    private writeResponse(httpCode: HTTP_CODES, message: {success: boolean, message: string}) {
        this.res.writeHead(httpCode, {
            'Content-Type': 'application/json',
        });
        this.res.statusCode = httpCode
        this.res.write(JSON.stringify(message));
    }

    /**
     * handlePost is the handler for POST HTTP VERB
     */
    private async handlePost() {
        try {
            const body: Message = await this.getBody<Message>();
            const authorizedProfile = await this.auth.getProfile({fiscal_code : body.fiscal_code});
            if(authorizedProfile && authorizedProfile.sender_allowed) {
                return axios.post<MessageCreated>(`${API_BASE_URL}/${API_MESSAGE_URL}`,{
                    content: body.content,
                    fiscal_code: body.fiscal_code
                }, {headers: this.header})
                .then(res => {
                    this.writeResponse(HTTP_CODES.CREATED, {success: true, message: `Your ID Message: ${res.data.id}`});
                })
                .catch(() => {
                    this.writeResponse(HTTP_CODES.NOT_FOUND, {success: false, message: 'No user found for the provided fiscal code.'});
                })
                
            } else {
                this.writeResponse(HTTP_CODES.UNAUTHORIZED, {success: false, message: 'Unauthorized for the provided fiscal code.'});
            }
        } catch (err) {
            this.writeResponse(HTTP_CODES.BAD_REQUEST, {success: false, message: 'error'+ err.message})
        }
    }

}