import { Component, OnInit } from '@angular/core';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-profile-story-archive',
  templateUrl: './profile-story-archive.component.html',
  styleUrls: ['./profile-story-archive.component.css']
})
export class ProfileStoryArchiveComponent implements OnInit {

  constructor(
    private userservice:UsermiddlewareService
  ) { }
  currentUser:any;
  ngOnInit(): void {
    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
  })
}

}
