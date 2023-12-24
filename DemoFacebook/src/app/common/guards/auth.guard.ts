import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SharedDataService } from '../services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private sharedService : SharedDataService , private toast:ToastrService , private route:Router ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.sharedService.isLoginUser()){
        return true;
      }else{
        this.toast.error('You Need To Login First','Error!');
        this.route.navigate(['']);
        return false;
      }

  }
  
}
