import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NeatGradient, NeatConfig } from '@firecms/neat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';

  @ViewChild('gradientCanvas', { static: true }) gradientCanvas!: ElementRef<HTMLCanvasElement>;
  private neat!: NeatGradient;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const config: NeatConfig = {
      colors: [
        { color: '#FF5373', enabled: true },
        { color: '#FFC858', enabled: true },
        { color: '#17E7FF', enabled: true },
        { color: '#6D3BFF', enabled: true }
      ],
      speed: 4,
      horizontalPressure: 4,
      verticalPressure: 5,
      waveFrequencyX: 2,
      waveFrequencyY: 3,
      waveAmplitude: 5,
      shadows: 0,
      highlights: 2,
      colorSaturation: 7,
      colorBrightness: 1,
      wireframe: false,
      colorBlending: 6,
      backgroundColor: '#003FFF',
      backgroundAlpha: 1
    };

    this.neat = new NeatGradient({
      ref: this.gradientCanvas.nativeElement,
      ...config
    });
  }

  ngOnDestroy() {
    this.neat.destroy();
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error logging in', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
