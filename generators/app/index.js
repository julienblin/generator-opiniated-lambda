const Generator = require('yeoman-generator');
const figlet = require('figlet');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.log();
    this.log();
    this.log("            IIIIIIII                    ");
    this.log("            IIIIIIII                    ");
    this.log("                IIIII                   ");
    this.log("                IIIII,                  ");
    this.log("                 IIIII                  ");
    this.log("                 IIIIII                 ");
    this.log("                IIIIIII                 ");
    this.log("               IIIIIIIII                ");
    this.log("              IIIIIIIIIII               ");
    this.log("             IIIIII IIIII               ");
    this.log("            IIIIII  IIIII7              ");
    this.log("           IIIIII    IIIII,             ");
    this.log("          IIIIII      IIIII             ");
    this.log("         IIIIII       IIIIII  II        ");
    this.log("        IIIIII         IIIIIIIII,       ");
    this.log("       IIIIII          ,IIIIIIIII       ");
    this.log("      IIIIII            IIIIII          ");
    this.log();
    this.log();
  }

  prompting() {
    return this.prompt([{
      type: "input",
      name: "name",
      message: "Project name (kebab-case e.g. my-awesome-project)",
      default: this.appname,
      require: true
    },
    {
      type: "input",
      name: "description",
      message: "Description"
    }]).then((answers) => {
      this.props = answers;
      this.destinationRoot(`./${answers.name}`);
    });
  }

  dependencies() {
    this.npmInstall([
      "ajv@latest",
      "aws-sdk@latest",
      "axios@latest",
      "opiniated-lambda@latest",
      "source-map-support@latest"
    ],
    { "save": true });

    this.npmInstall([
      "@types/aws-lambda@latest",
      "@types/chai@latest",
      "@types/mocha@latest",
      "@types/nock@latest",
      "chai@latest",
      "mocha@latest",
      "nock@latest",
      "newman@latest",
      "nyc@latest",
      "serverless@latest",
      "serverless-offline@latest",
      "serverless-webpack@latest",
      "ts-loader@latest",
      "ts-node@latest",
      "tsconfig-paths@latest",
      "tsconfig-paths-webpack-plugin@latest",
      "tslint@latest",
      "tslint-no-unused-expression-chai@latest",
      "typescript@latest",
      "webpack@latest"
    ],
    { "save-dev": true });
  }
  
  writing() {
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("serverless.yml"),
      this.destinationPath("serverless.yml"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("serverless.resources.yml"),
      this.destinationPath("serverless.resources.yml"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("openapi.yml"),
      this.destinationPath("openapi.yml"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.props
    );
    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("local.config.json"),
      this.destinationPath("local.config.json")
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath("tslint.json"),
      this.destinationPath("tslint.json")
    );
    this.fs.copy(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );

    this.fs.copy(
      this.templatePath("build/api-version.js"),
      this.destinationPath("build/api-version.js")
    );
    this.fs.copy(
      this.templatePath("build/openapi.js"),
      this.destinationPath("build/openapi.js")
    );
    this.fs.copy(
      this.templatePath("build/source-map-install.js"),
      this.destinationPath("build/source-map-install.js")
    );
    this.fs.copy(
      this.templatePath("build/timestamp.js"),
      this.destinationPath("build/timestamp.js")
    );

    this.fs.copy(
      this.templatePath("src/config.ts"),
      this.destinationPath("src/config.ts"),
    );
    this.fs.copyTpl(
      this.templatePath("src/handlers/container.ts"),
      this.destinationPath("src/handlers/container.ts"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("src/handlers/health.ts"),
      this.destinationPath("src/handlers/health.ts"),
      this.props
    );

    this.fs.copy(
      this.templatePath("test/mocha.opts"),
      this.destinationPath("test/mocha.opts")
    );

    this.fs.copy(
      this.templatePath("test/unit/handlers/container-test.ts"),
      this.destinationPath("test/unit/handlers/container-test.ts")
    );
    this.fs.copy(
      this.templatePath("test/e2e/e2e.collection.json"),
      this.destinationPath("test/e2e/e2e.collection.json")
    );

    this.fs.copy(
      this.templatePath("vscode/extensions.json"),
      this.destinationPath(".vscode/extensions.json"),
    );
    this.fs.copy(
      this.templatePath("vscode/launch.json"),
      this.destinationPath(".vscode/launch.json"),
    );
    this.fs.copy(
      this.templatePath("vscode/settings.json"),
      this.destinationPath(".vscode/settings.json"),
    );
  }

  end() {
    this.log();
    this.log();
    this.log(figlet.textSync("Have fun!"));
    this.log();
    this.log();
    this.log(`cd ${this.destinationPath()}`);
    this.log("npm start -- local to start the project locally.");
    this.log("npm run to list all the availables scripts.");
    this.log();
  }
};
