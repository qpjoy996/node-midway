export default function(options: any, app: any): any {
  return async (ctx: any, next: any) => {
    if(ctx.request.url === '/graphql') {
      const ApolloService = await ctx.requestContext.getAsync('ApolloService');
      ctx.ApolloService = ApolloService;
      await next();
    }else {
      await next();
    }
  };
}
