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
  loginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    this.getLoginUser();
  }

  getLoginUser(){
    this.unSubscribeLoginUser = this.service.currentLoginUser.subscribe((res: any)=>{
      if(res){
        this.loginUserDetails = res;
      }
    })
  }

  onFocus() {
    this.createPostEmojiPicker = false;

  }


  addEmoji(event: any) {
   this.addStatus =  this.addStatus + event.emoji.native;
    
  }

    //Emoji for Create Post 
    addStatus: any = "";
    createPostEmojiPicker: boolean = false;
  
    toggleEmojiPicker() {
      this.createPostEmojiPicker = !this.createPostEmojiPicker;
    }


  OpenDia() {
    this.createPostEmojiPicker = false;
    let dialogRef = this.dialog.open(CreatePostDialogComponent , {
      width: '600px',
      data: {...this.loginUserDetails , ...{addStatus:this.addStatus}}
    });

    dialogRef.afterClosed().subscribe((res:any) => {
      this.addStatus=res;
    });
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }

}
