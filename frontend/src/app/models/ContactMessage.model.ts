import {Data} from "@angular/router";

export interface ContactMessage {
    _id: string;
    email: string;
    message:string;
    date : Date;
    handled: boolean;
}