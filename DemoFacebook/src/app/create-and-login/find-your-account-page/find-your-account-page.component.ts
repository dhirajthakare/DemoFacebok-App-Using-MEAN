import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecoveryPasswordService } from 'src/app/services/recovery-password.service';

@Component({
  selector: 'app-find-your-account-page',
  templateUrl: './find-your-account-page.component.html',
  styleUrls: ['./find-your-account-page.component.css']
})
export class FindYourAccountPageComponent implements OnInit {

  constructor(
    private recoverpass:RecoveryPasswordService,
    private toast : ToastrService,
    private route : Router,
    private router:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  hashEmail:any;
  sendrecoveryMail(email:any){
    console.log(email);
    this.hashEmail = btoa(email);

    let dataf = {
      emails:email,
      hashEmails :this.hashEmail
    }
    this.recoverpass.sendRecoveryMail(dataf).subscribe(res=>{
      console.log(res);
      let respo:any = res;
      this.toast.success(respo.message,"Success!");
      this.route.navigate(['recover/code'],{queryParams:{
        hash:btoa(respo.recoveryCode),
        Email:btoa(email)
      }});
    },err=>{
      let errp:any = err;
      this.toast.error(errp.error,"Fail!");
      console.log(err);
    })
  }

}
