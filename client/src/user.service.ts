import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const inspectUserUrl = 'http://localhost:3000/api/user/';
const duelUsersUrl = 'http://localhost:3000/api/users?';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async inspectUser(username = 'andrew') {
    let data = await this.http.get<UserData>(inspectUserUrl + username).toPromise();
    console.log(data);
    return data;
    
  }

  async duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    let data = await this.http.get(duelUsersUrl + `username=${user1}&username=${user2}`).toPromise();
    console.log(data);
    return data;
  }

}

interface UserData {
  username: string;
  name: string;
  location: string;
  bio: string;
  avatar_url: string;
  titles: string[];
  'favorite-language': string;
  'public-repos': number;
  'total-stars': number;
  'highest-starred': number;
  'perfect-repos': number;
  followers: number;
  following: number;
}