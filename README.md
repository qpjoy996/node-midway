# Avatar 中台项目

# 技术选型

### 1. Egg + React + SSR 应用骨架

详细用法实现请查看[官方文档](http://ykfe.surge.sh)

### 2. apollo-server

请参考[官方文档](https://www.apollographql.com/docs/apollo-server/)

# 实现

### 框架改进

> 1. 增加代码规范设定(/.editorconfig), /gitlab-ci.yml

> 2. 添加项目生命周期与环境变量(/src/app.ts, /src/env.ts)

> 3. 本地安装 docker,并且启用 pg 数据库

```
cd _docker
docker compose up -d
```

### ctx 继承

> 1. /src/app/extend/context.ts

### 配置插件

> 1. 去除 csrf，和 cors 限制

```
yarn add egg-cors

/src/config/config.default.ts
/src/config/plugin.ts
```

> 1. yarn add sequelize@^5.0.0 sequelize-typescript pg pg-hstore

```
    sequelize: {
      username: env.PG_USERNAME,
      password: env.PG_PASSWORD,
      database: env.PG_DATABASE,
      port: env.PG_PORT,
      host: env.PG_HOST,
      dialect: "postgres",
    },
```

> 2. trace time

```
export default function(options: any, app: any): any {
  return async (ctx: any, next: any) => {
    const startTime: number = Date.now();
    await next();
    ctx.set('X-Execute-time', Date.now() - startTime);
  };
}
```

> 3. restful api

1. get 获取所有数据, get /:id 获取单个数据
2. post 添加数据
3. put 更新数据
4. delete 删除数据, post /delete/:id 软删除， delete /:id 彻底删除

```
/src/app/controller/api/post.ts
/src/app/model/post.ts
/src/app/service/post.ts
```

> 4. egg-swagger-doc

1. 根据 contract 生成实体，根据 controller 里的注释自动生成文档
2. 访问路径 /swagger-ui.html
3. 渲染数据 /swagger-doc

```
/src/app/contract
/src/app/controller
```

> 5. 添加 graphql

1. yarn add egg-qpjoy-apollo-server 基于 egg-apollo-server 修改
2. yarn add apollo-server-koa
3. 访问 /graphql，或者修改 config.default.ts 的 url

注意：

1. 一般 graphql resolver 的做法，可能会再次访问 url 地址获取数据。造成网络开销。
2. 使用 ctx.requestContext.getAsync('ApolloService')获取程序启动时候的 ApolloService 实例。直接将需要用到的 service，注入到 ApolloService 里面。然后通过 midway middleware context 传递给 apollo context，然后在 apollo resolver 中进行业务处理。

```
/src/app/apollo/components  实体按文件夹区分
/src/app/apollo/graphql  定制化类型
```
