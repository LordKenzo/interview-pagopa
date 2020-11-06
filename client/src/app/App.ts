import { UIController } from "./UI/UIController";

export class App {

    ui: UIController = new UIController();
   
    public constructor() {
        console.log('App started!');
    }

    public startApp() {
        
    }
}

new App().startApp();