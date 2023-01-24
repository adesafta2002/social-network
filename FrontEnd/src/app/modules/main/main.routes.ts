import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FeedComponent } from './components/feed/feed-main.component';
import { ProfileComponent } from './components/profile/profile-main.component';
import { SettingsComponent } from './components/settings/settings-main.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { MainComponent } from './container/main.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: 'user-feed/:userId',
                        component: FeedComponent,
                        canActivate: [AuthGuard]
                    },
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
                        path: 'post/:id',
                        component: UserPostComponent,
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
