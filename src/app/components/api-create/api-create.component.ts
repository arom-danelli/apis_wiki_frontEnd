import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-create',
  templateUrl: './api-create.component.html',
  styleUrls: ['./api-create.component.css']
})
export class ApiCreateComponent {
  apiData = {
    name: '',
    description: '',
    free: true,
    endpoints: '',
    documentation: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  createApi(): void {
    this.apiService.createApi(this.apiData).subscribe(() => {
      this.router.navigate(['/apis']);
    });
  }
}
