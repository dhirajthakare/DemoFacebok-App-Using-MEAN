import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss']
})
export class ProfileBodyComponent implements OnInit {

  
  constructor(private fb: FormBuilder,
    private userservice: UserService,
    private profileComp: ProfileComponent,
    private toastr: ToastrService,
    private friend: FriendService
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
