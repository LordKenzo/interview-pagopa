import { IncomingMessage, ServerResponse } from "http";
import { AuthorizeProfile, HTTP_CODES, HTTP_VERBS, Message, MessageCreated } from "../Models/Models";
import { Handler } from "./Handler";
import axios from 'axios';
import { API_BASE_URL, API_MESSAGE_URL } from "../Server/config";

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

    private async handlePost() {
        try {
            const body: Message = await this.getBody<Message>();
            const authorizedProfile = await this.auth.getProfile({fiscal_code : body.fiscal_code});
            console.log('AUTH', authorizedProfile);
            if(authorizedProfile && authorizedProfile.sender_allowed) {
                return axios.post<MessageCreated>(`${API_BASE_URL}/${API_MESSAGE_URL}`,{
                    content: body.content,
                    fiscal_code: body.fiscal_code
                }, {headers: this.header})
                .then(res => {
                    this.res.statusCode = HTTP_CODES.CREATED;
                    this.res.writeHead(HTTP_CODES.CREATED, {
                        'Content-Type': 'application/json',
                    });
                    this.res.write(JSON.stringify({success: true, message: `Your ID Message: ${res.data.id}`}));
                })
                .catch(() => {
                    this.res.statusCode = HTTP_CODES.NOT_FOUND;
                    this.res.write(JSON.stringify({success: false, message: 'No user found for the provided fiscal code.'}));
                })
                
            } else {
                this.res.statusCode = HTTP_CODES.UNAUTHORIZED;
                this.res.write(JSON.stringify({success: false, message: 'Unauthorized for the provided fiscal code.'}));
            }
        } catch (err) {
            this.res.statusCode = HTTP_CODES.BAD_REQUEST;
            this.res.write('error'+ err.message);
        }
    }

}