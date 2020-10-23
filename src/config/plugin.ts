import { EggPlugin } from 'midway';

export default {
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc'
  },
  graphql: {
    enable: true,
    package: 'egg-qpjoy-apollo-server',
  }
} as EggPlugin
