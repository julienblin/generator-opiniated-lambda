import { createContainer } from "@container";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("container", () => {

  it("should instantiate container", async () => {
    const container = createContainer({ stage: "unit-tests"});

    expect(container.configService()).to.not.be.undefined;
  });

});
