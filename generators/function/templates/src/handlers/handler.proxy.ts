import { Container, lambdaProxyContainerFactory } from "@container";
import { containerLambdaProxy, ok } from "opiniated-lambda";

// GET <%= name %>
export const handler = containerLambdaProxy<Container>(
  async ({}, {}) => {
    return ok();
  },
  {
    containerFactory: lambdaProxyContainerFactory,<% if (cors) { %>
    cors: true,<% } %>
  });
