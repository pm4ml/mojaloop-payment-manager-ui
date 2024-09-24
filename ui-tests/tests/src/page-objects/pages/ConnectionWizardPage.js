const BasePage = require("./BasePage");
const ConnectionAccordion = require('../components/ConnectionAccordion');

class ConnectionWizardPage extends BasePage {
    constructor() {
        super();
        this.ConnectionAccordion = new ConnectionAccordion();
    };
}

module.exports = new ConnectionWizardPage();