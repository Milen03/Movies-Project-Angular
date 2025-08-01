import { Injectable, signal } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";



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
        const savedUser = localStorage.getItem('currentUser');
        if(savedUser){
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

}