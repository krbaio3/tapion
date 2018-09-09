import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(private actions$: Actions, public usuarioSrv: UsuarioService) { }

  @Effect()
  cargarUsuario$ = this.actions$
    .ofType(usuarioActions.CARGAR_USUARIO)
    .pipe(
      switchMap((action: usuarioActions.CargarUsuario) =>
        this.usuarioSrv
          .getUserById(action.id)
          .pipe(
            map(
              user => new usuarioActions.CargarUsuarioSuccess(user)
            ),
            catchError(
              error => of(new usuarioActions.CargarUsuarioFail(error))
            )
          )
      )
    );
}
