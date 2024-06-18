import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redireciona após 2 segundos
      },
      error => {
        console.error('Error during registration', error);
      }
    );
  }
}
