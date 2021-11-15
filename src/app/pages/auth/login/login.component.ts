import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  private isValidUser= /\S/; //para validad email la expresion seria /\S+@\S+\.+\S/
  private subscription: Subscription = new Subscription();
  loginForm = this.fb.group({
    usuario:['',[Validators.required,Validators.pattern(this.isValidUser)]],
    password:['',[Validators.required,Validators.minLength(3)]]
  });

  constructor(
    private authSvc:AuthService, 
    private fb:FormBuilder, 
    private router: Router 
    ) { }

  ngOnInit(): void {
    // const userData ={
    //   usuario:'******',
    //   password:'******'
    // };
    // this.authSvc.login(userData).subscribe( res => console.log('Login'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void{

    if(this.loginForm.valid){

    const formValue = this.loginForm.value;
    this.subscription.add(
    this.authSvc.login(formValue).subscribe( res =>{
      if(res){
        this.router.navigate(['']);

      }
    } )
    );
    }//EVITA QUE SE ENVIE EL FORMULARIO INVALIDO

  }

  getErrorMessage(field: string): string|void{
    let message;
    let errorReq = this.loginForm.get(field)?.errors?.required;


    if(this.loginForm.get(field)?.errors?.required){
      message='Debe Ingresar un Valor';
    }
    else if(this.loginForm.get(field)?.hasError('pattern')){
      message='Debe Ingresar un Valor Valido';
    }
    else if(this.loginForm.get(field)?.hasError('minLength')){
      message='Longitud de Password Incorrecta';
    }

    return message;
  }

  isValidField(field: string):boolean | void{
    return(
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid
    );
  }

}
