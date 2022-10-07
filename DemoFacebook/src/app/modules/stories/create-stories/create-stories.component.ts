import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorieService } from 'src/app/common/services/storie.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-create-stories',
  templateUrl: './create-stories.component.html',
  styleUrls: ['./create-stories.component.scss']
})
export class CreateStoriesComponent implements OnInit {

  constructor(
    private userservice:UserService,
    private storymanage:StorieService,
    private router:Router,
    private toastr:ToastrService,
    private location: Location
  ) { }
 data:any;
 storysrc:any;
 file:any;
  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
    });
  }

  onFilechangestory(e:any) {
    // console.log('hello');
    // console.log(e);
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
        // console.log(this.file)
        // console.log(this.imageSrc)
        this.storysrc = event.target.result;
        // console.log(this.storysrc);

      }

    }
  }
  oncreatestory(){

    let formdata = new FormData;
    // formdata.append('storyText',this.createPost.get('storyText')?.value);
    formdata.append('user_id',this.data._id);
    formdata.append('storyUrl',this.file);

      this.storymanage.createstory(formdata).subscribe((res)=>{
        this.storysrc = '';
        this.file='';
        this.toastr.success('Story Created Successfully ','Success!');
        this.location.back();
            },(err)=>{

        console.log(err);
      })
}

}