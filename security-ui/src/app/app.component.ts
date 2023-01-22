import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'security-ui';
  showMenu: boolean = false;

  constructor(private loginService: LoginService) { }
  ngOnInit(): void {
    this.checkShowMenu();
  }

  checkShowMenu() {
    this.loginService.showMenu.subscribe(show => this.showMenu = show)
  }
}


