import { containerLambdaProxy } from "opiniated-lambda";
import { Container, lambdaProxyContainerFactory } from "./container";

// GET /health
export const handler = containerLambdaProxy<Container>(
  async ({}, { healthChecker }) => healthChecker().checkHealth(),
  {
    containerFactory: lambdaProxyContainerFactory,
    cors: true,
  });
