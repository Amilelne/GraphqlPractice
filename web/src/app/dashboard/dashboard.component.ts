import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../assets/css/bootstrap.min.css']
})
export class DashboardComponent implements OnInit {
  constructor(private productService: ProductService, private apollo: Apollo) {}

  ngOnInit() {}

  getMaterial() {
    this.productService
      .getMaterial()
      .subscribe((materials) => console.log(materials));
  }
}
