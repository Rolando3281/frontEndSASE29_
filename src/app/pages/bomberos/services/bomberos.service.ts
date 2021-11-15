import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bombero } from '@app/shared/models/bombero.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BomberosService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Bombero[]>{
    let auth_token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    );

    return this.http.get<Bombero[]>(environment.API_URL.concat("bomberos"),{headers : httpHeaders})
    .pipe(catchError(this.handlerError));
  }

  getById(bomberoId:number):Observable<Bombero>{
    return this.http.get<Bombero>(`${environment.API_URL}bomberos/${bomberoId}`)
    .pipe(catchError(this.handlerError));
  }

  create(bombero:Bombero):Observable<Bombero>{
    return this.http.post<Bombero>(environment.API_URL.concat("bomberos"),bombero)
    .pipe(catchError(this.handlerError));

  }

  update(bomberoId:number, bombero:Bombero):Observable<Bombero>{
    return this.http.put<Bombero>(`${environment.API_URL}bomberos/${bomberoId}`,bombero)
    .pipe(catchError(this.handlerError));

  }

  delete(bomberoId:number):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}bomberos/${bomberoId}`)
    .pipe(catchError(this.handlerError));
    
  }

  handlerError(error:any):Observable<never>{
    let errorMessage="Error Desconocido.."
    if(error){
      errorMessage = `Error: ${error.message}`;

    }
    window.alert(errorMessage);
    return throwError(errorMessage);

  }

}
