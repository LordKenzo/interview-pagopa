/* istanbul ignore next */
import { Launcher } from "./app/Launcher";
if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

new Launcher().startApp()