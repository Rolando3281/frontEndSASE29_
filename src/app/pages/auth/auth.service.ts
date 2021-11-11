import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse, UserResponseAutenticado } from '@app/shared/models/user.interface';
import {environment} from '@env/environment'
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  //LOGIN DE USUARIOS
  login(authData:User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(environment.API_URL+'login',authData).pipe(
      map( (res:UserResponse)=>{
        console.log('Res-> ',res)
        this.saveToken(res.token);
        //saveToken
      }),
      catchError((error)=> this.handlerError(error))
    );

  }

  //VERIFICA SI UN USUARIO ESTA LOGEADO AL SISTEMA CON UN TOKEN VALIDO
  isLoged(token:any): Observable<UserResponseAutenticado|void>{
    return this.http.get<UserResponseAutenticado>(environment.API_URL+'user',{params:{api_token:token}}).pipe(
      map((res:UserResponseAutenticado)=>{
        console.log('Res-> ',res)
      }),
      catchError((error)=> this.handlerError(error))
    );

  }

  //LOGOUT O FINALIZAR SESION DE USUARIOS
  logout(): void{
    localStorage.removeItem('token');
    //set userIsLoged = false

  }


  //VERIFICA SI EL USUARIO SIGUE CON UN TOKEN VALIDO
  private checkToken(): void{
    const userToken = localStorage.getItem('token');
    const isExpired = false;
    //ser userIsLoged = isExpired;
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
