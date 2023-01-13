import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FeedComponent } from './components/feed/feed-main.component';
import { ProfileComponent } from './components/profile/profile-main.component';
import { SettingsComponent } from './components/settings/settings-main.component';
import { BottomLeftMenuComponent } from './components/shared/bottom-left-menu/bottom-left-menu.component';
import { FriendsListComponent } from './components/shared/friends-list/friends-list.component';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { UserDisplayComponent } from './components/shared/user-display/user-display.component';
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
        SelectButtonModule
    ],
    declarations: [
        MainComponent,
        ProfileComponent,
        UserDisplayComponent,
        BottomLeftMenuComponent,
        FeedComponent,
        SettingsComponent,
        NotificationsComponent,
        FriendsListComponent
    ],
    providers: [
    ],
})
export class MainModule { }
