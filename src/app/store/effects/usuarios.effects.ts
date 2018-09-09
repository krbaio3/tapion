import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { CargarUsuariosSuccess } from '../actions/usuarios.actions';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  constructor(private actions$: Actions, public usuarioSrv: UsuarioService) {}

  @Effect()
  cargarUsuario$ = this.actions$
    .ofType(usuariosActions.CARGAR_USUARIOS)
    .pipe(
      switchMap(() =>
        this.usuarioSrv
          .getUsers()
          .pipe(
            map(
              users => new usuariosActions.CargarUsuariosSuccess(users)
            ),
            catchError(
              error => of(new usuariosActions.CargarUsuariosFail(error))
            )
          )
      )
    );
}
