import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CidadaoService } from './cidadao.service';
import { DataSharingService } from './data-sharing.service';

const API_ENDPOINT = 'http://kong-gateway.us-east-2.elasticbeanstalk.com:8000';
const STORAGE_TOKEN = 'access_token';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  cpfcnpj: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private dataSharing: DataSharingService, private cidadaoService: CidadaoService) { }

  login(cred: LoginCredentials) {
    return this.http.post(API_ENDPOINT + '/login', cred).toPromise().then((response: any) => {
      if (response['access_token']) {
        localStorage.setItem(STORAGE_TOKEN, response['access_token']);
        this.dataSharing.isUserLoggedIn.next(true);
      } else {
        throw new Error("Falha no login");
      }
      return this.getUser();
    }).catch(err => {
      console.error(err);
      throw new Error("Falha no login");
    })
  }

  logout() {
    localStorage.removeItem(STORAGE_TOKEN);
    this.dataSharing.isUserLoggedIn.next(false);
    this.dataSharing.username.next('Cidadão');
  }

  signup(cred: SignUpCredentials) {
    return this.http.post(API_ENDPOINT + '/signup/cidadao', { username: cred.username, email: cred.email, password: cred.password }).toPromise().then((response: any) => {
      if (response['error'] == undefined) {
        return this.login({ email: cred.email, password: cred.password }).then(res => {
          return this.cidadaoService.setCPF(cred.email, cred.cpfcnpj).then(opt => {
            return res;
          });
        });
      } else {
        throw new Error("Falha no Cadastro");
      }
    }).catch(err => {
      console.error(err);
      throw new Error("Falha no Cadastro");
    })
  }

  getUser() {
    let token = localStorage.getItem(STORAGE_TOKEN);
    if (typeof token != 'string') {
      this.dataSharing.isUserLoggedIn.next(false);
      return undefined
    };
    let decoded = jwt_decode(token) as any;
    this.dataSharing.isUserLoggedIn.next(true);

    this.dataSharing.username.next(decoded["username"]);
    return decoded;
  }

}
