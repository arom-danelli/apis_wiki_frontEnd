import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-create',
  templateUrl: './api-create.component.html',
  styleUrls: ['./api-create.component.css'],
})
export class ApiCreateComponent {
  apiData = {
    name: '',
    description: '',
    endpoints: [{ url: '', method: '', description: '' }],
    documentation: '',
    free: false,
  };

  constructor(private apiService: ApiService, private router: Router) {}

  addEndpoint() {
    this.apiData.endpoints.push({ url: '', method: '', description: '' });
  }

  removeEndpoint(index: number) {
    this.apiData.endpoints.splice(index, 1);
  }

  createApi(): void {
    const formData = new FormData();
    const apiDataJson = JSON.stringify(this.apiData);

    formData.append('api_data', apiDataJson);

    this.apiService.createApi(formData).subscribe(
      () => {
        this.router.navigate(['/apis']);
      },
      error => {
        console.error('Error creating API', error);
      }
    );
  }
}
