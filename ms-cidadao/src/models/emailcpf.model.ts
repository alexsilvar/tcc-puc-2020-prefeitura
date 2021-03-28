import {Entity, model, property} from '@loopback/repository';

@model()
export class Emailcpf extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuid"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;


  constructor(data?: Partial<Emailcpf>) {
    super(data);
  }
}

export interface EmailcpfRelations {
  // describe navigational properties here
}

export type EmailcpfWithRelations = Emailcpf & EmailcpfRelations;
