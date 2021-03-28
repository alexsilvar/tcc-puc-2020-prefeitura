import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Iptuitr} from '../models';
import {IptuitrRepository} from '../repositories';

export class IptuItrController {
  constructor(
    @repository(IptuitrRepository)
    public iptuitrRepository : IptuitrRepository,
  ) {}

  @post('/iptuitrs')
  @response(200, {
    description: 'Iptuitr model instance',
    content: {'application/json': {schema: getModelSchemaRef(Iptuitr)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Iptuitr, {
            title: 'NewIptuitr',
            exclude: ['id'],
          }),
        },
      },
    })
    iptuitr: Omit<Iptuitr, 'id'>,
  ): Promise<Iptuitr> {
    return this.iptuitrRepository.create(iptuitr);
  }

  @get('/iptuitrs/count')
  @response(200, {
    description: 'Iptuitr model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Iptuitr) where?: Where<Iptuitr>,
  ): Promise<Count> {
    return this.iptuitrRepository.count(where);
  }

  @get('/iptuitrs')
  @response(200, {
    description: 'Array of Iptuitr model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Iptuitr, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Iptuitr) filter?: Filter<Iptuitr>,
  ): Promise<Iptuitr[]> {
    return this.iptuitrRepository.find(filter);
  }

  @patch('/iptuitrs')
  @response(200, {
    description: 'Iptuitr PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Iptuitr, {partial: true}),
        },
      },
    })
    iptuitr: Iptuitr,
    @param.where(Iptuitr) where?: Where<Iptuitr>,
  ): Promise<Count> {
    return this.iptuitrRepository.updateAll(iptuitr, where);
  }

  @get('/iptuitrs/{id}')
  @response(200, {
    description: 'Iptuitr model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Iptuitr, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Iptuitr, {exclude: 'where'}) filter?: FilterExcludingWhere<Iptuitr>
  ): Promise<Iptuitr> {
    return this.iptuitrRepository.findById(id, filter);
  }

  @patch('/iptuitrs/{id}')
  @response(204, {
    description: 'Iptuitr PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Iptuitr, {partial: true}),
        },
      },
    })
    iptuitr: Iptuitr,
  ): Promise<void> {
    await this.iptuitrRepository.updateById(id, iptuitr);
  }

  @put('/iptuitrs/{id}')
  @response(204, {
    description: 'Iptuitr PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() iptuitr: Iptuitr,
  ): Promise<void> {
    await this.iptuitrRepository.replaceById(id, iptuitr);
  }

  @del('/iptuitrs/{id}')
  @response(204, {
    description: 'Iptuitr DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.iptuitrRepository.deleteById(id);
  }
}
