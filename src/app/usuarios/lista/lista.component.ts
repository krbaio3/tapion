import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { CargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public loading: boolean;
  public error: any;

  constructor(
    public usuarioSrv: UsuarioService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('usuarios').subscribe(usuarios => {
      this.usuarios = usuarios.user;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });

    this.store.dispatch(new CargarUsuarios());

    this.usuarioSrv.getUsers().subscribe(users => {
      console.log('users', users);
      this.usuarios = users;
    });
  }
}
