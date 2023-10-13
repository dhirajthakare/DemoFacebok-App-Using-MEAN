import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-enter-recover-code',
  templateUrl: './enter-recover-code.component.html',
  styleUrls: ['./enter-recover-code.component.scss'],
})
export class EnterRecoverCodeComponent implements OnInit {
  constructor(
    private service: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  code!: string;
  Email!: string;
  errorCode = false;
  ngOnInit(): void {
    this.router.queryParams.subscribe((res: any) => {
      this.code = atob(res.hash);
      this.Email = atob(res.Email);
      console.log(this.code);
    });
  }
  checkCode(CodeId: string) {
    let dataf = {
      serverOtp: this.code,
      userOtp: CodeId,
    };

    this.service.checkOtp(dataf).subscribe(
      (res) => {
        this.errorCode = false;
        this.route.navigate(['/recover/password'], {
          queryParams: {
            Email: btoa(this.Email),
          },
        });
      },
      () => {
        this.errorCode = true;
      }
    );
  }
}
