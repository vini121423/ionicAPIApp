import { Component, OnInit } from '@angular/core';
import { Usuario } from './../models/Usuario';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';


@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})

export class AlterarPage implements OnInit {
  public usuario: Usuario = {}
  public id: number;

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.findById(this.id).subscribe(dados => {
      this.usuario.name = dados['data'].first_name + " " + dados['data'].last_name;
      this.usuario.id = dados['data'].id;
      console.log(this.usuario);
    });
  }

  public salvar() {
    this.userService.alterar(this.usuario).subscribe(dados => {
      this.usuario = dados;
    });
  }

}
