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
  private end: boolean = false;
  
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.isSearch = params['game-search']; 
        
        if(params['game-search']) {
          this.page = 1;
          this.end = true;
          this.searchGames(this.sort, 0, params['game-search']);
        } else {
          this.page = 1;
          this.end = true;
          this.searchGames(this.sort, 0);
        }

      }
    );
  }

  // 0 -> search | clear arr, page = 1
  // 1 -> sort | clear arr, page = 1
  // 2 -> scroll | append, page++

  public searchGames(sort: string, type: number, search?: string): void {
    this.httpService.getGameList(sort, this.page, search).subscribe(
      (gameList: APIResponse<Game>) => {

        console.log('Pagination page: ' + this.page);
        console.log('Sort type: ' + sort);
        console.log('Request type: ' + type + ' [' + (type === 2 ? 'scroll]' : (type === 1 ? 'sort]' : 'search]')));
        console.log('Search: ' + search);
        console.log('-----------');

        if (type == 2) {
          this.games = this.games.concat(gameList.results);
        }
        else {
          this.games = gameList.results;
        }

        this.end = false;

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
      this.searchGames(this.sort, 2, this.isSearch);
      this.end = true;
    }

  }

}
