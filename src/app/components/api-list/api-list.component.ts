import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { API } from '../../models/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {

  apis: API[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<API>(this.apis);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.apiService.getApis().subscribe(data => {
      this.apis = data;
      this.dataSource.data = this.apis;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetail(id: number): void {
    this.router.navigate(['/apis', id]);
  }
}
