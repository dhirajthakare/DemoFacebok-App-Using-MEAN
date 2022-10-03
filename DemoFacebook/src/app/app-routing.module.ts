import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './common/error/error.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: '**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
