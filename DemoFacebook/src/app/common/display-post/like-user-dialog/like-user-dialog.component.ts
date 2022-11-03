import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like-user-dialog',
  templateUrl: './like-user-dialog.component.html',
  styleUrls: ['./like-user-dialog.component.scss']
})
export class LikeUserDialogComponent implements OnInit {

  
  constructor(
    private dialogRef : MatDialogRef<LikeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public moderdata: any,
    private router : Router

  ) { }

  ngOnInit(): void {
    console.log(this.moderdata);
  }
  navicateUser(token:string){
    console.log(token);
    this.dialogRef.close();
    this.router.navigate(['/profile/'+token]);
    
  }

}
