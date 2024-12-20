import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-sidebar-left',
  templateUrl: './main-sidebar-left.component.html',
  styleUrls: ['./main-sidebar-left.component.scss'],
})
export class MainSidebarLeftComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  LoginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;
  ngOnInit(): void {
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
  openLink(link:string){
    window.open(link,'_balnk')
  }
}
