import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, Interceptor } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication, RestBindings } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';

export { ApplicationConfig };

export class MsAuthApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.interceptor(ipFilter, { global: true, group: 'ipfilter', key: 'ipfilter-interceptor' })
  }
}

const ipFilter: Interceptor = async (invocationCtx, next) => {
  const reqCtx = await ((await invocationCtx.get(RestBindings.Http.CONTEXT)).get(RestBindings.Http.REQUEST));
  let fwdHost = reqCtx.headers['x-forwarded-host'];
  console.log('API_GATEWAY: ', process.env.API_GATEWAY);
  console.log('x-forwarded-host', fwdHost);
  if (fwdHost === process.env.API_GATEWAY) {
    return next();
  }
  throw new Error("Only the API Gateway can Call this API");
}