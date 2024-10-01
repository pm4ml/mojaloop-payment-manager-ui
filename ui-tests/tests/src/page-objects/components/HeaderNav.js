import { Selector } from "testcafe";

class HeaderNav {
    constructor () {
        this.navLink = Selector('#navbar__link');
        this.userIcon = Selector('#navbar__user__icon');
        this.userName = Selector('#navbar__user__name');
        this.userNameTooltip = Selector('#navbar__user__name .el-tooltip');
    };
}

module.exports = HeaderNav;