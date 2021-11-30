import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginComponent } from './modules/auth/components/login/auth-main-login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found-component/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/profile/1',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import(`./modules/main/main.module`).then(m => m.MainModule),
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
