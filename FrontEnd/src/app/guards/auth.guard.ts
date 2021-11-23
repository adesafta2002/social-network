import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { selectUserToken } from '../store/selectors/user.selectors';
import { IAppState } from '../store/state/app.state';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store<IAppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let authToken: string;
        this.store.pipe(select(selectUserToken)).
            pipe(
                take(1),
                filter(token => !!token)
            ).subscribe(token =>
                authToken = token
            );

        if(authToken){
            console.log(authToken, 'da');
            return true;
        }
        
        this.router.navigate(['/auth/login']);
        return false;
    }
}