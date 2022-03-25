import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [{
      path: ':id',
      component: MaincontentComponent
    }, {
      path: '',
      component: MaincontentComponent
    }
    ]
  },
];

@NgModule({
  declarations: [
    SidenavComponent,
    MaincontentComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class NotesModule { }
