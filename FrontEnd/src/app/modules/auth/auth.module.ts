import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRoutingModule } from './auth.routes';
import { AuthComponent } from './container/auth-main.component';
import { AuthLoginComponent } from './components/login/auth-main-login.component'
import { AuthSignupComponent } from './components/signup/auth-main-signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { WaveSvgComponent } from 'src/app/shared/wave-svg-component/wave-svg.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        InputTextModule,
        ProgressSpinnerModule
    ],
    declarations: [
        AuthComponent,
        AuthLoginComponent,
        AuthSignupComponent,
        WaveSvgComponent
    ],
    providers: [

    ],
})
export class AuthModule { }
