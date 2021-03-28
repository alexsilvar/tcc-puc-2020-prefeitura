import {Entity, model, property, hasMany} from '@loopback/repository';
import {Iptuitr} from './iptuitr.model';

@model()
export class CpfCnpj extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  cpfcnpj: string;

  @property({
    type: 'string',
  })
  emailId?: string;

  @hasMany(() => Iptuitr)
  iptuitrs: Iptuitr[];

  constructor(data?: Partial<CpfCnpj>) {
    super(data);
  }
}

export interface CpfCnpjRelations {
  // describe navigational properties here
}

export type CpfCnpjWithRelations = CpfCnpj & CpfCnpjRelations;
