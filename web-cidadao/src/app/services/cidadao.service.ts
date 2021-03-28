import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const API_ENDPOINT = 'http://kong-gateway.us-east-2.elasticbeanstalk.com:8000';
const STORAGE_TOKEN = 'access_token';


@Injectable({
  providedIn: 'root'
})
export class CidadaoService {
  getMyIPTU() {
    let token = localStorage.getItem(STORAGE_TOKEN);
    if (token == null) { throw new Error("No token stored"); }
    let decoded = jwt_decode(token) as any;
    let email = decoded['email'];
    return this.http.get(API_ENDPOINT + '/emails/' + encodeURIComponent(email) + '/cpf-cnpjs', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise()
      .then((res: any) => {
        return this.http.get(API_ENDPOINT + '/cpf-cnpjs/' + res[0]['cpfcnpj'] + '/iptuitrs', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise()
      });
  }

  constructor(private http: HttpClient) { }


  setCPF(email: string, cpfcnpj: string) {
    return this.http.post(API_ENDPOINT + '/emails', { email }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise().then(res => {
      return this.http.post(API_ENDPOINT + '/emails/' + encodeURIComponent(email) + '/cpf-cnpjs', { cpfcnpj }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise();
    }).catch(err => {
      return this.http.post(API_ENDPOINT + '/emails/' + encodeURIComponent(email) + '/cpf-cnpjs', { cpfcnpj }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise();
    })
  }
}
