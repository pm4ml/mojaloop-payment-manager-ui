// Page Objects docs: https://devexpress.github.io/testcafe/documentation/guides/concepts/page-model.html

const HeaderNav = require('../components/HeaderNav');
const SideMenu = require('../components/SideMenu');
const EndPoints = require('../components/EndPoints');
const CSRExchange = require('../components/CSRExchange');
const Transfers = require('../components/Transfers');

class BasePage {
    constructor() {
        this.HeaderNav = new HeaderNav();
        this.SideMenu = new SideMenu();
        this.EndPoints = new EndPoints();
        this.CSRExchange = new CSRExchange();
        this.Transfers = new Transfers();
    };
}

module.exports = BasePage;
