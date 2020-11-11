import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../models/Usuario';

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

  public cadastrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  public alterar(usuario: Usuario) {
    return this.http.put(`${this.url}/${usuario.id}`, usuario);
  }

  public deletar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
