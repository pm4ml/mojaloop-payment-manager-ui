import { Selector } from 'testcafe';

class EndPoints {
  constructor() {
    this.endpoints = Selector('div.progress-tab__description');
    this.endpointsSubMenu = Selector('#el-tabs');
    this.egressEndpoints = Selector('div.el-tabs__tab-items').child(0);
    this.ingressEndpoints = Selector('div.el-tabs__tab-items').child(1);
    this.hubEndpoints = Selector('div.el-tabs__tab-items').child(2);

    //egress Endpoints Page objects
    this.egressIPAddresslabel = Selector('label.mb-input__placeholder').nth(0);
    this.egressIPAddressValue = Selector('div.input-textfield__value__tokens').nth(0).child(0);
    this.egressPortslabel = Selector('label.mb-input__placeholder').nth(1);
    this.egressPortsValue = Selector('div.input-textfield__value__tokens').nth(1).child(0);
    this.confirmationButton = Selector('div.egress____buttons').child(0);
    this.addAdditionalIPAddressButton = Selector('div.egress____buttons').child(1);
    this.undoChangesButton = Selector('div.egress____buttons').child(2);
    this.addPort = Selector('span.input-button__label');

    //ingress Endpoints page objects
    this.ingressConfirmationButton = Selector('div.ingress____buttons').child(0);
    this.ingressAddAdditionalIPAddressButton = Selector('div.ingress____buttons').child(1);
    this.ingressUndoChangesButton = Selector('div.ingress____buttons').child(2);
    this.ingressURLLabel = Selector('label.mb-input__placeholder').nth(0);
    this.ingressURLValue = Selector('div.input-textfield__value__tokens').nth(0).child(0);
    this.ingressIPAddressLabel = Selector('label.mb-input__placeholder').nth(1);
    this.ingressPortLabel = Selector('label.mb-input__placeholder').nth(2);
    this.ingressIPAddressValue = Selector('div.input-textfield__value__tokens').nth(1).child(0);
    this.ingressPortValue = Selector('div.input-textfield__value__tokens').nth(2).child(0);

    //Hub Endpoints Page Objects
    this.hubEndpointsHubname = Selector('div.hub-endpoints__hub-name');
    this.hubEgressEndpointsTitle = Selector('div.hub-endpoints__body__section__title').nth(0);
    this.hubingressEndpointsTitle = Selector('div.hub-endpoints__body__section__title').nth(1);
    this.hubegressEndpointIPLabel = Selector('span.endpoint__entry__title').nth(0);
    this.hubegressEndpointIPValue = Selector('span.endpoint__entry__value').nth(0);
    this.hubegressEndpointPortsLabel = Selector('span.endpoint__entry__title').nth(1);
    this.hubegressEndpointPortsValue = Selector('span.endpoint__entry__value').nth(1);
    this.hubingressEndpointIPLabel = Selector('span.endpoint__entry__title').nth(3);
    this.hubingressEndpointIPValue = Selector('span.endpoint__entry__value').nth(3);
    this.hubingressEndpointPortsLabel = Selector('span.endpoint__entry__title').nth(4);
    this.hubingressEndpointPortsValue = Selector('span.endpoint__entry__value').nth(4);
    this.hubingressEndpointURLLabel = Selector('span.endpoint__entry__title').nth(2);
    this.hubingressEndpointURLValue = Selector('span.endpoint__entry__value').nth(2);
  }
}

module.exports = EndPoints;
