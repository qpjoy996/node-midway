import { provide, scope, ScopeEnum } from 'midway'
const Sentry = require('@sentry/node');

@scope(ScopeEnum.Singleton)
@provide("Sentry")
export class SentryService {
  public static sentry: any;

  public static initSentry({dsn, environment}:any) {
    const sentryObj = {
      dsn,
      // environment
    }
    console.log(`[init sentry]:`, sentryObj);
    Sentry.init(sentryObj);
    SentryService.sentry = Sentry;
  }
}
