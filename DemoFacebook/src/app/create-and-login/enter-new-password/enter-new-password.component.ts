import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPasswordService } from 'src/app/services/recovery-password.service';

@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent implements OnInit {

  constructor(
    private router:ActivatedRoute,
    private route:Router,
    private recovery:RecoveryPasswordService
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
    this.recovery.changePassword(dataf).subscribe(res=>{
      console.log(res);
      this.route.navigate(['']);
    },err=>{
      console.log(err);
    })

  }

}
