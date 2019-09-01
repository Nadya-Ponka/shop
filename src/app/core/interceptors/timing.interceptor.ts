import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request interceptor
    let clonedRequest;
    let startRequest;
    if (req.url.includes('productsList/2')) {
      clonedRequest = req.clone({
        params: new HttpParams()
          .set('timing_interceptor', Date.now().toString())
        // clear the body
        // body: null
      });
      console.log(clonedRequest);
      startRequest = performance.now();
    } else {
      clonedRequest = req;
    }

// response interceptor
return next.handle(clonedRequest).pipe(
  filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
  map((event: HttpResponse<any>) => {
    // do stuff with response
    if (event.url.includes('productsList/2')) {
      console.log('Response Interceptor: ');
      console.log(event);
      console.log('Request took ' + (performance.now() - startRequest) + ' ms');
    }
    return event;
  })
);
}
}
