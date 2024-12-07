import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ErrorMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string | undefined = '';

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const {email, password} = form.value;

  this.userService.login(email, password).subscribe({
    next: (data) => {
    const token = data.accessToken;
    localStorage.setItem('X-Authorization', token);
    this.router.navigate(['/']);
    },
    error:(err) => {
      this.errorMsg = err.error?.message
    }
  })

  }

}
