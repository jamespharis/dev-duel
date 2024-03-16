import { Component, Input, OnInit } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { UserService } from 'src/user.service';
import { ErrorHandler } from '@angular/core';


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

let noUser = '';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  username: string = ""
  newUser: UserData = {
    username: "",
    name: "",
    location: "",
    bio: "",
    avatar_url: "",
    titles: [],
    'favorite-language': "",
    'public-repos': 0,
    'total-stars': 0,
    'highest-starred': 0,
    'perfect-repos': 0,
    followers: 0,
    following: 0,
  }


  constructor(private userService: UserService) {  }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    try {
    this.userService.inspectUser(this.username)
      .then(result => { if (result) { this.newUser = result } })
    }
      catch (error) {
        if (this.newUser.username === "" || this.newUser.username === undefined) {
          console.log(`The user ${this.username} was not found...`)
        }
      console.error('Error fetching user data:', error);
    }
  }

}
