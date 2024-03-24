import { Component, OnInit } from '@angular/core';
import { friendNav } from '../interface/friend.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrls: ['./friends-sidebar.component.scss'],
})
export class FriendsSidebarComponent implements OnInit {
  constructor() {}

  navNode:friendNav[]= [
    {
      route: '/friends',
      icon: 'user-group-man-man.png',
      value: 'Home',
    },
    {
      route: 'friend-request',
      icon: 'user-clock.png',
      value: 'Friend Requests',
    },
    {
      route: '/friends',
      icon: 'add-user-male.png',
      value: 'Suggestions',
    },
    {
      route: 'all-friends',
      icon: 'checked-user-male.png',
      value: 'All Friends',
    },
    {
      route: '/friends',
      icon: 'gift--v1.png',
      value: 'Birthday',
    },
    {
      route: '/friends',
      icon: 'change-user-male.png',
      value: 'Custom List',
    },
  ];

  drop(event: CdkDragDrop<friendNav[]>) {
    moveItemInArray(this.navNode, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {}
}
