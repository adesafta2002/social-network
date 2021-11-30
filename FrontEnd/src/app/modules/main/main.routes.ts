import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileComponent } from './components/profile/profile-main.component';
import { MainComponent } from './container/main.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: 'feed',
                        redirectTo: 'profile',
                        pathMatch: 'full'
                    },
                    {
                        path: 'profile/:id',
                        component: ProfileComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: '',
                        redirectTo: 'profile',
                        pathMatch: 'full'
                    }
                ],
            }
        ])
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }
