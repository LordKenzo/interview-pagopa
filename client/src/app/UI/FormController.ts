import * as Toastr from 'toastr';
import '../../../../node_modules/toastr/build/toastr.css'; //You need style and css loader installed and set
import { checkCF, checkMinLenght } from "../Utils/Validator";

export class FormController {

    constructor() {

    }

    private sendData(fiscal_code: string, subject: string, markdown: string) {
        const options: RequestInit = {
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                content: {
                    subject,
                    markdown,
                },
                fiscal_code
            }) 
        };
        fetch('http://localhost:3000/message', options)
        .then(res=> res.json())
        .then(res => {
            if(res.success) {
                Toastr.success(res.message)
            } else {
                Toastr.error(res.message)
            }
        })
        .catch(err => Toastr.error(err));
    }

    private formIsValid(cf: HTMLInputElement, subject: HTMLInputElement, markdown: HTMLInputElement) {
        if(!cf || !checkCF(cf.value)) {
            Toastr.warning('You need to insert a valid Fiscal Code');
            cf.focus();
            return false;
        }
        if(!subject || !checkMinLenght(subject.value, 10)) {
            Toastr.warning('You need to insert a valid Subject');
            subject.focus();
            return false;
        }
        if(!markdown || !checkMinLenght(markdown.value, 80)) {
            Toastr.warning('You need to insert a valid Text');
            markdown.focus();
            return false;
        }
        return true;
    }

    public formSend() {

        const cf: HTMLInputElement | null = document.querySelector('#cf');
        const subject: HTMLInputElement | null = document.querySelector('#subject');
        const markdown: HTMLInputElement | null = document.querySelector('#markdownArea');
        if (cf && subject && markdown && this.formIsValid(cf, subject, markdown)) {
            Toastr.info(`Nice! We are sending your message to ${cf.value}`);
            this.sendData(cf.value, subject.value, markdown.value);
        }
      
    }
}