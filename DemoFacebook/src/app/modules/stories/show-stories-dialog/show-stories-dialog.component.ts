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
    private dialogref :MatDialogRef<ShowStoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.myobject();
  }

  mysrc:any;
  i:any =0 ;
  destroye$: Subject<void> = new Subject<void>();


  myobject(){

    this.i = this.data.selctedIndex;
    let  length = this.data.allstory.length;
    this.mysrc = this.data.allstory[this.i];


    let intervaldata = interval(2000);
    intervaldata.pipe(takeUntil(this.destroye$)).subscribe((res) => {
      this.i++;

      if(length > (this.i)){
        this.mysrc = this.data.allstory[this.i]
      }else{
        this.dialogref.close();
      }



    });
  }

  ngOnDestroy(): void {
    this.destroye$.next();
  }

}
