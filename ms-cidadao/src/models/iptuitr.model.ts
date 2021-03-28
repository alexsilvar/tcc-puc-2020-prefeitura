import { Entity, model, property } from '@loopback/repository';

@model()
export class Iptuitr extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuid"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  numregistro: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: 'decimal'
    },
  })
  valor: number;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @property({
    type: 'string',
  })
  cpfCnpjId?: string;

  constructor(data?: Partial<Iptuitr>) {
    super(data);
  }
}

export interface IptuitrRelations {
  // describe navigational properties here
}

export type IptuitrWithRelations = Iptuitr & IptuitrRelations;
