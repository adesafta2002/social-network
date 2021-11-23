import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectUserToken } from "src/app/store/selectors/user.selectors";
import { filter, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    authToken: string;
    constructor(private store: Store<IAppState>) {
        this.store.pipe(select(selectUserToken)).
            pipe(
                take(1),
                filter(token => !!token)
            ).subscribe(token =>
                this.authToken = token
            );
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.get('skip')) {
            const headers = request.headers.delete('skip');
            return next.handle(request.clone({ headers }));
        }
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authToken}`
            }
        })
        return next.handle(request);
    }
}