import {Entity, model, property, hasMany} from '@loopback/repository';
import {CpfCnpj} from './cpf-cnpj.model';

@model()
export class Email extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  email: string;

  @hasMany(() => CpfCnpj)
  cpfCnpjs: CpfCnpj[];

  constructor(data?: Partial<Email>) {
    super(data);
  }
}

export interface EmailRelations {
  // describe navigational properties here
}

export type EmailWithRelations = Email & EmailRelations;
