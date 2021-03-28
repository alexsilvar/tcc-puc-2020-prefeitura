import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CidadaoService } from 'src/app/services/cidadao.service';

@Component({
  selector: 'app-consulta-iptu',
  templateUrl: './consulta-iptu.component.html',
  styleUrls: ['./consulta-iptu.component.scss']
})
export class ConsultaIptuComponent implements OnInit {
  closeResult: string = '';
  iptuitrs: any;
  isLoading: boolean = false;
  constructor(private cidadaoService: CidadaoService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onClick() {
    this.isLoading = true;
    this.cidadaoService.getMyIPTU().then((res: any) => {
      this.isLoading = false;
      this.iptuitrs = res;
      if(Array.isArray(res) && res.length ==0){
        alert("Nenhuma informação de IPTU/ITR foi encontrada para você. Se preciso contate nossa ouvidoria 31 99999-9999")
      }
    });
  }

}
