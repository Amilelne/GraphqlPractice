import { Component, OnInit } from '@angular/core';
import { Apollo, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormControl } from '@angular/forms';

const addMaterial = gql`
  mutation addMaterial($data: CreateMaterialInput!) {
    addMaterial(data: $data) {
      id
      name
    }
  }
`;

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: [
    '../../assets/css/bootstrap.min.css',
    './add-material.component.css'
  ]
})
export class AddMaterialComponent implements OnInit {
  // name = new FormControl('');
  model = {
    name: ''
  };
  show: string = 'false';
  result: Object;

  constructor(private apollo: Apollo) {}

  ngOnInit() {}

  newMaterial() {
    this.apollo
      .mutate({
        mutation: addMaterial,
        variables: {
          data: {
            // name: this.name.value
            name: this.model.name
          }
        }
      })
      .subscribe(
        ({ data }) => {
          this.show = 'success';
          this.result = data.addMaterial;
          // this.name.setValue('');
          this.model.name = '';
        },
        (error) => {
          this.show = 'error';
          console.error(`Error: ${error}`);
        }
      );
  }
}
