import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StatusComponent } from './components/status/status.component';
import { BaptismComponent } from './components/baptism/baptism.component';
import { HeaderComponent } from './components/header/header.component';
import { ChurchesComponent } from './components/churches/churches.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeopleComponent } from './components/people/people.component';
import { ListComponent } from './components/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from "@angular/material/dialog";
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleContainerComponent } from './components/people-container/people-container.component';
import { AddCurchComponent } from './components/add-curch/add-curch.component';
import { MarriageComponent } from './components/marriage/marriage.component';
import { DivorceComponent } from './components/divorce/divorce.component';
import { DeathComponent } from './components/death/death.component';
import { InheritedComponent } from './components/inherited/inherited.component';
import { AddPersonComponent } from './components/add-person/add-person.component';


const appRout:Routes=[
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"status",component:StatusComponent},
  {path:"babtism",component:BaptismComponent},
  {path:"people",component:PeopleComponent},
  {path:"churches",component:ChurchesComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StatusComponent,
    BaptismComponent,
    HeaderComponent,
    ChurchesComponent,
    PeopleComponent,
    ListComponent,
    UserListComponent,
    RegisterComponent,
    HasRoleDirective,
    PeopleListComponent,
    PeopleContainerComponent,
    AddCurchComponent,
    MarriageComponent,
    DivorceComponent,
    DeathComponent,
    InheritedComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forRoot(appRout),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
     MatDialogModule,


  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
