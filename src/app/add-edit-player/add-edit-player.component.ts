import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../interfaces/player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html',
  styleUrls: ['./add-edit-player.component.css']
})
export class AddEditPlayerComponent implements OnInit {
  form: FormGroup;
  id: number;
  state = 'Agregar';

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _playerService: PlayerService,
    private activatedRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      rating: [''],
      position: ['', Validators.required],
      number: ['', Validators.required]
    })
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit() {
    if(this.id != 0){
      this.state = 'Editar'
      this.getPlayer(this.id);
    }
  }

  getPlayer(id: number){
    this._playerService.getPlayer(id).subscribe(data =>{
      this.form.patchValue({
        name: data.name,
        position: data.position,
        status: data.status,
        number: data.number,
        rating: data.rating
      });
    });
  };

  addEditPlayer(){
    const player: Player = {
      name: this.form.get('name')?.value,
      position: this.form.get('position')?.value,
      status: this.form.get('status')?.value,
      number: this.form.get('number')?.value,
      rating: this.form.get('rating')?.value
    };
    if(this.id != 0){
      player.id = this.id;
      this.updatePlayer(player);
    }else{
      this.addPlayer(player);
  }};

  addPlayer(player: Player){
    this._playerService.addPlayer(player).subscribe(data => {
      this.toastr.success('Creacion exitosa de jugador','Jugador agregado.');
      this.form.reset();
    }, error =>{
      this.toastr.error('Algo salio mal, intenta de nuevo.', 'El jugador no pudo ser agregado.')
    });
  };

  updatePlayer(player: Player){
    this._playerService.updatePlayer(this.id, player).subscribe(() => {
      this.form.reset();
      this.state = 'Add';
      this.id = 0;
      this.toastr.info('Jugador actualizado con exito.', 'Jugador actualizado.');
    },error =>{
      this.toastr.error('Algo salio mal, intenta de nuevo.','El jugador no pudo ser actualizado.');
    });
  };

}
