import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messanger-sidebar-left',
  templateUrl: './messanger-sidebar-left.component.html',
  styleUrls: ['./messanger-sidebar-left.component.scss'],
})
export class MessengerSidebarLeftComponent implements OnInit {
  constructor(private userService: UserService) {}

  data: any;
  token: any;
  onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.userService.currentMessengerUser
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        if (res) {
          this.token = res.friend_userToken;

          if (this.token) {
            this.userService.getUser(this.token).subscribe((res) => {
              this.data = res;
            });
          }
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
