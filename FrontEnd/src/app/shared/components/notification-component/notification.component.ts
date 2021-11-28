import { Component, Input } from '@angular/core';
import { IAppNotificationInterface } from 'src/app/models/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.scss']
})
export class NotificationComponent {
  @Input() notification: IAppNotificationInterface
}
