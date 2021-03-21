import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_ENDPOINT = 'http://kong-gateway.us-east-2.elasticbeanstalk.com:8000';



@Injectable({
  providedIn: 'root'
})
export class CidadaoService {

  constructor(private http: HttpClient) { }

}
