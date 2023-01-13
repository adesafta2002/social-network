import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserNotification } from 'src/app/models/user-notification.interface';
import { EFieldEndpoint, EMainEndpoint } from '../enpoints';

@Injectable({
    providedIn: 'root'
})
export class UserNotificationsService {
    constructor(private http: HttpClient) { }

    get(userId) {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.notifications + `?userId=${userId}`);
    }

    post(notification: IUserNotification) {
        return this.http.post(EMainEndpoint.api + EFieldEndpoint.notifications, notification, { responseType: 'text' })
    }

    delete(id: number) {
        return this.http.delete(EMainEndpoint.api + EFieldEndpoint.notifications + `/${id}`)
    }
}