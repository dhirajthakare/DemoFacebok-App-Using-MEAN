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
    private userservice: UserService
      ) {}

  likecounts = 0;

  LoginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    this.getCurrentLoginDetails();
  }

  getCurrentLoginDetails() {
    this.unSubscribeLoginUser = this.userservice.currentLoginUser.subscribe(
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
}
