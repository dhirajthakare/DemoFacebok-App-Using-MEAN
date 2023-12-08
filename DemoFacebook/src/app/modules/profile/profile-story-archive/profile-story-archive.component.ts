import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-story-archive',
  templateUrl: './profile-story-archive.component.html',
  styleUrls: ['./profile-story-archive.component.scss']
})
export class ProfileStoryArchiveComponent implements OnInit {

  constructor(
    private userService:UserService,
    private sharedService:SharedDataService
  ) { }
  currentVisitedUserDetails:any;
  destroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.changeTitle('DeskBook | Archive');
    this.userService.currentVisitedUser.pipe(takeUntil(this.destroy$)).subscribe((res: any)=>{
      this.currentVisitedUserDetails = res;
  })

}

ngOnDestroy() {
  this.destroy$.next();
}

}
