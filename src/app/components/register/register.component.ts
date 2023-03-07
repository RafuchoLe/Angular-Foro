import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  
  page_title:string = 'Registrarse';
  user: User = new User('','','','','','','ROLE_USER');
  status:string = '';

  constructor(
    private _userService: UserService
  ){

  }

  ngOnInit(){
    console.log(this._userService.prueba());
    
  }
  
  onSubmit(form:any){
    console.log(this.user);
    
    this._userService.register(this.user).subscribe({
      next: response => {
        if (response.user && response.user._id) {
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error: error => {
        console.log(error);
      }
    });

    
  }

}
