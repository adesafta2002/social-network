import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileComponent } from './components/profile/profile-main.component';
import { UserDisplayComponent } from './components/shared/user-display/user-display.component';
import { MainComponent } from './container/main.component';
import { MainRoutingModule } from './main.routes';


@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        InputTextModule
    ],
    declarations: [
        MainComponent,
        ProfileComponent,
        UserDisplayComponent
    ],
    providers: [

    ],
})
export class MainModule { }
