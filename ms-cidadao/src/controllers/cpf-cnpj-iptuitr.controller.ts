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
  CpfCnpj,
  Iptuitr,
} from '../models';
import {CpfCnpjRepository} from '../repositories';

export class CpfCnpjIptuitrController {
  constructor(
    @repository(CpfCnpjRepository) protected cpfCnpjRepository: CpfCnpjRepository,
  ) { }

  @get('/cpf-cnpjs/{id}/iptuitrs', {
    responses: {
      '200': {
        description: 'Array of CpfCnpj has many Iptuitr',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Iptuitr)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Iptuitr>,
  ): Promise<Iptuitr[]> {
    return this.cpfCnpjRepository.iptuitrs(id).find(filter);
  }

  @post('/cpf-cnpjs/{id}/iptuitrs', {
    responses: {
      '200': {
        description: 'CpfCnpj model instance',
        content: {'application/json': {schema: getModelSchemaRef(Iptuitr)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CpfCnpj.prototype.cpfcnpj,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Iptuitr, {
            title: 'NewIptuitrInCpfCnpj',
            exclude: ['id'],
            optional: ['cpfCnpjId']
          }),
        },
      },
    }) iptuitr: Omit<Iptuitr, 'id'>,
  ): Promise<Iptuitr> {
    return this.cpfCnpjRepository.iptuitrs(id).create(iptuitr);
  }

  @patch('/cpf-cnpjs/{id}/iptuitrs', {
    responses: {
      '200': {
        description: 'CpfCnpj.Iptuitr PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Iptuitr, {partial: true}),
        },
      },
    })
    iptuitr: Partial<Iptuitr>,
    @param.query.object('where', getWhereSchemaFor(Iptuitr)) where?: Where<Iptuitr>,
  ): Promise<Count> {
    return this.cpfCnpjRepository.iptuitrs(id).patch(iptuitr, where);
  }

  @del('/cpf-cnpjs/{id}/iptuitrs', {
    responses: {
      '200': {
        description: 'CpfCnpj.Iptuitr DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Iptuitr)) where?: Where<Iptuitr>,
  ): Promise<Count> {
    return this.cpfCnpjRepository.iptuitrs(id).delete(where);
  }
}
