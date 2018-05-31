var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    return this.prompt([{
      type: "input",
      name: "name",
      message: "Project name",
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
      "aws-sdk",
      "opiniated-lambda",
      "source-map-support"
    ],
    { "save": true });

    this.npmInstall([
      "@types/aws-lambda",
      "@types/chai",
      "chai",
      "mocha",
      "nyc",
      "serverless",
      "serverless-offline",
      "serverless-webpack",
      "ts-loader",
      "ts-node",
      "tslint",
      "typescript",
      "webpack"
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
    this.fs.copy(this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
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
    this.fs.copy(
      this.templatePath("src/handlers/health.ts"),
      this.destinationPath("src/handlers/health.ts"),
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
};
