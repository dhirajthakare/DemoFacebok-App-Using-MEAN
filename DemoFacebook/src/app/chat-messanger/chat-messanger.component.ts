import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ProfileHeaderComponent } from '../profile/profile-header/profile-header.component';
import { MessangerService } from '../services/messanger.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-chat-messanger',
  templateUrl: './chat-messanger.component.html',
  styleUrls: ['./chat-messanger.component.css']
})
export class ChatMessangerComponent implements OnInit ,OnDestroy {

constructor(){
  
}
 
ngOnInit(): void {
    
}

ngOnDestroy(): void {


}

}
