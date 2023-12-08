import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private sharedService: SharedDataService,
    private authservice: AuthService
  ) {}
  data: any;
  ngOnInit(): void {
    this.sharedService.changeTitle('Deskbook | Stories');
    this.getcurrentuser();
  }

  token: any;
  getcurrentuser() {
    this.authservice.getUserProfile().subscribe((res) => {
      localStorage.setItem('accountHolder', JSON.stringify(res));
      this.userService.currentLoginUser.next(res);
    });
  }

  ngOnDestroy() {
    this.userService.currentLoginUser.next('');
  }
}
