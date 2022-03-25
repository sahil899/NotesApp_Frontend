import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInjectorInterceptor } from './interceptors/http-injector.interceptor';
import { AuthService } from './services/auth.service';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { UserService } from './services/user.service';
import { AlertModule } from './alert/alert.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [AuthService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInjectorInterceptor,
      multi: true
    },

  ],
  exports: [AlertModule]

})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // this will only be trigger when core is imported to some others module apart from app module
    super(parentModule);

  }
}
