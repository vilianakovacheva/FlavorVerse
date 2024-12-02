import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from "../shared/loader/loader.component";
import { ErrorMsgComponent } from "../core/error-msg/error-msg.component";

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;
  error = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.error = true;
        this.isAuthenticating = false
      },
      complete: () => {
        this.isAuthenticating = false
      }
    })
  }

}
