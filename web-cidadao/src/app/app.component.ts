import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-cidadao';
  public isMenuCollapsed = true;
  public collapsed = true;
  online: boolean = false;

  constructor(private authService: AuthService, private dataShare: DataSharingService) { }

  ngOnInit() {
    this.dataShare.isUserLoggedIn.subscribe(value => {
      this.online = value;
    });
    this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

}
