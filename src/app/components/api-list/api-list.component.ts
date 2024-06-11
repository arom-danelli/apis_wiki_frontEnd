import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {
  apis: any[] = [];
  groupedApis: { [key: string]: any[] } = {};
  filteredApis: any[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getApis().subscribe((data: any) => {
      this.apis = data;
      this.filteredApis = this.apis;
      this.groupApis();
    });
  }

  groupApis() {
    this.groupedApis = this.filteredApis.reduce((acc, api) => {
      const firstLetter = api.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(api);
      return acc;
    }, {});
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredApis = this.apis.filter(api => api.name.toLowerCase().includes(filterValue));
    this.groupApis();
  }

  filterByLetter(letter: string) {
    this.filteredApis = this.apis.filter(api => api.name.charAt(0).toUpperCase() === letter);
    this.groupApis();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/apis', id]);
  }
}
