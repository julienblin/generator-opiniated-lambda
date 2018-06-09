import { Container, lambdaProxyContainerFactory } from "@container";
import { CheckHealth, container, cors, defaultProxyMiddlewares, health, lambda } from "opiniated-lambda";

// GET /health
export const handler = lambda()
  .use(container(lambdaProxyContainerFactory))
  .use(cors())
  .use(defaultProxyMiddlewares())
  .handler(health<any, Container>(
    "<%= name %>",
    async ({ services: { configService } }) => ([
      configService() as any as CheckHealth,
    ]),
  ));
