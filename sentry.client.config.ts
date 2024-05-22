import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN: string | undefined = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});
