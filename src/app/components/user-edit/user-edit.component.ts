import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from 'src/app/services/global';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent {
  public page_title:string = 'Ajustes de Usuario';
  public user:User;
  public identity;
  public token;
  public status= 'fine';
  public previsualizacion = "";
  public archivos: any;


  constructor(
    private _router:Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _sanitizer:DomSanitizer
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    //Configuracion del uploader
  }

  capturarEvent(data):any{
    const archivoCapturado =  data.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) => {
      this.previsualizacion = imagen.base;
    })
    
    this.archivos = archivoCapturado;

    // const data_obj = JSON.parse(event);
    console.log(data.target.files[0]);
    
    
    this.user.image = this.archivos.name;
    
    console.log(data.target.files);
    
  }

  extraerBase64 = async ($event: any ) => new Promise ((resolve,reject):any=>{
    try {
      const unsefaImg = window.URL.createObjectURL($event);
      const image = this._sanitizer.bypassSecurityTrustUrl(unsefaImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = ()=>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch(e){
      return null;
    }
  })

  subirArchivo():any{
    try {
      let formData = new FormData();
      formData.append('file0',this.archivos, this.archivos.name)

      this._userService.post(formData)
      .subscribe(res =>{
        console.log('Respuesta del servidor', res);
        
      })
    } catch (e) {
      console.log('ERROR', e);
      
    }
  }

  avatarUpload(data){
    const data_obj = JSON.parse(data.resonse);
    console.log(data_obj);

    this.user.image = data_obj.user.image;
    console.log(this.user);
    
    
  }

  onSubmit(from){
    this._userService.update(this.user).subscribe(
      Response => {
        if (!Response.user) {
          this.status = 'error';
        }else{
            this.subirArchivo();
            this.status = 'success';
            localStorage.setItem('dentity', JSON.stringify(this.user));
         }
      },
      Error =>{
        this.status = 'error';
        console.log(Error);
        
      }
    )
  }

  //Evento y funciones del file uploader



}
