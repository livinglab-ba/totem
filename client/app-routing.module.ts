import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import {AppComponent} 		from './pages/app/app.component';

const routes: Routes = [
    { path: '', component: AppComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }