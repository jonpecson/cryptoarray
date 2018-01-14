import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { CustomOption } from "./shared/toastr/custom-option";

import * as $ from 'jquery';
import { ApiHandlerService } from './shared/providers/api-handler.service';
import { AuthService } from './shared/providers/auth.service';
import { UserService } from './shared/providers/user.service';

export function handlerFunc(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new ApiHandlerService(backend, defaultOptions);
}

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        })
    ],
    providers: [
        UserService,
        AuthService,
        // Toastr providers
        { provide: ToastOptions, useClass: CustomOption },
        {
            provide: ApiHandlerService,
            useFactory: handlerFunc,
            deps: [XHRBackend, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
