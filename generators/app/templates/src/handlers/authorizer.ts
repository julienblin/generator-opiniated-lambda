import { containerLambdaAuthorizerBearer } from "opiniated-lambda";
import { Container, createContainer } from "./container";

// Authorizer λ
export const handler = containerLambdaAuthorizerBearer<Container>(
  async ({ bearerToken }) => {
    if (!bearerToken) {
      throw new Error("Missing bearer token.");
    }

    return {
      policyDocument: {
        Statement: [],
        Version: "2012-10-17",
      },
      principalId: bearerToken,
    };
  },
  {
    containerFactory: ({ event }) => createContainer({ stage: event.methodArn.split("/")[1] }),
  });
