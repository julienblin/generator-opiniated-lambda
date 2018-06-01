import { Container, lambdaProxyContainerFactory } from "@container";
import { containerLambdaProxy } from "opiniated-lambda";

// GET /health
export const handler = containerLambdaProxy<Container>(
  async ({}, { healthChecker }) => healthChecker().checkHealth(),
  {
    containerFactory: lambdaProxyContainerFactory,
    cors: true,
  });
