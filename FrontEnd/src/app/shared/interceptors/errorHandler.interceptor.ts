import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    authToken: string;
    constructor(private messageService: MessageService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorMessage: string = error.error;
                const notification = { severity: 'error', summary: 'Error', detail: errorMessage };
                this.messageService.add(notification);
                setTimeout(() => {
                    this.messageService.clear();
                }, 2000);
                return throwError(errorMessage)
            })
        )
    }
}