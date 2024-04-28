import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResultSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() { }

  getSearchResult(): Observable<any> {
    return this.searchResultSubject.asObservable();
  }

  setSearchResult(searchResult: string): void{
    this.searchResultSubject.next(searchResult);
  }
}
