import { Usuario } from '../../models/usuario.model';
import * as fromUsuarios from '../actions';

export interface UsuariosState {
  user: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initState: UsuariosState = {
  user: [],
  loaded: false,
  loading: false,
  error: null
};

export function usuariosReducer(
  state = initState,
  action: fromUsuarios.usuariosAcciones
): UsuariosState {
  switch (action.type) {
    case fromUsuarios.CARGAR_USUARIOS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: [...action.usuario]
      };
    case fromUsuarios.CARGAR_USUARIOS_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: {
          message: action.payload.message,
          status: action.payload.status,
          url: action.payload.url
        }
      };
    default:
      return state;
  }
}
