import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ErrorMsgComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMsg: string | undefined = '';

  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const {email, password, rePassword} = form.value;

    this.userService.register(email, password, rePassword).subscribe({
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