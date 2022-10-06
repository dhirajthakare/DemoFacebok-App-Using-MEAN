import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessangerMainComponent } from '../messanger/messanger-main/messanger-main.component';
import { MessangerComponent } from '../messanger/messanger.component';
import { MainBodyComponent } from './main-body.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainHomepageComponent } from './main-homepage/main-homepage.component';

const routes: Routes = [  
  { path:'' , component:MainBodyComponent , children:[
    {path:'' , component:MainHomepageComponent , children:[
      {path:'' , component:MainContentComponent},
    ]},
    {path:'messanger' , component:MessangerComponent,children:[
      {path:'' , component:MessangerMainComponent}
    ] }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainBodyRoutingModule { }
