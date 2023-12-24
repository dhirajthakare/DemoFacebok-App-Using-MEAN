import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AcceptCallComponent } from 'src/app/common/accept-call/accept-call.component';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { TakeCallService } from 'src/app/common/services/take-call.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss'],
})
export class MainBodyComponent implements OnInit {
  constructor(
    private sharedData: SharedDataService,
    private socket: TakeCallService,
    private userService: UserService,
    private matDialog: MatDialog
  ) {}
  data: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.sharedData.changeTitle('DeskBook | Home');
    this.userService.currentLoginUser
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        this.data = res;
        if (this.data) {
          this.someOneCallYou();
        }
      });
  }
  someOneCallYou() {
    this.socket.someOneCallYou().pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      if (res) {
        console.log(res, this.data);
        if (res.friendDetails.friendId == this.data._id) {
          this.matDialog.open(AcceptCallComponent, {
            data: {chatURL:res.chatURL,friendDetails:res.friendDetails},
          });
        }
      }
    });
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
