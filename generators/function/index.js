const Generator = require('yeoman-generator');
const yaml = require('js-yaml');
const changeCase = require('change-case');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    return this.prompt([{
      type: "input",
      name: "name",
      message: "Function name (kebab-case e.g. products-management)",
      require: true
    },
    {
      type: "list",
      name: "type",
      message: "Function type",
      choices: ["proxy", "authorizer", "simple"],
      require: true,
      default: "proxy"
    },
    {
      type: "input",
      name: "path",
      message: "HTTP event path (.e.g. products/{id})",
      require: true,
      when: (a) => a.type === "proxy"
    },
    {
      type: "list",
      name: "method",
      message: "HTTP method",
      choices: ["get", "post", "put", "patch", "delete"],
      require: true,
      default: "get",
      when: (a) => a.type === "proxy"
    },
    {
      type: "confirm",
      name: "cors",
      message: "Add CORS headers?",
      when: (a) => a.type === "proxy"
    }]).then((answers) => {
      this.props = answers;
      if (this.props.path && this.props.path.startsWith("/")) {
        this.props.path = this.props.path.substring(1);
      }
    });
  }

  updateServerless() {
    if (this.fs.exists("serverless.yml")) {
      const serverless = yaml.safeLoad(this.fs.read("serverless.yml"));

      serverless.functions[this.props.name] = {
        handler: `src/handlers/${this.props.name}.handler`
      };

      switch (this.props.type) {
        case "proxy":
          serverless.functions[this.props.name].events = [
            {
              http: {
                path: this.props.path,
                method: this.props.method,
                cors: this.props.cors ? this.props.cors : undefined,
              }
            }
          ];
          break;
      }

      this.props.serverless = serverless;
    }
  }

  updateOpenApi() {
    if (this.props.type === "proxy" && this.fs.exists("openapi.yml")) {
      const openapi = yaml.safeLoad(this.fs.read("openapi.yml"));

      openapi.paths[`/${this.props.path}`] = {
        [this.props.method]: {
          summary: this.props.name,
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "object"
                  }
                }
              }
            },
            "5XX": {
              "$ref": "#/components/responses/internalServerError"
            }
          }
        }
      }

      this.props.openapi = openapi;
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`src/handlers/handler.${this.props.type}.ts`),
      this.destinationPath(`src/handlers/${this.props.name}.ts`),
      { ...this.props, pascalName: changeCase.pascal(this.props.name) }
    );

    if (this.props.serverless) {
      this.fs.write(
        this.destinationPath("serverless.yml"),
        yaml.safeDump(this.props.serverless)
      );
    }

    if (this.props.openapi) {
      this.fs.write(
        this.destinationPath("openapi.yml"),
        yaml.safeDump(this.props.openapi)
      );
    }
  }
};
