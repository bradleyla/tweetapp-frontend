import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUser | null = null;

  constructor() { }

  getUser(): IUser | null {
    return this.user;
  }

  setUser(user: IUser): void{
    this.user = user;
  }

  clearUser(): void {
    this.user = null;
  }
}
