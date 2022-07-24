import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';
import { APIResponse, Game } from '../modules';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public gameId!: string;
  public game!: Game;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.gameId = params['id'];
        this.getGameDetails(this.gameId);
      }
    );
  }

  public getGameDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe(
      (resp: Game) => {
        this.game = resp;
        
        console.log(this.game);
      }
    );
  }

}
