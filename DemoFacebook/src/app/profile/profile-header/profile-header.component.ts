import { AfterViewInit, Component, ElementRef, OnInit, ViewChild ,OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { MessangerService } from 'src/app/services/messanger.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';
import { MessangerComponent } from '../messanger/messanger.component';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit,AfterViewInit,OnDestroy {

    chatAudio = new Audio('../../assets/Realme 7 Pro ! Notification ! Tone.mp3')
  constructor(
    private userservice:UsermiddlewareService,
    private fb:FormBuilder,
    private profileComp:ProfileComponent,
    private friend:FriendrelationshipService,
    private toastr:ToastrService,
    private messanger:MessangerService ,
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
      
      this.messagedisplay();
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
        this.getAllMessage();
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


//  message Session

@ViewChild('sendmessage') sendMessageInput : ElementRef | any
chatMessage:any='';
sendmsg(value:any){
console.log(value)

// let formdata = new FormData();
// formdata.append('message',value);
// formdata.append('sender_id',this.data.id);
// formdata.append('receiver_id',this.currentUser.id);

let dataf = {
  "message":value,
  "sender_id":this.data._id,
  "receiver_id":this.currentUser._id,
}

this.messanger.sendmessage(dataf).subscribe(res=>{
  console.log(res);
  this.getAllMessage();
  this.chatMessage = '';
  this.sendMessageInput.nativeElement.focus();
  this.messageEmojiPicker=false;

})
  }

  allmessage :any;
  getAllMessage(){
    this.messanger.getmessage(this.data._id,this.currentUser._id).subscribe(res=>{
      console.log(res);
      this.allmessage=res;
      // this.sendMessageInput.nativeElement.focus();

    })
  }
  messangerdisplayBox:any
  messagedisplay(){

    this.messanger.messangerdisplayBox.subscribe(res=>{
      this.messangerdisplayBox=res;
    })
  }

  continuousgetmessage : Subscription | any;
  public i:number = 0;
  messangerClick(){

    let intervaldata = interval(5000);

    this.continuousgetmessage = intervaldata.subscribe(res=>{
      // var obj = JSON.parse(this.allmessage);
      var length = Object.keys(this.allmessage).length;
      // console.log(obj);
      console.log(length) 
      this.getAllMessage();
      this.sendMessageInput.nativeElement.focus();
      console.log(this.i++);
    })

    setTimeout(() => {
      this.sendMessageInput.nativeElement.focus();
    }, 500);

   
  }

  closemessanger(){
this.continuousgetmessage.unsubscribe();
  }
  // messangerClick(){

  //     this.messanger.friend_id=this.currentUser.id;
  //     this.messanger.user_id = this.data.id;
  //     this.messanger.profileUrl = this.currentUser.profileUrl;
  //     this.messanger.friendname = this.currentUser.name;
  //     this.messanger.messangerdisplayBox.next(true);
  // }
addMessangerEmoji(event:any){
    console.log(event.emoji.native);

    this.chatMessage = this.chatMessage+event.emoji.native
  }

  messageEmojiPicker:boolean=false;
 
 
   updatePostToggleEmojiPicker() {
     this.messageEmojiPicker = !this.messageEmojiPicker;
   }
  ngOnDestroy(){
    // this.continuousgetmessage.unsubscribe();
  }

  OpenMessangerDia(){
    const matDiaref = this.matDia.open(MessangerComponent,{
      width:'700px',
      data:{
        user_id:this.data._id,
        friend_id:this.currentUser._id
      }
    })
  }

}
