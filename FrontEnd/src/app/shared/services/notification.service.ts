import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAppNotificationInterface } from "src/app/models/notification.interface";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSource = new BehaviorSubject<IAppNotificationInterface>(null);
    notifications = this.notificationsSource.asObservable();

    constructor() { }

    sendNotification(notification: IAppNotificationInterface) {
        this.notificationsSource.next(notification);
    }

}