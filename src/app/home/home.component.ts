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

  public sort: string = '';
  public games!: Array<Game>;
  public isSearch?: string;

  private page: number = 1;
  private end: boolean = false;
  
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.isSearch = params['game-search']; 
        
        if(params['game-search']) {
          this.searchGames('metacrit', params['game-search']);
        } else {
          this.searchGames('metacrit');
        }

      }
    );
  }

  public searchGames(sort: string, search?: string): void {
    this.httpService.getGameList(sort, this.page, search).subscribe(
      (gameList: APIResponse<Game>) => {
        this.games = gameList.results;

        // if (this.games) {
        //   this.games = this.games.concat(gameList.results);
        //   this.page++;
        //   this.end = false;
        // }
        // else {
        //   this.games = gameList.results;
        //   this.page++;
        //   this.end = false;
        // }

      }
    );
  }

  @HostListener("document:scroll")
  public onScroll(): void {
    if(
      this.end == false && (
          (document.documentElement.scrollHeight - document.documentElement.scrollTop) <= (document.documentElement.clientHeight + 100)
        )
      ) 
    {
      this.page++;
      this.end = true;
    }

  }

}
