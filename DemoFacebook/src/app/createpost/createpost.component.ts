import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsermiddlewareService } from '../services/usermiddleware.service';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  constructor(private dialog: MatDialog , private service : UsermiddlewareService) { }
  data: any;
  ngOnInit(): void {
    this.data = [];
    this.service.currentLoginUser.subscribe((res: any)=>{
      this.data = res;

    })
    // this.data = localStorage.getItem('accountHolder');
    // this.data = JSON.parse(this.data);
    console.log(this.data);

  }

  onFocus() {
    console.log('focus');
    this.createPostEmojiPicker = false;

  }


  addEmoji(event: any) {
    console.log(event.emoji.native);
   this.addstatus =  this.addstatus + event.emoji.native;
    
  }

    //Emoji for Create Post 
    addstatus: any = "";
    createPostEmojiPicker: boolean = false;
  
    toggleEmojiPicker() {
      console.log(this.createPostEmojiPicker);
      this.createPostEmojiPicker = !this.createPostEmojiPicker;
    }


  OpenDia() {
    this.createPostEmojiPicker = false;
    let dialogRef = this.dialog.open(CreatePostDialogComponent , {
      width: '600px',
      data: {...this.data , ...{addstatus:this.addstatus}}
    });

    dialogRef.afterClosed().subscribe((res:any) => {
      console.log(res);
      this.addstatus=res;
    });
  }

 

}

