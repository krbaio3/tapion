import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public disabled = true;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  irUsuario( id: string ) {

    if ( !id ) {
      return;
    }

    this.router.navigate([ '/usuario', id ]);

  }

}

