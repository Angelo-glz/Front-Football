import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../interfaces/player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html',
  styleUrls: ['./add-edit-player.component.css']
})
export class AddEditPlayerComponent implements OnInit {
  form: FormGroup;
  id: number | undefined;
  state = 'Add';

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _playerService: PlayerService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      rating: [''],
      position: ['', Validators.required],
      number: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  addEditPlayer(){
    const player: Player = {
      name: this.form.get('name')?.value,
      position: this.form.get('position')?.value,
      status: this.form.get('status')?.value,
      number: this.form.get('number')?.value,
      rating: this.form.get('rating')?.value
    };

    if(this.id == undefined){
      this._playerService.addPlayer(player).subscribe(data => {
        this.toastr.success('Creacion exitosa de jugador','Jugador agregado.');
        this.form.reset();
      }, error =>{
        this.toastr.error('Algo salio mal, intenta de nuevo.', 'El jugador no pudo ser agregado.')
      })
    }else{
      this._playerService.updatePlayer(this.id, player).subscribe(data =>{
        this.form.reset();
        this.state = 'Add';
        this.id = undefined;
        this.toastr.info('Jugador actualizado con exito.', 'Jugador actualizado.');

      },error =>{
        this.toastr.error('Algo salio mal, intenta de nuevo.','El jugador no pudo ser actualizado.');
      })
  }};
}
