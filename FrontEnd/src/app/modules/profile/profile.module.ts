import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProfileRoutingModule } from './profile.routes';


@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        InputTextModule,
        AppRoutingModule
    ],
    declarations: [
        
    ],
    providers: [

    ],
})
export class ProfileModule { }
