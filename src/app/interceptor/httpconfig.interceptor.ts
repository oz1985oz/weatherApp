import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorMsg } from '../models/error-msg';
import { CacheService } from '../services/cache.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        public errorDialogService: ErrorDialogService,
        public cacheService: CacheService,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.cacheService.isExist('key')) {
            const data = { message: 'Key not Found' };
            this.errorDialogService.openDialog(data);
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && !environment.production) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data: ErrorMsg;
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status,
                    message: error.message,
                };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            })
        );
    }
}
