import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddaccountComponent } from './addaccount/addaccount.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
  
    path : "addAccount",
    component : AddaccountComponent
  },

  {
     path : "" ,
     component : HomeComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
