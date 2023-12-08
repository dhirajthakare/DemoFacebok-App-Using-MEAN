import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from './main-body.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainHomepageComponent } from './main-homepage/main-homepage.component';

const routes: Routes = [  
  { path:'' , component:MainBodyComponent , children:[
    {path:'' , component:MainHomepageComponent , children:[
      {path:'' , component:MainContentComponent},
    ]}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainBodyRoutingModule { }
