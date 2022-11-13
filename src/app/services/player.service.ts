import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

   deletePlayer(id: number): Observable<any>{
    return this.http.delete(this.appUrl + this.apiUrl + id);
   }

   addPlayer(player: any): Observable<any>{
    return this.http.post(this.appUrl + this.apiUrl, player);
   }

   updatePlayer(id: number, player: any): Observable<any>{
    return this.http.put(this.appUrl + this.apiUrl + id, player);
   }

}
