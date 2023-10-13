import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-find-your-account-page',
  templateUrl: './find-your-account-page.component.html',
  styleUrls: ['./find-your-account-page.component.scss'],
})
export class FindYourAccountPageComponent implements OnInit {
  constructor(
    private service: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  hashEmail!: string;
  SendMail = false;
  sendrecoveryMail(email: any) {
    this.SendMail = true;
    this.hashEmail = btoa(email);

    let dataf = {
      emails: email,
      hashEmails: this.hashEmail,
    };
    this.service.sendRecoveryMail(dataf).subscribe(
      (res: any) => {
        this.SendMail = false;
        this.toast.success(res.message, 'Success!');
        this.route.navigate(['recover/code'], {
          queryParams: {
            hash: btoa(res.recoveryCode),
            Email: btoa(email),
          },
        });
      },
      (err) => {
        this.SendMail = false;

        let errp: any = err;
        this.toast.error(errp.error, 'Fail!');
        console.log(err);
      }
    );
  }
}
