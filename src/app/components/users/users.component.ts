import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { CoreService } from 'src/app/service/core.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  // we inject the CoreService
  constructor(private userService: CoreService) { }

  ngOnInit(): void {
    // in the Init function, we call the GetUsers method
    this.userService.GetUsers().subscribe(usersOutput => {
      this.users = usersOutput
    });
  }

  deleteUser(user: User)
  {
    this.userService.DeleteUser(user).subscribe(() => {
      this.users = this.users.filter(t => t.id!== user.id);
    });
  }

}
