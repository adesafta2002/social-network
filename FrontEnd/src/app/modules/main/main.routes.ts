import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FeedComponent } from './components/feed/feed-main.component';
import { ProfileComponent } from './components/profile/profile-main.component';
import { SettingsComponent } from './components/settings/settings-main.component';
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
                        component: FeedComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'profile/:id',
                        component: ProfileComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'settings',
                        component: SettingsComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: '',
                        redirectTo: 'feed',
                        pathMatch: 'full'
                    }
                ],
            }
        ])
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }
