import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDetailsDialogComponent } from 'src/app/common/main-header/edit-profile-details-dialog/edit-profile-details-dialog.component';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss']
})
export class ProfileIntroComponent implements OnInit {

  
  data:any;
  currentUser:any;
  constructor(
    private userservice:UserService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
  
    });
   
    this.oninitgetdata();
  
  }

  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(this.currentUser);

    })
}

openeditProfileComponant(){
  this.dialog.open(EditProfileDetailsDialogComponent)
}

}
