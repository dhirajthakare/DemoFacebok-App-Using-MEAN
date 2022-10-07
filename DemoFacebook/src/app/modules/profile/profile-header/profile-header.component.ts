import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BoxMessangerComponent } from 'src/app/common/box-messanger/box-messanger.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  
  chatAudio = new Audio('../../assets/Realme 7 Pro ! Notification ! Tone.mp3')
  constructor(
    private userservice:UserService,
    private fb:FormBuilder,
    private profileComp:ProfileComponent,
    private friend:FriendService,
    private toastr:ToastrService,
    private matDia:MatDialog
  ) { }

   ngAfterViewInit(){
    // this.sendMessageInput.nativeElement.focus();
  }
  @ViewChild('editModelClose')
  editModelClose: any;
  editProfile:any;
    data:any;

  ngOnInit(): void {
    this.getAllFriendsId();

    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){
        this.oninitgetdata();
      }
      if(this.data.user_info){
        this.editProfile = this.fb.group({
          'workplace':this.data.user_info.workplace ? this.data.user_info.workplace : '',
          'highSchool':this.data.user_info.highSchool ? this.data.user_info.highSchool:'',
          'university':this.data.user_info.university ?this.data.user_info.university:'' ,
          'CoverPhoto':'',
          'currentCity':this.data.user_info.currentCity ? this.data.user_info.currentCity:'',
          'homeTown':this.data.user_info.homeTown ?this.data.user_info.homeTown:'',
          'relation':this.data.user_info.relation?this.data.user_info.relation:'',
          'user_id':this.data._id
      
      });
      }else{
        this.editProfile = this.fb.group({
          'workplace':'',
          'highSchool':'',
          'university':'' ,
          'CoverPhoto':'',
          'currentCity':'',
          'homeTown':'',
          'relation':'',
          'user_id':this.data._id
      
      });
      }
      
    });
  }
  
  CoverPhoto:any;
  currentUser:any;
  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(this.currentUser)
      if(this.currentUser.user_info){
        if(this.currentUser.user_info.CoverPhoto){
          this.CoverPhoto = 'http://localhost:2000'+this.currentUser.user_info.CoverPhoto;
        }
  
      }
      if(this.currentUser){
      }
    })
   
  }
  friendsId:any = [];
  m=0;
  getAllFriendsId(){

        this.friend.userLoginFriendsId.subscribe(res=>{
          this.friendsId = res;
          console.log(this.friendsId);
        })

      }

      sendRequest(uid:any,fid:any){
  
        this.friend.sendRequest(uid,fid).subscribe(res=>{
          this.toastr.success('Request send succeessfully');
        },err=>{
          console.log(err);
        })
      }

      removeFriend(){
       if(confirm('Are you sure you want to remove '+this.currentUser.name +' as your friend?')){
        this.friend.unfriend(this.data._id,this.currentUser._id).subscribe(res =>{
          console.log(res);
          this.toastr.success("Successfully Remove From Your Friend List",'Success!');
          this.profileComp.ngOnInit();
          this.ngOnInit();
        },err=>{
          console.log(err);
        })
       }
      }

  file:any;
  onChangeCoverPhoto(e:any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
        console.log(this.file)
        // console.log(this.imageSrc)
        this.CoverPhoto = event.target.result;

      }

    }
  }
  oneditprofile(){


      let formdata = new FormData();
      formdata.append('workplace',this.editProfile.get('workplace').value);
      formdata.append('highSchool',this.editProfile.get('highSchool').value);
      formdata.append('university',this.editProfile.get('university').value);
if(this.file){
  formdata.append('CoverPhoto',this.file);

}
      formdata.append('currentCity',this.editProfile.get('currentCity').value);
      formdata.append('homeTown',this.editProfile.get('homeTown').value);
      formdata.append('relation',this.editProfile.get('relation').value);
      formdata.append('user_id',this.editProfile.get('user_id').value);



    this.userservice.createUserInfo(formdata).subscribe(res=>{
      console.log(res);
      // this.editProfile.reset();
      this.CoverPhoto='';
      this.file=null;
      this.profileComp.getCurrentUserData();
      this.toastr.success('Profile Updated Successfully', 'Success!');
      this.editModelClose.nativeElement.click();

    },err=>{
      console.log(err);
    })
  } 


  ngOnDestroy(){
    // this.continuousgetmessage.unsubscribe();
  }

  OpenMessangerDia(){
    const matDiaref = this.matDia.open(BoxMessangerComponent,{
      width:'500px',
      height:'500px',
      data:{
        user_id:this.data._id,
        friend_id:this.currentUser._id,
        userToken:this.currentUser.userToken,


      }
    })
  }


}
