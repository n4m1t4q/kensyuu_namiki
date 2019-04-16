import { Component, OnInit } from '@angular/core';

import { Sample } from '../../common/entities/sample/sample.entity';
import { SampleService } from '../../services/sample/sample.service';

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

  sampleList: Sample[] = [];


  constructor(private service: SampleService) { }

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

  async searchUsers() {
    this.message = '';

    const response = await this.service.testGet({ name: this.name, age: this.age }, this.id);

    if (response.result) {
      this.sampleList = response.users;
    } else {
      this.message = 'エラーが発生しました';
    }
  }

  async createuser() {
    this.message = '';

    if (this.name && this.age) {
      const response = await this.service.testPost({ name: this.name, age: this.age});

      if (response.result) {
        await this.searchUsers();
      } else {
        this.message = 'エラーが発生しました';
      }
    } else {
      this.message = '「ID」以外の項目は、全て入力してください';
    }

  }

  async updateUser() {
    this.message = '';

    if (this.id) {
      const response = await this.service.testPut({ name: this.name, age: this.age }, this.id);

      if (response.result) {
        await this.searchUsers();
      } else {
        this.message = 'エラーが発生しました';
      }
    } else {
      this.message = '「ID」の項目は、必ず入力してください';
    }
  }

  async deleteUser() {
    this.message = '';

    if (this.id) {
      const response = await this.service.testDelete(this.id);

      if (response.result) {
        await this.searchUsers();
      } else {
        this.message = 'エラーが発生しました';
      }
    } else {
      this.message = '削除する「ID」を入力してください';
    }
  }

}
