import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { Location } from '@angular/common';
import { Donor } from '../../model/donor';
import { OrganFactors } from '../../model/organFactors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  private donors: Array<Donor>;
  private filteredDonors: Array<Donor> = [];
  private factors: OrganFactors;
  private factorsCheckbox: any = [];
  private searchString: string;
  constructor(private location: Location, private route: ActivatedRoute, private _searchService: SearchService) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.searchString = data['name']
      this.factorsCheckbox = []
      this._searchService.getSearchResults(this.searchString).subscribe(donors => {
        this.donors = donors;
        this._searchService.getOrganFactors(this.searchString).subscribe(factors => {
          this.factors = factors;
          let array = [];
          this.factors.factors.forEach(element => {
            array = []
            element.ranges.forEach(range => {
              array.push({ 'name': range, 'checked': false })
            })
            this.factorsCheckbox.push({ 'title': element.title, 'ranges': array })
          });
        })
      });
    }
    );
  }

  getDonors() {
    return this.donors;
  }
}
