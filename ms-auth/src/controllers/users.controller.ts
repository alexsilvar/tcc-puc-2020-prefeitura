import { inject } from '@loopback/core';
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
  RestBindings,
  Response,
  Request,
  HttpErrors,
} from '@loopback/rest';
import { Roles, User } from '../models';
import { UserRepository } from '../repositories';
import * as jwt from 'jsonwebtoken';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export class UsersController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
    @inject(RestBindings.Http.REQUEST) private req: Request,
  ) { }

  @post('/login')
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
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'GetToken',
            exclude: ['id', 'role', 'username'],
          }),
        },
      },
    })
    tokenRequest: LoginRequest,
  ): Promise<LoginResponse> {
    let tokenResponse: LoginResponse = { access_token: '' }

    return this.userRepository.findOne(<Filter<User>>{ where: { email: tokenRequest.email, password: this.encodePass(tokenRequest.password) } }).then((user) => {
      if (user && user instanceof User) {
        tokenResponse.access_token = this.createToken({ username: user.username, email: user.email, role: user.role });
        return tokenResponse;
      } else {
        this.response.status(401);
        return new HttpErrors.Unauthorized("Invalid Credentials");
      }
    }).catch(err => {
      return err;
    });
  }

  @post('/signup/cidadao')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User, { exclude: ['password'] }) } },
  })
  async createCidadao(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id', 'role'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.createUser(user, Roles.CIDADAO);
  }


  @post('/signup/funcionario')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User, { exclude: ['password'] }) } },
  })
  async createFuncionario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id', 'role'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    if (!this.hasRole(Roles.ADMIN)) {
      this.response.status(401);
      throw new HttpErrors.Unauthorized("Invalid Credentials - Must have the Admin role");
    }
    return this.createUser(user, Roles.FUNCIONARIO);
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
          items: getModelSchemaRef(User, { includeRelations: true, exclude: ['password'] }),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true, exclude: ['password'] }),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, { includeRelations: true, exclude: ['password'] }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, { exclude: 'where' }) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
  ): Promise<void> {
    if (!this.hasRole(Roles.ADMIN)) {
      delete user.role;
    }
    await this.userRepository.updateById(id, user);
  }

  // @put('/users/{id}')
  // @response(204, {
  //   description: 'User PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() user: User,
  // ): Promise<void> {
  //   await this.userRepository.replaceById(id, user);
  // }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }


  /**
   * Return the payload inside a valid accessToken 
   * @param {Object} payload 
   */
  createToken(payload: Object): string {
    return jwt.sign(payload, <string>process.env.JWT_SECRET, {
      algorithm: <"HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512" | "PS256" | "PS384" | "PS512" | "none">process.env.JWT_ALGORITHM,
      issuer: <string>process.env.JWT_KEY,
      expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
    });
  }



  hasRole(role: Roles) {
    if (this != undefined && this.req != undefined && this.req.headers != undefined) {
      let auth = this.req.headers['Authorization'];
      if (auth != null && typeof auth == 'string' && jwt != null) {
        let decoded = jwt.decode(auth, { complete: true });
        if (typeof decoded == 'object' && decoded != null) {
          return decoded['payload']['role'] === role;
        }
      }
    }
    return false;
  }

  /**
   * MD5 Hash
   * @param pass 
   */
  encodePass(pass: string): string {
    const md5 = require('md5');
    return md5(pass);
  }

  /**
   * Create an user with a given role
   * @param {User} user 
   * @param {Roles} role 
   */
  createUser(user: User, role: Roles) {
    user.role = role;
    if (user.password) {
      user.password = this.encodePass(user.password);
    } else {
      throw new Error("must have a password");
    }
    return this.userRepository.create(user).then(user => {
      delete user.password;
      return user;
    });
  }
}
