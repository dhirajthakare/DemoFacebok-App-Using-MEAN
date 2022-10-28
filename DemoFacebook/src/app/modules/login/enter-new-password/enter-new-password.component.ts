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

  Email:any;
  ngOnInit(): void {
    this.router.queryParams.subscribe(res=>{
      console.log(res)
      let data:any = res;
      this.Email=atob(data.Email);
      console.log(this.Email);
    })
  }

  changePassword(Pass:any){

    let dataf = {
      email:this.Email,
      password:Pass
    }
    this.service.changePassword(dataf).subscribe((res:any)=>{
      console.log(res);
      this.toast.success(res,"success")
      this.route.navigate(['']);
    },err=>{
      this.toast.error(err.error,"Faill")
      console.log(err);
    })

  }


}
