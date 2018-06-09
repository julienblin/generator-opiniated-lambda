import { Container, lambdaProxyContainerFactory } from "@container";
import { container, cors, defaultProxyMiddlewares, lambda, ok, proxy } from "opiniated-lambda";

// <%= method %> <%= name %>
export const handler = lambda()
  .use(container(lambdaProxyContainerFactory))<% if (cors) { %>
  .use(cors())<% } %>
  .use(defaultProxyMiddlewares())
  .handler(proxy<Container>(
    async ({}) => {
      return ok();
    }));
  