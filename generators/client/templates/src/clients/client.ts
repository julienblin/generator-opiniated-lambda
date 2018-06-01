import Axios, { AxiosInstance } from "axios";
import { checkHealth, ConfigService, ICheckHealth } from "opiniated-lambda";

export class <%= pascalName %> implements ICheckHealth {

  private clientPromise: Promise<AxiosInstance> | undefined;

  public constructor(
    private readonly configService: ConfigService,
  ) {}

  public async checkHealth() {
    return checkHealth(
      "<%= pascalName %>",
      await this.configService.get("<%= name %>-url"),
      async () => this.getSomething());
  }

  public async getSomething() {
    const client = await this.client();

    return (await client.get<GetSomething>("/foo")).data;
  }

  /**
   * Returns the Axios client for consumptions by others.
   * The client instance is cached and re-used.
   */
  private async client() {
    if (!this.clientPromise) {
      this.clientPromise = this.buildClient();
    }

    return this.clientPromise;
  }

  /** Builds the Axios client. */
  private async buildClient() {
    return Axios.create({
      baseURL: await this.configService.get("<%= name %>-url"),
    });
  }
}

export interface GetSomething {
  foo: string;
}
