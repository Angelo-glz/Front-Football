import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditPlayerComponent } from './add-edit-player/add-edit-player.component';



import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
      AddEditPlayerComponent,
      EditTeamComponent,
      TeamListComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
