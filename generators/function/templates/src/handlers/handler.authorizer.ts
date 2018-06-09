import { Container, createContainer } from "@container";
import { CustomAuthorizerEvent } from "aws-lambda";
import { authorizerBearer, container, lambda } from "opiniated-lambda";

// λ Authorizer
export const handler = lambda()
  .use(container<CustomAuthorizerEvent, Container>(
    ({ event }) => createContainer({ stage: event.methodArn.split("/")[1] })))
  .handler(authorizerBearer<Container>(
    async ({ bearerToken }) => {
      return {
        policyDocument: {
          Statement: [],
          Version: "2012-10-17",
        },
        principalId: bearerToken,
      };
    }));
