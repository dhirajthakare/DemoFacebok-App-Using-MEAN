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
  async sendRecoveryMail(email: any) {
    try {
      this.SendMail = true;
      this.hashEmail = btoa(email);

      let formData = {
        emails: email,
        hashEmails: this.hashEmail,
      };
      const res: any = await this.service.sendRecoveryMail(formData);
      this.SendMail = false;
      if (res) {
        this.toast.success(res.message, 'Success!');
        this.route.navigate(['recover/code'], {
          queryParams: {
            hash: btoa(res.recoveryCode),
            Email: btoa(email),
          },
        });
      }
    } catch (err: any) {
      this.SendMail = false;
      this.toast.error(err.error.message, 'Fail!');
      console.log(err);
    }
  }
}
