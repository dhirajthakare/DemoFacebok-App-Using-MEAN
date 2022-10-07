import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-account-create-dialog',
  templateUrl: './account-create-dialog.component.html',
  styleUrls: ['./account-create-dialog.component.scss']
})
export class AccountCreateDialogComponent implements OnInit {

  constructor( 
    public service : AuthService,
    private formbuilder : FormBuilder,
     private toast : ToastrService,
     private dialogRef : MatDialogRef<AccountCreateDialogComponent>
     ) { }

  ngOnInit(): void {
  }

  
// onSubmit 
createAccountForm =  this.formbuilder.group({
  'fname':'',
  'lname':'',
  'email':'',
  'password':'',
  'birthOfDate':'',
  'gender':'',

})

storeallerrors:any;
onSubmit(){
console.log(this.createAccountForm.value);

this.service.createAcc(this.createAccountForm.value).subscribe((res)=>{
console.log(res);
this.toast.success("Successfully Created Acoount" , "Success!",);
this.storeallerrors=null;
this.createAccountForm.reset();
this.dialogRef.close();
},(err)=>{

console.log(err);

this.storeallerrors = err.error;
console.log(this.storeallerrors)

})
}


}
