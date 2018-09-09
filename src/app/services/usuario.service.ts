import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = 'https://reqres.in';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get(`${this.URL}/api/users?per_page=6`)
      .pipe(map((response: any) => response.data));
  }

  getUserById(id: string): Observable<Usuario> {
    return this.http
      .get(`${this.URL}/api/users/${id}`)
      .pipe(map((response: any) => response.data));
  }
}
