import { FormController } from "./FormController";

export class UIController {
    constructor() {
        this.initElements();
    }

    private initElements() {
        const button = document.querySelector('button[type="submit"]');
        if(button) {
          button.addEventListener('click', (e) => {
              e.preventDefault();
              const form = new FormController()
              form.formSend();
          });
        }

    }
}