import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../models/user';
import { global } from "./global";

@Injectable()
export class UserService{
    url:string;
    identity:any;
    token:any;
    constructor (private _http: HttpClient){
        this.url = global.url;
    }
    prueba(){
        return "Hola mundo desde el servicio de Angular";
    }

    register(user:User): Observable<any>{
        // Convertir el objeto usuario a un json string 
        let params = JSON.stringify(user);

        // Definir las cabeceras
        let headers = new HttpHeaders().set('content-type', 'application/json');
        
        // Hacer peticion ajax
        return this._http.post(this.url+'register', params, {headers: headers});
    }

    signup(user:any, gettoken:boolean = false):Observable<any>{
        // comprobar si llega el gettoken
        if (gettoken !=false) {
            user.gettoken = gettoken
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('content-type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = localStorage.getItem('identity');
        if (identity && identity != null && identity!= undefined && identity!= 'undefined') {
            this.identity = JSON.parse(identity);
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if (token && token != null && token!= undefined && token!= 'undefined') {
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    update(user):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization',this.getToken());

        return this._http.put(this.url+'user/update',params, {headers:headers});
    }

    public post(body):Observable<any>{
        let headers = new HttpHeaders().set('enctype','multipart/form-data').set('Authorization', this.getToken());
        console.log(body);
        
        return this._http.post('http://localhost:3999/api/upload-avatar',body, {headers:headers}); //POST
    }
}