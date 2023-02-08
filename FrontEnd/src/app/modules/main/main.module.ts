import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PostCardComponent } from './components/feed/components/post-card/post-card.component';
import { FeedComponent } from './components/feed/feed-main.component';
import { ProfileFriendsComponent } from './components/profile-friends/profile-friends.component';
import { ProfileComponent } from './components/profile/profile-main.component';
import { SettingsComponent } from './components/settings/settings-main.component';
import { BottomLeftMenuComponent } from './components/shared/bottom-left-menu/bottom-left-menu.component';
import { FriendsListComponent } from './components/shared/friends-list/friends-list.component';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { UserDisplayComponent } from './components/shared/user-display/user-display.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { MainComponent } from './container/main.component';
import { MainRoutingModule } from './main.routes';


@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        InputTextModule,
        ProgressSpinnerModule,
        SelectButtonModule,
        ButtonModule
    ],
    declarations: [
        MainComponent,
        ProfileComponent,
        UserDisplayComponent,
        BottomLeftMenuComponent,
        FeedComponent,
        SettingsComponent,
        NotificationsComponent,
        FriendsListComponent,
        PostCardComponent,
        UserPostComponent,
        ProfileFriendsComponent
    ],
    providers: [
    ],
})
export class MainModule { }
