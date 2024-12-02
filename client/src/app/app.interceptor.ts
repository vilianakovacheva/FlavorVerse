import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorMsgService } from './components/core/error-msg/error-msg.service';
import { Router } from '@angular/router';

const {apiUrl} = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    
  if(req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl)
    })
  }

  const token = localStorage.getItem('X-Authorization');
  if(token) {
    req = req.clone({
      setHeaders: {
        'X-Authorization': token
      }
    })
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if(err.status === 401) {
        localStorage.removeItem('X-Authorization');
      } else {
        console.log('Error');
        errorMsgService.setError(err);
        // router.navigate(['/error'])
      }

      return [err];
    })
  )
};