import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';
import { ClipboardService } from 'ngx-clipboard';
import {
  faSort,
  faCaretUp,
  faCaretDown,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { PaginationService } from '../pagination.service';

enum recipeOrderByInput {
  title_ASC,
  title_DESC,
  description_ASC,
  description_DESC,
  difficult_ASC,
  difficult_DESC,
  updateDate_ASC,
  updateDate_DESC,
  createDate_ASC,
  createDate_DESC
}
const Recipes = gql`
  query Recipes($orderBy: recipeOrderByInput, $limit: Int, $skip: Int) {
    recipes(orderBy: $orderBy, limit: $limit, skip: $skip) {
      id
      title
      image
      description
      difficult
    }
  }
`;
const RecipeSum = gql`
  query recipeSum{
    recipeSum
  }
`
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../../assets/css/bootstrap.min.css', './recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  id: string;
  recipes: any[];
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
  private querySubscription: any;
  constructor(
    private apollo: Apollo,
    private _clipboardService: ClipboardService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.sortType = 'title';
    this.sortReverse = true;
    this.everyPageItem = this.paginationService.everyPageItem;
    this.apollo.watchQuery({
      query: RecipeSum
    }).valueChanges.subscribe((result) => {
      this.pageCount = this.paginationService.countPage((result.data as any).recipeSum);
    });

    this.querySubscription = this.apollo
      .watchQuery({
        query: Recipes,
        variables: {
          orderBy: 'title_ASC',
          limit: this.paginationService.everyPageItem,
          skip: 0
        }
      })
      .valueChanges.subscribe((result) => {
        this.recipes = (result.data as any).recipes;
        this.currentPage = 1;
        this.showPage = this.paginationService.showPage(this.currentPage);
      });
  }

  sortQuery() {
    if (this.sortReverse === true) {
      this.orderBy = this.sortType + '_ASC';
    } else {
      this.orderBy = this.sortType + '_DESC';
    }
    this.apollo
      .watchQuery({
        query: Recipes,
        variables: {
          orderBy: this.orderBy,
          limit: this.paginationService.everyPageItem,
          skip: 0
        }
      })
      .valueChanges.subscribe((result) => {
        this.recipes = (result.data as any).recipes;
      });
    this.currentPage = 1;
  }

  copy(text: string) {
    this._clipboardService.copyFromContent(text);
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
        query: Recipes,
        variables: {
          orderBy: this.orderBy,
          limit: 6,
          skip: (this.currentPage - 1)*this.paginationService.everyPageItem
        }
      })
      .valueChanges.subscribe((result) => {
        this.recipes = (result.data as any).recipes;
        this.showPage = this.paginationService.showPage(this.currentPage);
      });
    return false;
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
