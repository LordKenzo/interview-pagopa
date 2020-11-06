export interface Message {
    content: {
        subject: string;
        markdown: string;
    },
    fiscal_code: string
}

export interface MessageCreated {
    id: string;
}

export interface Profile {
    fiscal_code: string;
}

export interface ProfileSettings {
    sender_allowed: boolean;
    preferred_languages?: string[];
}

export interface AuthorizeProfile {
    getProfile(fiscale_code: Profile): Promise<ProfileSettings | undefined>
}

export enum HTTP_CODES {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum HTTP_VERBS {
    GET = 'GET',
    POST = 'POST',
    OPTIONS = 'OPTIONS'
}