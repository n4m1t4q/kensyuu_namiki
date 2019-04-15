import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  id: number;
  name: string;
  age: number;

  message: string;

  sampleList: { id: number, name: string, age: number }[] = [];


  constructor() { }

  ngOnInit() {
  }

  test() {
    this.message = '';

    if (this.id && this.name && this.age) {
      this.sampleList.push({ id: this.id, name: this.name, age: this.age });
    } else {
      this.message = '未入力の項目があります。必ず全て入力してください';
    }
  }

  resetList() {
    this.sampleList = [];
  }

}
