import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  constructor(public usuarioSrv: UsuarioService) {}

  ngOnInit() {
    this.usuarioSrv.getUsers().subscribe(users => {
      console.log('users', users);
      this.usuarios = users;
    });
  }
}
