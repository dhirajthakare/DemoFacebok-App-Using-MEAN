import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPasswordService } from 'src/app/services/recovery-password.service';

@Component({
  selector: 'app-enter-recover-code',
  templateUrl: './enter-recover-code.component.html',
  styleUrls: ['./enter-recover-code.component.css']
})
export class EnterRecoverCodeComponent implements OnInit {

  constructor(
    private recoverypass:RecoveryPasswordService,
    private router:ActivatedRoute,
    private route:Router
  ) { }

  code:any;
  Email:any;
  errorCode:any = false;
  ngOnInit(): void {

    this.router.queryParams.subscribe(res=>{
      console.log(res)
      let data:any = res;
      this.code = atob(data.hash) ;
      this.Email=atob(data.Email);
      console.log(this.code);
    })
  }
  checkCode(CodeId:any){


    let dataf:any = {
      serverOtp:this.code,
      userOtp:CodeId
    }

    this.recoverypass.checkOtp(dataf).subscribe(res=>{
    this.errorCode=false;
    this.route.navigate(['/recover/password'],{queryParams:{
      Email:btoa(this.Email)
    }})

    },err=>{
   this.errorCode=true
    })
    // if(CodeId==this.code){
    //   console.log("Otp is correct");
    // }else{
    //   console.log("somthing wrong");
    // }

  }

}
