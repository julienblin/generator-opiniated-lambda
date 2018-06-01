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
      message: "Client name (kebab-case e.g. twitter-client)",
      require: true
    }]).then((answers) => {
      this.props = answers;
    });
  }

  installAxios() {
    this.npmInstall([
      "axios"
    ],
    { "save": true });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`src/clients/client.ts`),
      this.destinationPath(`src/clients/${this.props.name}.ts`),
      { ...this.props, pascalName: changeCase.pascal(this.props.name) }
    );
    this.fs.copyTpl(
      this.templatePath(`test/unit/clients/client-test.ts`),
      this.destinationPath(`test/unit/clients/${this.props.name}-test.ts`),
      { ...this.props, pascalName: changeCase.pascal(this.props.name) }
    );
  }

  end() {
    this.log(`Client ${this.props.name} has been generated with unit tests.`);
    this.log(`Don't forget to register it in the src/handlers/container.`);
    this.log(`Registration should use the dependencyErrorProxy to properly encapsulate error management, e.g.:`);
    this.log();
    this.log(`${changeCase.camel(this.props.name)}: ({ container }) => dependencyErrorProxy(new ${changeCase.pascal(this.props.name)}(container.configService()), "${changeCase.pascal(this.props.name)}"),`);
  }
};
