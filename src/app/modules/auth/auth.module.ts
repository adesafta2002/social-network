import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routes';
import { AuthComponent } from './container/auth-main.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent,

    ],
    providers: [

    ],
})
export class AuthModule { }
