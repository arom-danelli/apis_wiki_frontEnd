import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { API } from '../../models/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredApi: API | null = null;
  topApis: API[] = [];
  latestApi: API | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getApis().subscribe(
      (apis: API[]) => {
        if (apis.length > 0) {
          this.featuredApi = apis[Math.floor(Math.random() * apis.length)];
          this.topApis = apis.sort((a, b) => b.likes - a.likes).slice(0, 3);
          this.latestApi = apis[apis.length - 1];
        }
      },
      (error) => {
        console.error('Error fetching APIs:', error);
      }
    );
  }
}
