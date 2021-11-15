import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = '';
  isLogged = false;
  //private subscription: Subscription = new Subscription;
  private subscription: Subscription[] = [];

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    //this.subscription.add(this.authSvc.isLogged.subscribe((res)=>(this.isLogged=res)));
    this.subscription.push(this.authSvc.isLogged.subscribe((res)=>(this.isLogged=res)));
    
    //this.authSvc.getRole.subscribe((res) =>(this.isAdmin=res));
    this.subscription.push(this.authSvc.getRole.subscribe((res) =>(this.isAdmin=res)));
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    this.subscription.forEach(s => s.unsubscribe());
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
  }

}
