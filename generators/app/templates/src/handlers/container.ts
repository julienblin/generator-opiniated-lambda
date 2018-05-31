import {
  ConfigService, createContainerFactory,
  HealthChecker, ICheckHealth, JSONFileConfigService, SSMParameterStoreConfigService } from "opiniated-lambda";

const SERVICE_NAME = "<%= name %>";

/** The specification for the container. */
export interface Container {
  configService(): ConfigService;
  healthChecker(): HealthChecker;
}

/** Options for container creation. */
export interface ContainerOptions {
  stage: string;
}

/** Definition of factories for the container. */
export const createContainer = createContainerFactory<Container, ContainerOptions>({
  configService: ({ options }) => {
    if (options.stage === "local") {
      return new JSONFileConfigService({ debug: true, path: `./local.config.json` });
    } else {
      return new SSMParameterStoreConfigService({ path: `/${SERVICE_NAME}/${options.stage}` });
    }
  },

  healthChecker: ({ container, options }) =>
    new HealthChecker(
      { includeTargets: true, name: `${SERVICE_NAME}/${options.stage}` },
      [
        container.configService() as object as ICheckHealth,
      ]),
});

export const lambdaProxyContainerFactory = ({ event }) => createContainer({ stage: event.requestContext.stage });
