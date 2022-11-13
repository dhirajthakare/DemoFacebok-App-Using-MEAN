import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-enter-recover-code',
  templateUrl: './enter-recover-code.component.html',
  styleUrls: ['./enter-recover-code.component.scss']
})
export class EnterRecoverCodeComponent implements OnInit {

  constructor(
    private service:AuthService,
    private route:Router,
    private router:ActivatedRoute,

  ) { }

  code:any;
  Email:any;
  errorCode:any = false;
  ngOnInit(): void {

    this.router.queryParams.subscribe((res: any)=>{
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

    this.service.checkOtp(dataf).subscribe(res=>{
    this.errorCode=false;
    this.route.navigate(['/recover/password'],{queryParams:{
      Email:btoa(this.Email)
    }})

    },err=>{
   this.errorCode=true
    })

  }


}
