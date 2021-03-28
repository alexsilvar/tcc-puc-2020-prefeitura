import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotTableModule } from '@handsontable/angular';
import { LoginComponent } from './components/login/login.component';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { IptuItrComponent } from './components/iptu-itr/iptu-itr.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CockpitComponent,
    IptuItrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HotTableModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
