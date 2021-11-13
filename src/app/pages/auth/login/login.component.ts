import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    usuario:[''],
    password:['']
  });

  constructor(private authSvc:AuthService, private fb:FormBuilder, private router: Router ) { }

  ngOnInit(): void {
    // const userData ={
    //   usuario:'rolando328',
    //   password:'apmt22a5'
    // };
    // this.authSvc.login(userData).subscribe( res => console.log('Login'));
  }

  onLogin(): void{
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue).subscribe( res =>{
      if(res){
        this.router.navigate(['']);

      }
    } )
  }

}
