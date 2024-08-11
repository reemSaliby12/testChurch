import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BaptismComponent } from './components/baptism/baptism.component';
import { StatusComponent } from './components/status/status.component';
import { PeopleComponent } from './components/people/people.component';
import { ChurchesComponent } from './components/churches/churches.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './_guards/admin.guard';
import { HeaderComponent } from './components/header/header.component';
import { AddCurchComponent } from './components/add-curch/add-curch.component';
import { MarriageComponent } from './components/marriage/marriage.component';
import { DivorceComponent } from './components/divorce/divorce.component';
import { DeathComponent } from './components/death/death.component';
import { InheritedComponent } from './components/inherited/inherited.component';
import { AddPersonComponent } from './components/add-person/add-person.component';

const routes: Routes =
 [
 // {path:'login',component:LoginComponent,outlet:'mainrouter'},
//  {path:'header',component:HeaderComponent,outlet:'mainrouter'},

 {path:'login',component:LoginComponent},
   {path:'header',component:HeaderComponent,children:[
    {path:'baptism',component:BaptismComponent},
    {path:'home',component:HomeComponent},
    {path:'people',component:PeopleComponent},
    {path:'status',component:StatusComponent},
    {path:'church',component:ChurchesComponent,canActivate:[adminGuard]},
    {path:'users',component:UserListComponent,canActivate:[adminGuard]},
    {path:'users/:id',component:RegisterComponent,canActivate:[adminGuard]},
    {path:'userRegister',component:RegisterComponent,canActivate:[adminGuard]},
    {path:'marriage',component:MarriageComponent,canActivate:[adminGuard]},
    {path:'divorce',component:DivorceComponent,canActivate:[adminGuard]},
    {path:'death',component:DeathComponent,canActivate:[adminGuard]},
    {path:'inherited',component:InheritedComponent,canActivate:[adminGuard]},
    {path:'churchRegister',component:AddCurchComponent,canActivate:[adminGuard]},
    {path:'churches/:id',component:AddCurchComponent,canActivate:[adminGuard]},
    {path:'personRegister/:id',component:AddPersonComponent,canActivate:[adminGuard]},
    {path:'personRegister',component:AddPersonComponent,canActivate:[adminGuard]},


   ]},




 ,




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
