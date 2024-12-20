import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor(
    private userService: UserService
      ) {}

  LoginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;
  offset = 0;

  ngOnInit(): void {
    this.getCurrentLoginDetails();
  }

  getCurrentLoginDetails() {
    this.unSubscribeLoginUser = this.userService.currentLoginUser.subscribe(
      (res: any) => {
        if (res) {
          this.LoginUserDetails = res;
        }
      }
    );
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }
  onScroll() {
    this.offset +=5;
    console.log("scrolled!!");
  }

}
