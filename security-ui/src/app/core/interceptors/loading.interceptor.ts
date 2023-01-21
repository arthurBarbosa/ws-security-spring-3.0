import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../../shared/spinner/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loarderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loarderService.isLoading.next(true);
    return next.handle(request).pipe(
      finalize(
        () => this.loarderService.isLoading.next(false)
      )
    );
  }
}
