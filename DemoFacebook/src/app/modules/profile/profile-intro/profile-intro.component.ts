import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { EditProfileDetailsDialogComponent } from 'src/app/common/main-header/edit-profile-details-dialog/edit-profile-details-dialog.component';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss'],
})
export class ProfileIntroComponent implements OnInit {
  loginUserDetails: any;
  currentVisitedUserDetails: any;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private userservice: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userservice.currentLoginUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if(res){
        console.log(res);
        this.loginUserDetails = res;
        }
      });

    this.oninitgetdata();
  }

  oninitgetdata() {
    this.userservice.currentVisitedUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if(res){
        this.currentVisitedUserDetails = res;
        console.log(this.currentVisitedUserDetails);
        }
      });
  }

  openeditProfileComponant() {
    this.dialog.open(EditProfileDetailsDialogComponent);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
