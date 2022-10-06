import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-story-archive',
  templateUrl: './profile-story-archive.component.html',
  styleUrls: ['./profile-story-archive.component.scss']
})
export class ProfileStoryArchiveComponent implements OnInit {

  constructor(
    private userservice:UserService
  ) { }
  currentUser:any;
  ngOnInit(): void {
    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
  })
}

}
