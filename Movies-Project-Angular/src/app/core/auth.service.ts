import { Injectable, signal } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://localhost:3000/api'
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedUser = localStorage.getItem('currentUser');
        if(savedUser){
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }
}

register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string
): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/register`, {
        username,
        email,
        tel,
        password,
        rePassword
    }, {
        withCredentials: true
    }).pipe(
        tap(user => {
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        })
    );
}

getCurrentUserId(): string | null {
    return this._currentUser()?._id || null;
}

update(user:User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${user._id}`,{
        _id: user._id,
        username: user.username,
        email: user.email,
        tel: user.tel
    },{
        withCredentials: true
    }).pipe(
        tap(user => {
            this._currentUser.set(user);
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        })
    )
}

login(email:string,password:string):Observable<User> {
return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password },{
    withCredentials: true
  }).pipe(
    tap(user => {
      this._currentUser.set(user);
      this._isLoggedIn.set(true);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    })
  )
}

logout(): Observable<void> {
  return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
    withCredentials: true
  }).pipe(
    tap(() => {
      this._currentUser.set(null);
      this._isLoggedIn.set(false);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('currentUser');
      }
    })
  );
}

}
