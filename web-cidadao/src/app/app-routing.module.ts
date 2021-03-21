import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaIptuComponent } from './components/consulta-iptu/consulta-iptu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OfflineGuard } from './guards/offline.guard';
import { ProtectedGuard } from './guards/protected.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'consulta-iptu', component: ConsultaIptuComponent, canActivate: [ProtectedGuard] },
  { path: 'login', component: LoginComponent, data: { redirected: false }, canActivate: [OfflineGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
