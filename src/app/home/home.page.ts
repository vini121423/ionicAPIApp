import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usersList: any = [];
  public page = 1;
  public totalPages = 1;

  constructor(private userService: UserService) { }

  ionViewWillEnter() {
    this.findUsers(1);
  }

  public findUsers(page: number) {
    if (page <= 0) {
      page = 1;
    }

    this.page = page;

    this.userService.readAll(page).subscribe(dados => {
      this.usersList = dados['data'];
      this.totalPages = dados['total_pages']
    })

  }

}
