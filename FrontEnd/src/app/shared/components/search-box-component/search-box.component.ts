import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "src/app/models/user.interface";

@Component({
    selector: 'app-search-box',
    templateUrl: 'search-box.component.html',
    styleUrls: ['search-box.component.scss']
})
export class AppSearchBoxComponent {
    @Input() users: IUser[];
    @Output() onProfileSelect = new EventEmitter<boolean>();

    constructor(private router: Router) { }


    addFriend(user: IUser) {
        console.log('added friend')
    }

    seeUserPage(user: IUser) {
        this.router.navigate(['/main/profile/', user.id]);
        this.onProfileSelect.emit(true);
    }

    getFullName(user: IUser) {
        return `${user.firstName} ${user.lastName}`;
    }
}