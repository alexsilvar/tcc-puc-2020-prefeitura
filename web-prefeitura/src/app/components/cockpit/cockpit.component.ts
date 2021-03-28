import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  onClickIPTU() {
    this.router.navigate(['iptu-itr']);
  }
}
