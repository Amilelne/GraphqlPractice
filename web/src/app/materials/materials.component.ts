import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  faSort,
  faCaretUp,
  faCaretDown,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

enum materialOrderByInput {
  name_ASC,
  name_DESC,
  updateDate_ASC,
  updateDate_DESC,
  createDate_ASC,
  createDate_DESC
}
const Materials = gql`
  query materials($orderBy: materialOrderByInput) {
    materials(orderBy: $orderBy) {
      id
      name
    }
  }
`;
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
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.sortType = 'name';
    this.sortReverse = true;
    this.apollo
      .watchQuery({
        query: Materials,
        variables: {
          orderBy: 'name_ASC'
        }
      })
      .valueChanges.subscribe((result) => {
        this.materials = (result.data as any).materials;
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
        query: Materials,
        variables: {
          orderBy: this.orderBy
        }
      })
      .valueChanges.subscribe((result) => {
        this.materials = (result.data as any).materials;
      });
  }
}
