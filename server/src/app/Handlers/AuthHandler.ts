import { AuthorizeProfile, Profile, ProfileSettings } from "../Models/Models";
import axios from 'axios';
import { API_BASE_URL, API_PROFILE_URL } from "../Server/config";

/**
 * This class take a Fiscal Code and check if profile is an allowed sender from IO REST API
 * 
 */
export class AuthHandler implements AuthorizeProfile {

    private header = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.APISECRET
    }
    
    async getProfile(profile: Profile): Promise<ProfileSettings | undefined> {
        if(profile.fiscal_code.length === 16) {
           const data = await this.sendRequest(profile.fiscal_code);
           return data;
        } else {
            return undefined;
        }
    }

    private async sendRequest(fiscal_code: string) {
        try {
            const response = await axios.post<ProfileSettings>(`${API_BASE_URL}/${API_PROFILE_URL}`,{
                fiscal_code
            }, {headers: this.header})
            return await response.data;
        } catch (err) {
            throw err;
        }
    }

   
}