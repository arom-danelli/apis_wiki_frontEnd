import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aqui você deve adicionar a lógica para enviar instruções de recuperação de senha
    console.log('Instruções enviadas para:', this.email);
    this.router.navigate(['/login']);
  }
}
