import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  User, UserResponse, UserResponseAutenticado } from '@app/shared/models/user.interface';
import {environment} from '@env/environment'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import {JwtHelperService} from '@auth0/angular-jwt';
import { ResolveStart, Router } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>('');

  constructor(private http:HttpClient, private router:Router, private utilsSvc:UtilsService) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get getRole():Observable<string>{
    return this.role.asObservable();
  }

  //LOGIN DE USUARIOS
  login(authData:User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(environment.API_URL+'login',authData).pipe(
      map( (res:UserResponse)=>{
        console.log('Res-> ',res)
        this.saveToken(res.access_token, res.role);
        this.loggedIn.next(true);
        this.role.next(res.role);
        return res;
        //saveToken
      }),
      catchError((error)=> this.handlerError(error))
    );

  }

  

  //LOGOUT O FINALIZAR SESION DE USUARIOS
  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.loggedIn.next(false);
    this.role.next('');
    this.utilsSvc.openSideBar(false);
    this.router.navigate(['/login']);
    //set userIsLoged = false

  }


  //VERIFICA SI EL USUARIO SIGUE CON UN TOKEN VALIDO
  private checkToken(): void{
    var userToken = localStorage.getItem('token') ;
    var roleUser =  localStorage.getItem('rol');
    var isExpired = true;
    if(userToken){isExpired = helper.isTokenExpired(userToken);}
    
    console.log('esta expirado= ',isExpired);
    //ser userIsLoged = isExpired;
    //isExpired ? this.logout() : this.loggedIn.next(true); 

    if(isExpired){
      this.logout();
    }
    else{
      this.loggedIn.next(true);
      if(roleUser!=null)
      this.role.next(roleUser);
    }

  }


  private saveToken(token:string, rol:string): void{
    localStorage.setItem('token',token);
    localStorage.setItem('rol',rol);
  }

  private handlerError(error:any): Observable<never>{
    let errorMessage = 'Ocurrio un error obteniendo los datos';
    if(error){
      errorMessage='Error: Code '+error.message;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
    
  }
}
