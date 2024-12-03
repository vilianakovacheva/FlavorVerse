import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    debugger
    const isLoggedIn = localStorage.getItem('X-Authorization') !== null;
    if (isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
