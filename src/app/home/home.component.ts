import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';
import { APIResponse, Game } from '../modules';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public sort: string = 'metacrit';
  public games!: Array<Game>;
  public isSearch?: string;

  public page: number = 1;
  public end: boolean = false;

  public load: boolean = false;
  
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.isSearch = params['game-search']; 
        this.load = true;
        this.page = 1;
        this.end = true;
        if(params['game-search']) {
          this.searchGames(this.sort, 0, params['game-search']);
        } else {
          this.searchGames(this.sort, 0);
        }
      }
    );
  }

  public searchGames(sort: string, type: number, search?: string): void {
    this.httpService.getGameList(sort, this.page, search).subscribe(
      (gameList: APIResponse<Game>) => {
        this.load = false;
        if (type == 1) {
          this.games = this.games.concat(gameList.results);
        }
        else {
          scroll(0, 0);
          this.games = gameList.results;
        }
        this.end = false;
      }
    );
  }

  @HostListener("document:scroll")
  public onScroll(): void {
    if(
      this.end == false && 
        (
          (document.documentElement.scrollHeight - document.documentElement.scrollTop) <= (document.documentElement.clientHeight + 100)
        )
      ) 
    {
      this.page++;
      this.end = true;
      this.searchGames(this.sort, 1, this.isSearch);
    }
  }
}
