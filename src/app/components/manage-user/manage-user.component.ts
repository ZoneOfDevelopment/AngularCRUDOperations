import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { CoreService } from 'src/app/service/core.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  id?:number;
  surname: string = "";
  name: string ="";

  // we inject userService used to call the AddUser and UpdateUser methods
  // router is used to redirect the page at the list of users
  // activatedRoute is used to get the parameters from the previuos page, in case of update
  constructor(private userService: CoreService, private router: Router, private activatedRoute: ActivatedRoute){
    // using activatedRoute we can get the parameters 
    // that we put in the previous page
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['Name'];
      this.surname = params['Surname'];
      this.id = params['Id'];
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.surname || !this.name)
    {
      alert('Please insert Surname and Name!');
      return
    }

    const outputUser: User = {
      name: this.name,
      surname: this.surname
    };


    if(this.id === undefined)
    {
      // new user
       this.userService.AddUser(outputUser).subscribe();
    }
    else
    {
      // update user
      outputUser.id = this.id;
      this.userService.UpdateUser(outputUser).subscribe();
    }

    // redirect to the Users list page
    this.router.navigate(['/']);
  }
}
