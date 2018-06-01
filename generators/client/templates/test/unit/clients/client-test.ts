import { <%= pascalName %> } from "@clients/<%= name %>";
import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { ConfigService, StaticConfigService } from "opiniated-lambda";

describe("<%= pascalName %>", () => {

  let configService: ConfigService;
  let client: <%= pascalName %>;

  beforeEach(() => {
    configService = new StaticConfigService({});
    client = new <%= pascalName %>(configService);
  });

  it("should do something", async () => {
    // Please assert.
  });

});
