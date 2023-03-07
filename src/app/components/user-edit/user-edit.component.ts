import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent {
  public page_title:string = 'Ajustes de Usuario';
  public user: User;
  public identity:User;
  public token:string;
  public status:string = '';
  public url = global.url+"upload-avatar";


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ){
    this.identity= this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;

    //Configuracion del uploader
  }

  onSubmit(form:any){}

  //Evento y funciones del file uploader



}
