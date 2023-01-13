import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { MessageService } from "primeng/api";
import { distinctUntilChanged, takeWhile, take } from "rxjs/operators";
import { IRelationship } from "src/app/models/relationship.interface";
import { IUser } from "src/app/models/user.interface";
import { selectUser } from "src/app/store/selectors/user.selectors";
import { IAppState } from "src/app/store/state/app.state";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-search-box',
    templateUrl: 'search-box.component.html',
    styleUrls: ['search-box.component.scss']
})
export class AppSearchBoxComponent implements OnInit, OnDestroy {
    @Input() users: IUser[];
    @Input() currentUser: IUser;
    @Output() onProfileSelect = new EventEmitter<boolean>();
    alive = false;

    constructor(private router: Router, private store: Store<IAppState>, private userService: UserService, private messageService: MessageService) { }

    ngOnInit(): void {
    }

    seeUserPage(user: IUser) {
        this.router.navigate(['/main/profile/', user.id]);
        this.onProfileSelect.emit(true);
    }

    getFullName(user: IUser) {
        return `${user.firstName} ${user.lastName}`;
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}