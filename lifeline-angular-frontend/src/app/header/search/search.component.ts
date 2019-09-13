import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  donor: Object;
  searchString: string;
  searchControl = new FormControl();
  options: string[] = ['Blood', 'Kidney', 'Platelet', 'Heart', 'Liver', 'Lungs', 'BoneMarrow', 'Cornea']
  constructor(private route: ActivatedRoute, private router: Router, private _searchService: SearchService) { }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(data => {
      this.searchString = data
      this.router.navigate(['search/'+this.searchString])
    })
  }
}
