import { Component, OnInit } from '@angular/core';
import { Apollo, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormControl } from '@angular/forms';

const addRecipe = gql`
  mutation addRecipe($data: CreateRecipeInput!) {
    addRecipe(data: $data) {
      id
      title
      description
    }
  }
`;
const Materials = gql`
  query materials($orderBy: materialOrderByInput) {
    materials(orderBy: $orderBy) {
      id
      name
    }
  }
`;
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: [
    '../../assets/css/bootstrap.min.css',
    './add-recipe.component.css'
  ]
})
export class AddRecipeComponent implements OnInit {
  model = {
    title: '',
    description: '',
    image: '',
    difficult: 1,
    listOfSelectedValue: []
  };
  listOfOption = [];
  listOfDifficulty = [1,2,3,4,5];
  show: String = 'false';
  result: Object;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
    .watchQuery({
      query: Materials,
      variables: {
        orderBy: 'name_ASC'
      }
    })
    .valueChanges.subscribe((result) => {
      this.listOfOption = (result.data as any).materials;
    });
  }

  onSubmit() {
    this.apollo
      .mutate({
        mutation: addRecipe,
        variables: {
          data: {
            title: this.model.title,
            description: this.model.description,
            image: this.model.image,
            difficult: this.model.difficult,
            materials: this.model.listOfSelectedValue
          }
        }
      })
      .subscribe(
        ({ data }) => {
          this.show = 'success';
          this.result = data.addRecipe;
          this.model.title = '';
          this.model.description = '';
          this.model.image = '';
          this.model.listOfSelectedValue = [];
        },
        (error) => {
          this.show = 'error';
          console.error(`Error: ${error}`);
        }
      );
  }
}
