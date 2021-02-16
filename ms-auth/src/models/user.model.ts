import { uuid } from '@loopback/core';
import { Entity, model, property } from '@loopback/repository';

export enum Roles {
  CIDADAO = 'cidadao',
  FUNCIONARIO = 'funcionario',
  ADMIN = 'admin'
}

@model({
  settings: {
    hiddenProperties: ['password']
  }
})
export class User extends Entity {
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
  username: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
    },
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8,
      errorMessage: 'Password should have at least 8 characters',
    },
  })
  password?: string;

  @property({
    type: 'string',
    required: false,
    jsonSchema: {
      enum: Object.values(Roles),
    },
  })
  role?: Roles;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
