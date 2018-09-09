import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { CargarUsuario } from '../../store/actions/';
import { UsuarioService } from '../../services/usuario.service';
import { Unsubscribable } from 'rxjs';
import { Usuario } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, OnDestroy {
  private usuario: Unsubscribable;
  public user: Usuario;
  public error: HttpErrorResponse;
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public usuarioSrv: UsuarioService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(new CargarUsuario(id));
    });

    this.store.select('usuario')
      .subscribe(user => {
        this.loading = user.loading;
        this.error = user.error;
        this.user = user.user;
      });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.usuario.unsubscribe();
  }
}
