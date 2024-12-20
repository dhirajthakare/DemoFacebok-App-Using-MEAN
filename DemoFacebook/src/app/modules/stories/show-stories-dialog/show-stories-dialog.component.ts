import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-show-stories-dialog',
  templateUrl: './show-stories-dialog.component.html',
  styleUrls: ['./show-stories-dialog.component.scss']
})
export class ShowStoriesDialogComponent implements OnInit {

  constructor(
    private dialogRef :MatDialogRef<ShowStoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.myobject();
  }

  mySrc:any;
  i:any =0 ;
  destroy$: Subject<void> = new Subject<void>();


  myobject(){

    this.i = this.data.selectedIndex;
    let  length = this.data.allStories.length;
    this.mySrc = this.data.allStories[this.i];


    let intervalData = interval(2000);
    intervalData.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.i++;

      if(length > (this.i)){
        this.mySrc = this.data.allStories[this.i]
      }else{
        this.dialogRef.close();
      }



    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
