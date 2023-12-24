import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.scss']
})
export class EnterNewPasswordComponent implements OnInit {

  constructor(
    private router:ActivatedRoute,
    private route:Router,
    private service:AuthService,
    private toast:ToastrService
  ) { }

  Email!:string;
  ngOnInit(): void {
    this.router.queryParams.subscribe((res:any)=>{
      this.Email=atob(res.Email);
    })
  }

  changePassword(Pass:string){

    let formData = {
      email:this.Email,
      password:Pass
    }
    this.service.changePassword(formData).subscribe((res:any)=>{
      this.toast.success(res,"success")
      this.route.navigate(['']);
    },err=>{
      this.toast.error(err.error,"Fails")
      console.log(err);
    })

  }


}
