import { Injectable } from '@angular/core';
import { ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public pageItem = 6;
  public pageNum;
  public pageArray: any[] = [];

  constructor() {}

  countPage(total) {
    this.pageNum =
      total % this.pageItem == 0
        ? total / this.pageItem
        : total / this.pageItem + 1;
    return this.pageNum;
  }

  showPage(currentPage) {
    this.pageArray = [];
    // Previous page button
    if (currentPage == 1) {
      this.pageArray.push(0);
    } else {
      this.pageArray.push(1);
    }

    // Number page button
    if (currentPage - 2 >= 1) {
      for (let ele = currentPage - 1; ele <= currentPage; ele++) {
        this.pageArray.push(ele);
      }
    } else {
      for (let ele = 1; ele <= currentPage; ele++) {
        this.pageArray.push(ele);
      }
    }

    if (currentPage + 2 <= this.pageNum) {
      for (let ele = currentPage + 1; ele <= currentPage + 2; ele++) {
        this.pageArray.push(ele);
      }
    } else {
      for (let ele = currentPage + 1; ele <= this.pageNum; ele++) {
        this.pageArray.push(ele);
      }
    }

    // Next page button
    if (currentPage == this.pageNum) {
      this.pageArray.push(0);
    } else {
      this.pageArray.push(1);
    }

    return this.pageArray;
  }
}
