import { Component, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { IptuItrService } from 'src/app/services/iptu-itr.service';

interface DataSetSTUR {
  id: number,
  cpfcnpj: string,
  numregistro: string,
  valor: number,
  comentarios: string,
}

interface ReadDataSetSTUR {
  id: string,
  cpfcnpj: string,
  numregistro: string,
  valor: number,
  comentarios: string,
}

interface AlertMessage {
  type: "success" | "error" | "warning",
  message: string
}

@Component({
  selector: 'app-iptu-itr',
  templateUrl: './iptu-itr.component.html',
  styleUrls: ['./iptu-itr.component.scss']
})
export class IptuItrComponent implements OnInit {
  isLoading: boolean = false;
  alert: AlertMessage = null;
  hideEdit: boolean = true;
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';

  columns: any[] = [
    {},
    {},
    {},
    { type: 'numeric' },
    {},
  ];
  dataset: DataSetSTUR[] = [
    // { id: 1, cpfcnpj: '12970961695', numregistro: 'MG123456789', valor: 825.6, comentarios: 'Comment' },
  ];

  iptuitrs = [];

  private get hotInstance(): Handsontable {
    return this.hotRegisterer.getInstance(this.id);
  }

  constructor(private iptuitrService: IptuItrService) { }

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.dataset.push({} as DataSetSTUR);
    }
    this.refreshViewTable();
  }



  refreshViewTable() {
    this.isLoading = true;
    this.iptuitrService.getIPTUITRs().then(res => {
      this.iptuitrs = res;
      this.isLoading = false;
    });
  }

  addRow() {
    this.dataset.push(
      { id: this.dataset.length, cpfcnpj: '', numregistro: '', valor: 0, comentarios: '' }
    );
    this.hotInstance.loadData(this.dataset);
  }




  submitData() {
    let toSubmitData = this.dataset.filter(el => el.cpfcnpj != null && el.numregistro != null && el.valor != null);
    if (toSubmitData.length == 0) {
      this.alert = { type: "warning", message: "Preencha algum dado para submissão" };
      return
    }

    this.isLoading = true;
    let promises = [];

    toSubmitData.forEach((el) => {
      promises.push(
        this.iptuitrService.createIPTUITR(el.cpfcnpj, { numregistro: el.numregistro, comentarios: el.comentarios, valor: el.valor })
      );
    });


    Promise.all(promises).then((res) => {
      console.log(res);
      this.isLoading = false;
      this.alert = { type: "success", message: "Dados salvos com sucesso, verifique na aba de consulta" };
      this.dataset = this.dataset.map(el => { return {} as DataSetSTUR })
    }).catch(err => {
      this.alert = { type: "error", message: "Falha ao salvar os dados, verifique as informações e tente novamente" };
    })
  }

  dismissAlert() {
    this.alert = null;
  }
}
