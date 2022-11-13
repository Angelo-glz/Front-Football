import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, AfterViewInit {
  playersList: Player[] = [];
  displayedColumns: string[] = ['name', 'number', 'rating', 'position', 'status', 'actions'];
  dataSource = new MatTableDataSource<Player>();

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private _playerService:PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    //this.paginator._intl.itemsPerPageLabel = 'Jugadores por pagina:'
  }

  getPlayers(){
    this._playerService.getPlayers().subscribe(data => {
      console.log(data);
      this.playersList = data;
    }, error =>{console.log(error);})
  }


}
