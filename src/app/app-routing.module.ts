import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDetailComponent } from './components/api-detail/api-detail.component';
import { ApiListComponent } from './components/api-list/api-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiCreateComponent } from './components/api-create/api-create.component';
import { authGuard } from './services/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-api', component: ApiCreateComponent, canActivate: [authGuard] },
  { path: 'apis', component: ApiListComponent },
  { path: 'apis/:id', component: ApiDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
