import { <%= pascalName %> } from "@services/<%= name %>";
import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { ConfigService, StaticConfigService } from "opiniated-lambda";

describe("<%= pascalName %>", () => {

  let configService: ConfigService;
  let service: <%= pascalName %>;

  beforeEach(() => {
    configService = new StaticConfigService({});
    service = new <%= pascalName %>(configService);
  });

  it("should do something", async () => {
    // Please assert.
  });

});
