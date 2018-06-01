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
      message: "Service name (kebab-case e.g. product-service)",
      require: true
    }]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`src/services/service.ts`),
      this.destinationPath(`src/services/${this.props.name}.ts`),
      { ...this.props, pascalName: changeCase.pascal(this.props.name) }
    );
    this.fs.copyTpl(
      this.templatePath(`test/unit/services/service-test.ts`),
      this.destinationPath(`test/unit/services/${this.props.name}-test.ts`),
      { ...this.props, pascalName: changeCase.pascal(this.props.name) }
    );
  }

  end() {
    this.log(`Service ${this.props.name} has been generated with unit tests.`);
    this.log(`Don't forget to register it in the src/handlers/container.`);
  }
};
