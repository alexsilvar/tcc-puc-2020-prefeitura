import { Component } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { AuthService } from './services/auth.service';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-prefeitura';  
  public isMenuCollapsed = true;
  public collapsed = true;
  online: boolean = false;
  username: string = "";
  constructor(private authService: AuthService, private dataShare: DataSharingService) { }

  ngOnInit() {
    this.dataShare.isUserLoggedIn.subscribe(value => {
      this.online = value;
    });
    this.dataShare.username.subscribe(value => {
      this.username = value;
    });

    this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
