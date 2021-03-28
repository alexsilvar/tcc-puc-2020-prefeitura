import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Email,
  CpfCnpj,
} from '../models';
import {EmailRepository} from '../repositories';

export class EmailCpfCnpjController {
  constructor(
    @repository(EmailRepository) protected emailRepository: EmailRepository,
  ) { }

  @get('/emails/{id}/cpf-cnpjs', {
    responses: {
      '200': {
        description: 'Array of Email has many CpfCnpj',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CpfCnpj)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CpfCnpj>,
  ): Promise<CpfCnpj[]> {
    return this.emailRepository.cpfCnpjs(id).find(filter);
  }

  @post('/emails/{id}/cpf-cnpjs', {
    responses: {
      '200': {
        description: 'Email model instance',
        content: {'application/json': {schema: getModelSchemaRef(CpfCnpj)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Email.prototype.email,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CpfCnpj, {
            title: 'NewCpfCnpjInEmail',
            optional: ['emailId']
          }),
        },
      },
    }) cpfCnpj: CpfCnpj,
  ): Promise<CpfCnpj> {
    return this.emailRepository.cpfCnpjs(id).create(cpfCnpj);
  }

  @patch('/emails/{id}/cpf-cnpjs', {
    responses: {
      '200': {
        description: 'Email.CpfCnpj PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CpfCnpj, {partial: true}),
        },
      },
    })
    cpfCnpj: Partial<CpfCnpj>,
    @param.query.object('where', getWhereSchemaFor(CpfCnpj)) where?: Where<CpfCnpj>,
  ): Promise<Count> {
    return this.emailRepository.cpfCnpjs(id).patch(cpfCnpj, where);
  }

  @del('/emails/{id}/cpf-cnpjs', {
    responses: {
      '200': {
        description: 'Email.CpfCnpj DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CpfCnpj)) where?: Where<CpfCnpj>,
  ): Promise<Count> {
    return this.emailRepository.cpfCnpjs(id).delete(where);
  }
}
