import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MouseOverDirective } from './directives/mouse-over.directive';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRoutingModule } from './modules/auth/auth.routes';
import { AppNavbarComponent } from './shared/components/navbar-component/app-navbar.component';
import { PageNotFoundComponent } from './shared/components/page-not-found-component/page-not-found.component';
import { AuthorizationInterceptor } from './shared/interceptors/authorization.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/errorHandler.interceptor';
import { AuthService } from './shared/services/auth.service';
import { UserEffects } from './store/effects/user.effects';
import { appReducers, metaReducers } from './store/reducers/app.reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './shared/services/user.service';
import { FriendsEffects } from './store/effects/friends.effects';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AppSearchBoxComponent } from './shared/components/search-box-component/search-box.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NotificationsService } from './shared/services/notifications.service';
import { UserNotificationsService } from './shared/services/user-notifications.service';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppSearchBoxComponent,
    MouseOverDirective,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects, FriendsEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ProgressSpinnerModule,
    MessagesModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    TableModule,
    RippleModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    MessageService,
    NotificationsService,
    UserNotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
