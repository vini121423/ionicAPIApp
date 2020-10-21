import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  public readAll(page: number) {
    if (page <= 0) {
      page = 1;
    }

    return this.http.get(`${this.url}?page=${page}`);
  }

  public findById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

}
