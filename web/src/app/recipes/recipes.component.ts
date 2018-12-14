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
  query Recipes($orderBy: recipeOrderByInput) {
    recipes(orderBy: $orderBy) {
      id
      title
      image
      description
      difficult
    }
  }
`;
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
  private querySubscription: any;
  constructor(
    private apollo: Apollo,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.sortType = 'title';
    this.sortReverse = true;
    this.querySubscription = this.apollo
      .watchQuery({
        query: Recipes,
        variables: {
          orderBy: 'title_ASC'
        }
      })
      .valueChanges.subscribe((result) => {
        this.recipes = (result.data as any).recipes;
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
          orderBy: this.orderBy
        }
      })
      .valueChanges.subscribe((result) => {
        this.recipes = (result.data as any).recipes;
      });
  }

  copy(text: string) {
    this._clipboardService.copyFromContent(text);
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
