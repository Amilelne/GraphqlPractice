import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private getMaterialUrl =
    'http://localhost:4000/graphql?query={materials{id name recipes{title}}}';

  getMaterial() {
    return this.http.get(this.getMaterialUrl);
  }
}
