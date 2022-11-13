import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
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

  
  editProfile:any;
  currentLoginUserDetails:any;
  CoverPhoto:any;
  Destroy$ : Subject<void> = new Subject<void>();


  ngOnInit(): void {

    this.userservice.currentLoginUser.pipe(takeUntil(this.Destroy$)).subscribe( (res: any) =>{
      if(res){
      this.currentLoginUserDetails=res;
      if(this.currentLoginUserDetails.user_info){
        this.editProfile = this.fb.group({
          'workplace':this.currentLoginUserDetails.user_info.workplace ? this.currentLoginUserDetails.user_info.workplace : '',
          'highSchool':this.currentLoginUserDetails.user_info.highSchool ? this.currentLoginUserDetails.user_info.highSchool:'',
          'university':this.currentLoginUserDetails.user_info.university ?this.currentLoginUserDetails.user_info.university:'' ,
          'CoverPhoto':'',
          'currentCity':this.currentLoginUserDetails.user_info.currentCity ? this.currentLoginUserDetails.user_info.currentCity:'',
          'homeTown':this.currentLoginUserDetails.user_info.homeTown ?this.currentLoginUserDetails.user_info.homeTown:'',
          'relation':this.currentLoginUserDetails.user_info.relation?this.currentLoginUserDetails.user_info.relation:'',
          'user_id':this.currentLoginUserDetails._id
      
      });
      if(this.currentLoginUserDetails.user_info.CoverPhoto){
        this.CoverPhoto = 'http://localhost:2000'+this.currentLoginUserDetails.user_info.CoverPhoto;
      }
      }else{
        this.editProfile = this.fb.group({
          'workplace':'',
          'highSchool':'',
          'university':'' ,
          'CoverPhoto':'',
          'currentCity':'',
          'homeTown':'',
          'relation':'',
          'user_id':this.currentLoginUserDetails._id
      });
      }
    }
    });
  }

  file:any;
  onChangeCoverPhoto(e:any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
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

    this.userservice.createUserInfo(formdata).subscribe((res:any)=>{
      this.toastr.success(res, 'Success!');
      this.sharedservice.editProfileSave.next(true);
      this.sharedservice.updatedUserDetails.next(true);
      this.dialogref.close();
    },err=>{
      console.log(err);
    })
  }
  
  ngOnDestroy(){
    this.Destroy$.next()
  }
}
