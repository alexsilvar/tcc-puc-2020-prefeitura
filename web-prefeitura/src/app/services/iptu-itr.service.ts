import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_ENDPOINT = 'http://kong-gateway.us-east-2.elasticbeanstalk.com:8000';
const STORAGE_TOKEN = 'access_token';

export interface CreateIPTUITR {
  numregistro: string,
  valor: number,
  comentarios: string
}

export interface UpdateIPTUITR {
  id: string,
  numregistro: string,
  valor: number,
  comentarios: string,
  cpfCnpjId
}

export interface ReadIPTUITR {
  id: string,
  numregistro: string,
  valor: number,
  comentarios: string,
  cpfCnpjId: string,
}

@Injectable({
  providedIn: 'root'
})
export class IptuItrService {
  getIPTUITRs() {
    return this.http.get(API_ENDPOINT + `/iptuitrs`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise().then((res: Array<ReadIPTUITR>) => res)
  }

  constructor(private http: HttpClient) { }


  createIPTUITR(cpfcnpj, data: CreateIPTUITR) {
    return this.http.post(API_ENDPOINT + `/cpf-cnpjs/${cpfcnpj}/iptuitrs`, data, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise().catch(err => {
      return this.http.get(API_ENDPOINT + `/cpf-cnpjs/${cpfcnpj}/iptuitrs`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise().then((res: Array<UpdateIPTUITR>) => {
        console.log(res);
        let found = res.filter(el => el.cpfCnpjId == cpfcnpj && el.numregistro == data.numregistro)[0];
        found.comentarios = data.comentarios;
        found.numregistro = data.numregistro;
        found.valor = data.valor;
        return this.http.patch(API_ENDPOINT + `/iptuitrs/` + found.id, found, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN) } }).toPromise();
      });
    });
  }
}
