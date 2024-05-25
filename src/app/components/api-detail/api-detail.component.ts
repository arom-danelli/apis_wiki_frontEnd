import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css']
})
export class ApiDetailComponent implements OnInit {
  api: any;
  comments: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
}
