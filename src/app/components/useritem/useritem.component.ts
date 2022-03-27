import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-useritem',
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.css']
})
export class UseritemComponent implements OnInit {

  @Input() user!:User;
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter();

  // we inject Router used to pass the value at the manageuser component
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onDelete(user: User){
    this.onDeleteUser.emit(user);
  }

  onUpdate(user: User)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          Name: user.name,
          Surname: user.surname,
          Id: user.id
      }
     };
     
     // we pass the NavigationExtras in the route.navigate
    this.router.navigate(["manageuser"], navigationExtras);
  }

}
