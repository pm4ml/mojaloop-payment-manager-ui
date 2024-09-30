import { Selector } from "testcafe";

class CSRExchange {
    constructor() {
        this.csrExchange = Selector('div.progress-tab__description')
        this.endpointsSubMenu = Selector('#el-tabs')
        this.csrMenu = Selector('div.el-tabs__tab-items').child(0)
        this.sentCSRMenu = Selector('div.el-tabs__tab-items').child(1)

        // csrMenu Items
        this.autoGenerateButton = Selector('span.input-button__label').withText('Auto generate')
        this.submitButton = Selector('span.input-button__label').withText('Submit')
        this.chooseFileButton = Selector('span.input-button__label').withText('Choose File')


        // sent CSR Items
        this.testClientHeader = Selector('div.certificate-card__header__details__primary').withText('test_client')
        this.viewDetailsButton = Selector('span.input-button__label').withText('View Details')
        this.viewCSRButton = Selector('span.input-button__label').withText('View CSR')
        this.downloadCSRButton = Selector('span.input-button__label').withText('Download CSR')
        this.continueButton = Selector('span.input-button__label').withText('Continue')
        this.closeButton = Selector('span.input-button__label').withText('Close')
        this.downloadCSRButton = Selector('span.input-button__label').withText('Download CSR')

        //valid CSR Items
        this.validCSRTitle = Selector('div.el-modal__header-title').withText('Valid CSR')
        this.csrPass = Selector('div.certificate-validation__modal__item-message').withText('CSR passed verification')
        this.csrSign = Selector('div.certificate-validation__modal__item-message').withText('CSR has a valid Signature Algorithm : sha512WithRSAEncryption')
        this.csrKey = Selector('div.certificate-validation__modal__item-message').withText('CSR has a valid Public Key length of 4096')
        this.csrName = Selector('div.certificate-validation__modal__item-message').withText('CSR has all mandatory distiguished name attributes')   
        
        //view CSR Items
        this.csrTitle = Selector('div.el-modal__header-title').withText('CSR')
        this.csrCertBody = Selector('code.hljs')


    }
}

module.exports = CSRExchange;