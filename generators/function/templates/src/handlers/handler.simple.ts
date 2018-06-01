import { Container, createContainer } from "@container";
import { containerLambda } from "opiniated-lambda";

interface <%= nameCapitalized %>Event {
  /**
   * The stage is passed by the caller, unless there is another
   * way to determine the environment (e.g. environment variables, config file, etc.)
   */
  stage: string;
}

export const handler = containerLambda<<%= nameCapitalized %>Event, Container>(
  async ({}, {}) => {
    // Do something
    return;
  },
  {
    containerFactory: ({ context, event }) => createContainer({ stage: event.stage }),
    validation: {
      event: {
        properties: {
          stage: {
            type: "string",
          },
        },
        required: [ "stage" ],
      },
    },
  });
