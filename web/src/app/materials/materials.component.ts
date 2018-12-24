import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  faSort,
  faCaretUp,
  faCaretDown,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';
import { PaginationService } from '../pagination.service';

enum materialOrderByInput {
  name_ASC,
  name_DESC,
  updateDate_ASC,
  updateDate_DESC,
  createDate_ASC,
  createDate_DESC
}
const Materials = gql`
  query materials($orderBy: materialOrderByInput, $limit: Int, $skip: Int) {
    materials(orderBy: $orderBy, limit: $limit, skip: $skip) {
      id
      name
    }
  }
`;
const MaterialSum = gql`
  query materialSum{
    materialSum
  }
`
@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['../../assets/css/bootstrap.min.css','./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  materials: any[];
  sortType: string;
  sortReverse: boolean;
  orderBy: string;
  faSort = faSort;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faPlusCircle = faPlusCircle;
  pageCount;
  showPage: any[] = [];
  currentPage;
  everyPageItem;
  constructor(private apollo: Apollo, private productService: ProductService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.sortType = 'name';
    this.sortReverse = true;
    this.everyPageItem = this.paginationService.pageItem;
    this.apollo.watchQuery({
      query: MaterialSum
    }).valueChanges.subscribe((result) => {
      this.pageCount = this.paginationService.countPage((result.data as any).materialSum);
      console.log(this.pageCount)
    });

    this.apollo
      .watchQuery({
        query: Materials,
        variables: {
          orderBy: 'name_ASC',
          limit: 6,
          skip: 0
        }
      })
      .valueChanges.subscribe((result) => {
        this.materials = (result.data as any).materials;
        this.currentPage = 1;
        this.showPage = this.paginationService.showPage(this.currentPage);
        console.log(this.pageCount, this.showPage);
      });
  }

  ngOnChanges(){
    // get search result
    this.productService.eventEmit.subscribe((value:string) => {
      console.log("Value: ", value);
    })
  }

  sortQuery() {
    if (this.sortReverse === true) {
      this.orderBy = this.sortType + '_ASC';
    } else {
      this.orderBy = this.sortType + '_DESC';
    }
    this.apollo
      .watchQuery({
        query: Materials,
        variables: {
          orderBy: this.orderBy,
          limit: this.paginationService.pageItem
        }
      })
      .valueChanges.subscribe((result) => {
        this.materials = (result.data as any).materials;
      });
  }

  changePage(page){
    // Click previous button
    if(page == -1){
      if(this.currentPage >1 ){
        this.currentPage = this.currentPage - 1;
      }
    }
    // Click next button
    else if(page == 0){
      if(this.currentPage < this.pageCount){
        this.currentPage = this.currentPage + 1;
      }
    }
    else{
      this.currentPage = page; 
    }
    this.apollo
      .watchQuery({
        query: Materials,
        variables: {
          orderBy: this.orderBy,
          limit: 6,
          skip: (this.currentPage - 1)*this.paginationService.pageItem
        }
      })
      .valueChanges.subscribe((result) => {
        this.materials = (result.data as any).materials;
        this.showPage = this.paginationService.showPage(this.currentPage);
      });

      return false;
  }
}
