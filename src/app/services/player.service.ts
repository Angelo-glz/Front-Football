import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private appUrl = environment.endpoint;
  private apiUrl = 'api/player/';


  constructor(private http: HttpClient) {}

   getPlayers(): Observable<any>{
     return this.http.get(this.appUrl + this.apiUrl);
   }

   getPlayer(id: number): Observable<any>{
    return this.http.get(this.appUrl + this.apiUrl + id);
   }

   deletePlayer(id: number): Observable<any>{
    return this.http.delete(this.appUrl + this.apiUrl + id);
   }

   addPlayer(player: Player): Observable<any>{
    return this.http.post(this.appUrl + this.apiUrl, player);
   }

   updatePlayer(id: number, player: Player): Observable<any>{
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, player);
   }

}
