import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAppNotificationInterface } from 'src/app/models/notification.interface';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'friends-list',
  templateUrl: 'friends-list.component.html',
  styleUrls: ['friends-list.component.scss']
})
export class FriendsListComponent {
  friends: IAppNotificationInterface[] = [{ firstName: 'Nicu', lastName: 'Matei', content: 'This is the content of the notification you received' }, { firstName: 'Nicu', lastName: 'andrei', content: 'This isnt the content of the notification you received' },
  { firstName: 'Nicu', lastName: 'Matei', content: 'This is the content of the notification you received' }, { firstName: 'Nicu', lastName: 'andrei', content: 'This isnt the content of the notification you received' },
  { firstName: 'Nicu', lastName: 'Matei', content: 'This is the content of the notification you received' }, { firstName: 'Nicu', lastName: 'andrei', content: 'This isnt the content of the notification you received' },
  { firstName: 'Nicu', lastName: 'Matei', content: 'This is the content of the notification you received' }, { firstName: 'Nicu', lastName: 'andrei', content: 'This isnt the content of the notification you received' },
  { firstName: 'Nicu', lastName: 'andrei', content: 'This isnt the content of the notification you received' },
  { firstName: 'Nicu', lastName: 'andrei', content: 'This isnt the content of the notification you received' }]
}
