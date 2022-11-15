import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PlayerService } from '../services/player.service';
import { Player } from '../interfaces/player';
import { Observable, ReplaySubject } from 'rxjs';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})

export class EditTeamComponent implements OnInit{
  htmlToImage = require('html-to-image');
  players: Player[] = []
  starting: Player[] = [];
  subsAndStaff: Player[] = [];
  dataToDisplay = this.subsAndStaff;
  private _dataStream = new ReplaySubject<Player[]>();

  displayedColumns: string[] = ['name', 'rating', 'position', 'status'];
  dataSource = this.subsAndStaff;

  public openPDF(): void {
    let DATA: any = document.getElementById('main');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }


  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.subsAndStaff)
    this.dataSource = this.subsAndStaff;
  }

  constructor(private _playerService: PlayerService) {
      this.setData(this.subsAndStaff);
  }

  generateImage(){

  }

  connect(): Observable<Player[]>{
    return this._dataStream;
  }

  disconnect(){}

  setData(data: Player[]){
    this._dataStream.next(data);
  }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(){
    this._playerService.getPlayers().subscribe(data => {
      this.players = data

    }, error =>{console.log(error);})
  }

  get isStartingAvailable(): boolean{
    return this.starting && this.starting.length < 11;
  }

  get isBenchAvailable(): boolean{
    return this.subsAndStaff && this.subsAndStaff.length < 9;
  }

  startingPredicate = (): boolean =>{
    return this.starting && this.starting.length < 11;
  }

  benchPredicate = (): boolean =>{
    return this.subsAndStaff && this.subsAndStaff.length < 9;
  }



 gk = {x:50, y:300}


}
