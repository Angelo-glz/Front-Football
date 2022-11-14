import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  playersList: Player[] = [];
  displayedColumns: string[] = ['name', 'number', 'rating', 'position', 'status', 'actions'];
  dataSource = new MatTableDataSource<Player>();

  constructor(private _playerService:PlayerService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(){
    this._playerService.getPlayers().subscribe(data => {
      this.playersList = data;
    }, error =>{console.log(error);})
  }

  deletePlayer(id: number){
    this._playerService.deletePlayer(id).subscribe(data =>{
      this.toastr.success('Jugador eliminado.','Jugador eliminado con exito.');
      this.getPlayers();
    },error =>{this.toastr.error('Error al eliminar el jugador.', 'Intentelo nuevamente.')});
  }


}
