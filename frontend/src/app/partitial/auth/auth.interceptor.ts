import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import { catchError } from 'rxjs/internal/operators';
import {Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService : AuthService, private router: Router){}

    intercept(req:HttpRequest<any>,next:HttpHandler){

        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization',"Bearer " + authToken).set('Content-Type', 'application/json')
        });
        return next.handle(authRequest).pipe(
            catchError((err, caught: Observable<HttpEvent<any>>) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401:
                            this.authService.logout();
                            this.router.navigate(['PleaseLogin'], { queryParams: { returnUrl: req.url } });
                            break;
                        case 400:
                            this.router.navigate(['/400'], { queryParams: { returnUrl: req.url } });
                            break;
                        case 404:
                            this.router.navigate(['/404'], { queryParams: { returnUrl: req.url } });
                            break;
                        case 405:
                            this.router.navigate(['/405'], { queryParams: { returnUrl: req.url } });
                            break;
                        case 503:
                            this.router.navigate(['/503'], { queryParams: { returnUrl: req.url } });
                            break;
                        default:
                            this.router.navigate([''], { queryParams: { returnUrl: req.url } });
                            break;
                    }
                    return of(err as any);
                }
                throw err;
            }));
    }

}