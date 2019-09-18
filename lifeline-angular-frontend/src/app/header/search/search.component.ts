import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state("true" , style({ 
        width: '200px'
      })), 
      state("false", style({ 
        width: '0px'
      })),
      transition('* => *', animate('400ms ease-in')), 
    ])
  ]
})
export class SearchComponent implements OnInit {

  isVisible = false;
  donor: Object;
  searchString: string;
  searchControl = new FormControl();
  options: string[] = ['Blood', 'Kidney', 'Platelet', 'Heart', 'Liver', 'Lungs', 'Bone Marrow', 'Cornea']
  constructor(private route: ActivatedRoute, private router: Router, private _searchService: SearchService) { }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(data => {
      this.searchString = data
      this.router.navigate(['search/'+this.searchString])
    })
  }

  show() {
    this.isVisible = true;
  }

  hidden() {
    this.isVisible = false;
  }
}
