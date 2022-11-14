import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPlayerComponent } from './add-edit-player/add-edit-player.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamListComponent } from './team-list/team-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'playersList', pathMatch: 'full' },
  { path: 'playersList', component: TeamListComponent },
  { path: 'addPlayer', component: AddEditPlayerComponent },
  { path: 'editPlayer/:id', component: AddEditPlayerComponent },
  { path: 'editTeam', component: EditTeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
