import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
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
    private userService:UserService,
    private fb:FormBuilder,
    private toastService:ToastrService,
    private dialogRef:MatDialogRef<EditProfileDetailsDialogComponent>,
    private sharedService:SharedDataService
  ) { }

  
  editProfile:any;
  currentLoginUserDetails:any;
  CoverPhoto:any;
  file:any;
  imageChangeEvt:any;
  Destroy$ : Subject<void> = new Subject<void>();


  ngOnInit(): void {

    this.userService.currentVisitedUser.pipe(takeUntil(this.Destroy$)).subscribe( (res: any) =>{
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

  onChangeCoverPhoto(e:any) {
    this.imageChangeEvt = e;
    this.file = e.target.files[0];
    this.CoverPhoto = '';
  }

  cropImg(event: ImageCroppedEvent) {
    let cropsImgPreview:any = event.base64;
    let File = base64ToFile(cropsImgPreview);
    this.file = this.blobToFile(File, this.file.name);
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File(
      [theBlob as any], // cast as any
      fileName,
      {
        lastModified: new Date().getTime(),
        type: theBlob.type,
      }
    );
  };

  oneditprofile(){
      let formData = new FormData();
      formData.append('workplace',this.editProfile.get('workplace').value);
      formData.append('highSchool',this.editProfile.get('highSchool').value);
      formData.append('university',this.editProfile.get('university').value);

      if(this.file){
        formData.append('CoverPhoto',this.file);
      }

      formData.append('currentCity',this.editProfile.get('currentCity').value);
      formData.append('homeTown',this.editProfile.get('homeTown').value);
      formData.append('relation',this.editProfile.get('relation').value);
      formData.append('user_id',this.editProfile.get('user_id').value);

    this.userService.createUserInfo(formData).subscribe((res:any)=>{
      this.toastService.success(res, 'Success!');
      this.sharedService.editProfileSave.next(true);
      // this.sharedService.updatedUserDetails.next(true);
      this.dialogRef.close();
    },err=>{
      console.log(err);
    })
  }
  
  ngOnDestroy(){
    this.Destroy$.next()
  }
}
