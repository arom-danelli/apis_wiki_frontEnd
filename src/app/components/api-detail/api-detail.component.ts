import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css']
})
export class ApiDetailComponent implements OnInit {
  api: any;
  comments: any[] = [];
  newComment: string = '';
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = this.authService.getUserId();
    this.apiService.getApi(+id!).subscribe(data => {
      this.api = data;
    });
    this.apiService.getComments(+id!).subscribe(data => {
      this.comments = data;
    });
  }

  likeApi(): void {
    this.apiService.likeApi(this.api.id).subscribe(() => {
      this.api.likes += 1;
    });
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.apiService.commentApi(this.api.id, this.newComment).subscribe(comment => {
        this.comments.push(comment);
        this.newComment = '';
      });
    }
  }

  deleteApi(): void {
    if (confirm('Are you sure you want to delete this API?')) {
      this.apiService.deleteApi(this.api.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
