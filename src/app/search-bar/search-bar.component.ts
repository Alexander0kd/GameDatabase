import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, distinctUntilChanged, debounceTime, switchMap, map } from 'rxjs';
import { HttpService } from '../http.service';
import { APIResponse, Game } from '../modules';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpService) { }

  public input: string = '';  

  private searchTerms = new Subject<string>();
  public gameList: Array<Game> = [];

  public onInput(inp: string): void {
    this.searchTerms.next(inp);
  }

  ngOnInit(): void {

    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((changes) => {
      
      if(changes == '') {
        this.gameList = [];
        return;
      }

      this.httpService.getGameList('metacrit', 1, changes, 5).subscribe(
        (gameList: APIResponse<Game>) => {
          this.gameList = gameList.results;
        }
      );

    });
  }

  public onSubmit(): void {
    if (this.input != '') {
      this.router.navigate(['search', this.input]);
    }
  }

  public triggerList(set: string): void {
    setTimeout(() => {
      let list = document.getElementById('search__res') as HTMLElement;
        list.style.display = set;
    }, 200);
  }

}
