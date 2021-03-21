import { Component } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-prefeitura';
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  
  columns: any[] = [
    {},
    {},
    {},
    { type: 'numeric' },
    {},
  ];
  dataset: any[] = [
    { id: 1, cpfcnpj: '12970961695', numregistro: 'MG123456789', valor: 825.6, comentarios: 'Comment' },
    { id: 2, cpfcnpj: '12970961695', numregistro: 'MG123456789', valor: 825.6, comentarios: 'Comment' },
    { id: 3, cpfcnpj: '12970961695', numregistro: 'MG123456789', valor: 825.6, comentarios: 'Comment' },
    { id: 4, cpfcnpj: '12970961695', numregistro: 'MG123456789', valor: 825.6, comentarios: 'Comment' },
    { id: 5, cpfcnpj: '12970961695', numregistro: 'MG123456789', valor: 825.6, comentarios: 'Comment' },
  ];

  addRow() {
    this.dataset.push(
      { id: this.dataset.length, cpfcnpj: '', numregistro: '', valor: 0, comentarios: '' }
    );
    this.hotInstance.loadData(this.dataset);
  }


  private get hotInstance(): Handsontable {
    return this.hotRegisterer.getInstance(this.id);
  }

}
