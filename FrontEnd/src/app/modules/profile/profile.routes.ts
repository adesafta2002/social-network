import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileComponent } from './components/profile-main.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
