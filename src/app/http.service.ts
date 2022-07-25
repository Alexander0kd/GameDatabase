import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { APIResponse, Game } from './modules';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getGameList(ordering: string, page: number, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering).set('page', page);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search).set('page', page);
    }

    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`, {
      params: params,
    });
  }

  public getGameDetails(id: string): Observable<Game> {
    const InfoReq = this.http.get<Game>(`${environment.BASE_URL}/games/${id}`);
    const TrailerReq = this.http.get<Game>(`${environment.BASE_URL}/games/${id}/movies`);
    const ScreenReq = this.http.get<Game>(`${environment.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      InfoReq,
      TrailerReq,
      ScreenReq,
    }).pipe(
      map(
        (resp: any) => {
          return {
            ...resp['InfoReq'],
            screenshots: resp['ScreenReq']?.results,
            trailers: resp['TrailerReq']?.results,
          };
        }
      )
    );
  }


}
