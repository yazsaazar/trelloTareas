import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const API_KEY = '4acf75a02331780ad357e9a96d4a31d1';
const API_TOKEN = 'ATTA5cfb578b9253222c131519e11db0d8d88e01754f29be70797067ec0ac0da6eb37E831CC3';

@Injectable({providedIn: 'root'})
export class TokenInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders : {
                Accept: 'application/json',
                'Authorization':
                    'OAuth oauth_consumer_key="' + API_KEY + '", oauth_token="'+ API_TOKEN +'"'
                    //OAuth oauth_consumer_key="12345", oauth_token="12345"
            }
        });

        return next.handle(req);
    }
}
