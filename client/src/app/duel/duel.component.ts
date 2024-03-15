import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

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
  winner?: boolean;
}

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {

  usernameOne: string = ""
  usernameTwo: string = ""

  userOne: UserData | undefined;
  userTwo: UserData | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  async getUserDataOne() {
    try {
      const userData = await this.userService.inspectUser(this.usernameOne);
      this.userOne = userData as UserData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async getUserDataTwo() {
    try {
      const userData = await this.userService.inspectUser(this.usernameTwo);
      this.userTwo = userData as UserData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async duelUsers() {
    try {
      if (this.userOne && this.userTwo) {
        if (this.userOne.followers > this.userTwo.followers) {
          this.userOne.winner = true;
          this.userTwo.winner = false;
        } else if (this.userOne.followers < this.userTwo.followers) {
          this.userOne.winner = false;
          this.userTwo.winner = true;
        } else if (this.userOne.followers === this.userTwo.followers) {
            // TIE IN FOLLOWERS AMOUNT - CHECK PERFECT REPOS
            if(this.userOne['perfect-repos'] > this.userTwo['perfect-repos']) {
            this.userOne.winner = true;
            this.userTwo.winner = false;
            } else if (this.userOne['perfect-repos'] < this.userTwo['perfect-repos']) {
            this.userOne.winner = false;
            this.userTwo.winner = true;
            }
        } else {
          this.userOne.winner = false;
          this.userTwo.winner = false;
        }
      }
    }
    catch (error) {
    console.error('Error determing duel winner:', error);
    }
  }



  async onSubmit() {
    try {
      await this.getUserDataOne();
      await this.getUserDataTwo();
      this.duelUsers();
    } catch (error) {
      console.error('Submission Error:', error);
    }
  }
}
