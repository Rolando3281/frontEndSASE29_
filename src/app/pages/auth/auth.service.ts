import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse, UserResponseAutenticado } from '@app/shared/models/user.interface';
import {environment} from '@env/environment'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import {JwtHelperService} from '@auth0/angular-jwt';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  //LOGIN DE USUARIOS
  login(authData:User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(environment.API_URL+'login',authData).pipe(
      map( (res:UserResponse)=>{
        console.log('Res-> ',res)
        this.saveToken(res.access_token);
        this.loggedIn.next(true);
        return res;
        //saveToken
      }),
      catchError((error)=> this.handlerError(error))
    );

  }

  

  //LOGOUT O FINALIZAR SESION DE USUARIOS
  logout(): void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    //set userIsLoged = false

  }


  //VERIFICA SI EL USUARIO SIGUE CON UN TOKEN VALIDO
  private checkToken(): void{
    var userToken = localStorage.getItem('token') ;
    var isExpired = true;
    if(userToken){isExpired = helper.isTokenExpired(userToken);}
    
    console.log('esta expirado= ',isExpired);
    //ser userIsLoged = isExpired;
    isExpired ? this.logout() : this.loggedIn.next(true);

  }


  private saveToken(token:string): void{
    localStorage.setItem('token',token);
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
