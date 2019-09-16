import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donor } from '../model/donor';
import { OrganFactors } from '../model/organFactors';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl = 'http://52.66.129.41:8085/api/search/query';
  private organFactorsUrl = 'http://52.66.129.41:8085/api/search/factors';

  constructor(private http: HttpClient) {
  }

  getSearchResults(searchString: string) {
    return this.http.get<Array<Donor>>(this.searchUrl + '/' + searchString);
  }

  getOrganFactors(searchString: string) {
    return this.http.get<OrganFactors>(this.organFactorsUrl + '/' + searchString);
  }

}
