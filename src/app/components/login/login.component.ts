import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {
  page_title:string = 'Identificate';
  user: User = new User('','','','','','','ROLE_USER');
  status:string ='';
  identity:any;
  token:any;
  
  constructor(
    private _userService:UserService,
    private _router: Router,
    private _route:ActivatedRoute
  ){ }

  async onSubmit(form:any){
    this._userService.signup(this.user).subscribe({
      next: response => {
        // Conseguir  objeto completo del usuario logueado
        if (response.user && response.user._id) {
          //Guardamos el usuario en una propiedad
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token del usuario identificado
          this._userService.signup(this.user, true).subscribe({
            next: response =>{
              if (response.token) {
                // GUardamos el token del usuario en una propiedad
                this.token = response.token;
                localStorage.setItem('token', this.token);

                this.status = 'success';
                this._router.navigate(['/inicio'])
              }
            },
            error: error =>{
              this.status = 'error';
              console.log(error);
            }
          })
          
        }else{
          this.status = 'error';
        }
      },
      error: error => {
        this.status = 'error';
        console.log(error);
      }
    });
  }
}
