import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  
  title = 'frontEndSASE29';
  opened=false;

  constructor(private utilsSvc: UtilsService){}

  ngOnInit(): void {
    this.utilsSvc.sideBarOpened$.subscribe(
      (res:boolean) =>(this.opened = res) 
      );
  }

}
