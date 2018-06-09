import { Container, createContainer } from "@container";
import { container, lambda, validateEvent } from "opiniated-lambda";

/**
 * Event interface.
 */
interface <%= pascalName %>Event {
  /**
   * The stage is passed by the caller, unless there is another
   * way to determine the environment (e.g. environment variables, config file, etc.)
   */
  stage: string;
}

/**
 * JSON schema for event validation.
 */
const <%= camelName %>EventSchema = {
  properties: {
    stage: {
      type: "string",
    },
  },
  required: ["stage"],
};

export const handler = lambda()
  .use(container<<%= pascalName %>Event, Container>(({ event }) => createContainer({ stage: event.stage })))
  .use(validateEvent(<%= camelName %>EventSchema))
  .handler<<%= pascalName %>Event, any, Container>(
    async ({ }) => {
      return "hello";
    });
  