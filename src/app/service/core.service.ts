import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// We define the httOptions that we will use in the POST and PUT operations
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  // we define the url of the Web API service
  private apiUrl: string = "http://localhost:3000/users";

  // we inject the HttpClient
  constructor(private service: HttpClient) { }

  // definition of Get operation
  GetUsers():Observable<User[]>{
    return this.service.get<User[]>(this.apiUrl);
  }

  // definition of Delete operation 
  DeleteUser(user:User): Observable<User>{
    // we pass the User's Id
    const url = `${this.apiUrl}/${user.id}`;
    return this.service.delete<User>(url);
  }

  // definition of Update operation
  UpdateUser(user:User): Observable<User>{
    // we pass the User's Id
    const url = `${this.apiUrl}/${user.id}`;
    // We use httpOptions, because we are passing an object
    return this.service.put<User>(url, user, httpOptions);
  }

  // definition of Delete operation
  AddUser(user:User): Observable<User>{
    // We use httpOptions, because we are passing an object
    return this.service.post<User>(this.apiUrl, user, httpOptions);
  }
}
