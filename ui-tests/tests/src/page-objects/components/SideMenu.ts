import { Selector } from 'testcafe';

export const SideMenu = {
  transfersButton: Selector('.el-menu__item').withText('Transfers'),
  overviewButton: Selector('.el-menu__item').withText('Overview'),
  connectionButton: Selector('.el-menu__item').withText('Connection Wizard'),
};
