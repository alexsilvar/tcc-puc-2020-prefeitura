import {
  Count,
  CountSchema,
  Filter,
  FilterBuilder,
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
  HttpErrors,
  RestBindings,
  Response,
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import * as jwt from 'jsonwebtoken';
import { inject } from '@loopback/core';

export interface TokenRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
}

export class JwtController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) { }

  @post('/jwt')
  @response(200, {
    description: 'Token Response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'TokenResponse',
          properties: {
            access_token: { type: 'string' }
          },
        }
      }
    },
  })
  async getJWTToken(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'GetToken',
            exclude: ['id', 'email'],
          }),
        },
      },
    })
    tokenRequest: TokenRequest,
  ): Promise<TokenResponse> {
    // process.env.JWT_KEY
    // process.env.JWT_SECRET
    // process.env.JWT_TAGS
    // process.env.JWT_RSA_PUBLIC_KEY,
    // process.env.JWT_ALGORITHM

    let tokenResponse: TokenResponse = { access_token: '' }

    return this.userRepository.findOne(<Filter<User>>{ where: { email: tokenRequest.email, password: tokenRequest.password } }).then((user) => {
      if (user && user instanceof User) {
        delete user.password;
        delete user.id;

        tokenResponse.access_token = jwt.sign({ username: user.username, email: user.email, role: 'admin' }, <string>process.env.JWT_SECRET, {
          algorithm: "HS256",
          issuer: <string>process.env.JWT_KEY,
          expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
        });
        return tokenResponse;
      } else {
        this.response.status(401);
        return new HttpErrors.Unauthorized("Invalid Credentials");
      }
    }).catch(err => {
      return err;
    });
  }

  @post('/signup')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, { exclude: ['password'], includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter).then(res => {
      return res.map(el => {
        delete el.password;
        return el;
      })
    });
  }


  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, { exclude: ['password'], includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, { exclude: 'where' }) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter).then(el => { delete el.password; return el; });
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
