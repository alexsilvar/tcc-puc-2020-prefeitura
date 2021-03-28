import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { IptuItrComponent } from './components/iptu-itr/iptu-itr.component';
import { LoginComponent } from './components/login/login.component';
import { OfflineGuard } from './guards/offline.guard';
import { ProtectedGuard } from './guards/protected.guard';

const routes: Routes = [
  { path: '', component: CockpitComponent, canActivate: [ProtectedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [OfflineGuard] },
  { path: 'iptu-itr', component: IptuItrComponent, canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
