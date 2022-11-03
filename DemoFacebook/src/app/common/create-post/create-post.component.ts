import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  
  constructor(private dialog: MatDialog , private service : UserService) { }
  loginuserDetails: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    this.getLoginUser();
  }

  getLoginUser(){
    this.unSubscribeLoginUser = this.service.currentLoginUser.subscribe((res: any)=>{
      if(res){
        this.loginuserDetails = res;
        // console.log(this.loginuserDetails);
      }
    })
  }

  onFocus() {
    this.createPostEmojiPicker = false;

  }


  addEmoji(event: any) {
   this.addstatus =  this.addstatus + event.emoji.native;
    
  }

    //Emoji for Create Post 
    addstatus: any = "";
    createPostEmojiPicker: boolean = false;
  
    toggleEmojiPicker() {
      this.createPostEmojiPicker = !this.createPostEmojiPicker;
    }


  OpenDia() {
    this.createPostEmojiPicker = false;
    let dialogRef = this.dialog.open(CreatePostDialogComponent , {
      width: '600px',
      data: {...this.loginuserDetails , ...{addstatus:this.addstatus}}
    });

    dialogRef.afterClosed().subscribe((res:any) => {
      this.addstatus=res;
    });
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }

}
