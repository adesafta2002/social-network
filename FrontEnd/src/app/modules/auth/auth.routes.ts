import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthLoginComponent } from './components/login/auth-main-login.component';
import { AuthSignupComponent } from './components/signup/auth-main-signup.component';
import { AuthComponent } from './container/auth-main.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'login',
                        component: AuthLoginComponent,
                    },
                    {
                        path: 'signup',
                        component: AuthSignupComponent
                    },
                    {
                        path: '',
                        redirectTo: 'login',
                        pathMatch: 'full'
                    }
                ],
            }
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
