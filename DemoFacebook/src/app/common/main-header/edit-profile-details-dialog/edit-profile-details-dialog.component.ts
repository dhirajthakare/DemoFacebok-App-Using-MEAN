import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile-details-dialog',
  templateUrl: './edit-profile-details-dialog.component.html',
  styleUrls: ['./edit-profile-details-dialog.component.scss']
})
export class EditProfileDetailsDialogComponent implements OnInit {

   
  constructor(
    private userservice:UserService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private dialogref:MatDialogRef<EditProfileDetailsDialogComponent>,
    private sharedservice:SharedDataService
  ) { }

   ngAfterViewInit(){
    // this.sendMessageInput.nativeElement.focus();
  }
  
  editProfile:any;
    data:any;

  ngOnInit(): void {

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
      this.toastr.success('Profile Updated Successfully', 'Success!');
      this.sharedservice.editProfileSave.next(true);
      this.dialogref.close();
    },err=>{
      console.log(err);
    })
  } 


}
