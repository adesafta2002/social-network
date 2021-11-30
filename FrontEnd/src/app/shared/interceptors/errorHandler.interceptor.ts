import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectUserToken } from "src/app/store/selectors/user.selectors";
import { catchError, filter, take } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    authToken: string;
    constructor(private notificationService: NotificationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorMessage: string = error.error;
                const type: 'error' = 'error';
                const notification = {
                    type,
                    message: errorMessage
                };
                console.log(notification)
                this.notificationService.sendNotification(notification);

                console.log(error, 'errorIsfrom intercetpro')
                return throwError(errorMessage)
            })
        )
    }
}