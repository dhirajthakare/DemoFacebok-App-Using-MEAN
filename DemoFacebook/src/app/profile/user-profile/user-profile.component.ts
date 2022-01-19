import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';
import { ProfileComponent } from '../profile.component';
import { ToastrService } from 'ngx-toastr';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private userservice: UsermiddlewareService,
    private profileComp: ProfileComponent,
    private toastr: ToastrService,
    private friend: FriendrelationshipService
  ) { }

  prealoader = false;

  public editProfile: any;

  data: any;

  @ViewChild('submitbtn')
  submitbtn!: ElementRef<HTMLElement>;

  currentUser: any;
  friendsId: any = [];

  ngOnInit(): void {

    this.userservice.currentLoginUser.subscribe((res: any) => {
      console.log(res);
      this.data = res;
      if (this.data) {
        this.getAllFriendsId();
        this.oninitgetdata();


      }

    });



  }


  userFriends: any;
  oninitgetdata() {

    this.userservice.currentVisitedUser.subscribe((res: any) => {
      this.currentUser = res;
      console.log(this.currentUser);

      console.log(this.currentUser);
      if (this.currentUser.user_Friends) {
        this.userFriends = this.currentUser.user_Friends.filter((value: any, index: number) => {
          return index <= 8;
        })
      }
      console.log(this.userFriends);
      this.getpost();

    })
  }


  sendRequest(uid: any, fid: any) {
    this.friend.sendRequest(uid, fid).subscribe(res => {
      this.toastr.success('Request send succeessfully');
    }, err => {
      console.log(err);
    })
  }

  friends: any;
  getAllFriendsId() {

    this.friend.userLoginFriendsId.subscribe(res => {
      this.friendsId = res;
    })

  }

  AllCurrentUserPost: any;
  getpost() {
    this.userservice.getCurrentUserPost(this.currentUser._id, this.data._id).subscribe((res: any) => {

      this.AllCurrentUserPost = res.filter((value: any, index: number) => {

        return index <= 8;
      })
      // this.allPosts=res;
      console.log("userpost");
      console.log(this.AllCurrentUserPost);
      // this.allPosts=res;
    })


    // let source = this.userservice.getCurrentUserPost(this.currentUser.id,this.data.id);
    // source.pipe(take(4)). subscribe(res => {
    //   console.log(res);
    // })
  }

}
