import { Selector } from "testcafe";

class Transfers {
    constructor () {
        this.transfersOverview = Selector('div.el').nth(0).child
        this.findaTransferButton = Selector('span.input-button__label')

        //Login Objects
        this.usernNameTextBox = Selector('#username')
        this.passWordTextBox = Selector('#password')
        this.submitButton = Selector('#kc-login')

        //Find a Transfer Popup window Page Objects
        this.ftTitle = Selector('div.el-modal__header-title')
        this.ftClosesmall = Selector('#close-small')
        this.ftPopupCloseButton = Selector('span.input-button__label').nth(3)

        //Basic filter
        this.basicfindaTransferTab = Selector('div.el-tabs__tab-items').child(0)
        this.transferIDTextBox = Selector('div.input-textfield__value__tokens').child(0)
        this.basicTransferTitle = Selector('span.data-label--large').nth(1)

        //Advanced Filter Page Objects
        this.advanceFilteringTab = Selector('div.el-tabs__tab-items').child(1)
        this.filterTransferLabel = Selector('span').withText('Filter transfers:')
        this.approximateTxfrLabel = Selector('span').withText('Approximate time of transfer')
        this.institutionLabel = Selector('div').withText('Contains Institution')
        this.institutionTextbox = Selector('div.input-textfield__value__tokens').child(0)
        this.transferStatusListLabel = Selector('div').withText('Transfer Status')
        // this.dateObject = Selector('div.el-tabs__tab__content')
        this.dateDropdownMenu = Selector('div.mb-input__content').nth(0).child(0)
        this.fromCalenderMenu = Selector('div.mb-input__content').nth(1).child(0)
        this.toCalenderMenu = Selector('div.mb-input__content').nth(2).child(0)
        this.fromCalenderValue = Selector('input.input-datepicker__value').nth(0)
        this.toCalenderValue = Selector('input.input-datepicker__value').nth(1)
        // this.customDropdownMenu = this.dateObject.find('div.mb-input__input input-select__value ')
        // this.customDropdownMenu = Selector('div').withText('Today').nth(0)
        // this.customDropdownMenu = Selector('div.input-select__component mb-input mb-input__borders mb-input__background mb-input__shadow mb-input--large').nth(0)
        this.customSelectLabel = Selector('div').withAttribute('label','Custom')
        this.todaySelectLabel = Selector('div').withAttribute('label','today')
        this.fourtyEightSelectLabel = Selector('div').withAttribute('label','Past 48 Hours')
        this.weekSelectLabel = Selector('div').withAttribute('label','1 week')
        this.monthSelectLabel = Selector('div').withAttribute('label','1 Month')
        // this.transferStatusMenu = Selector('div.mb-input__content').nth(4).child(1)
        this.transferStatusMenu = Selector('div.mb-input__inner-icon').nth(3)
        this.successSelectLabel = Selector('div').withAttribute('label','Success')
        this.pendingSelectLabel = Selector('div').withAttribute('label','Pending')
        this.errorSelectLabel = Selector('div').withAttribute('label','Error')
        
        

        //Find a Transfer results Page objects
        this.noresults = Selector('span').withText('No items')
        this.closefindTransferPage = Selector('svg.el-icon control-icon__icon').nth(6)
        this.ftPopupSubmitButton = Selector('span.input-button__label').withText('Find Transfers')
        this.backtoFilteringSubmitButton = Selector('span.input-button__label').withText('Back to filtering')
        this.transferIdList = Selector('span.el-datalist__link__content')

        //Find a transfer batch results page objects
        this.transferResults = Selector('.el-modal__body .el-scrollbox__content .el-datalist__rows .el-datalist__row')

        //Individual Transfer Details Page objects
        this.transferDetailTitle = Selector('div.el-modal__header-title').withText('Transfer Details')
        this.basicInfomationTab = Selector('div.el-tabs__tab-items').child(0)
        this.technicalDetailsTab = Selector('div.el-tabs__tab-items').child(1)

        //Basic Information Page Objects - Labels      
        this.transferIDLabel = Selector('div').withText('Transfer ID')
        this.transferStateLabel = Selector('div').withText('Transfer State')
        this.transferAmountLabel = Selector('div').withText('Amount')
        this.transferDateLabel = Selector('div').withText('Date Submitted')
        this.transferBatchLabel = Selector('div').withText('Batch')
        this.transferCurrencyLabel = Selector('div').withText('Currency')
        this.transferSenderLabel = Selector('div').withText('Sender')
        this.transferSenderDetailsLabel = Selector('div').withText('Sender Details')
        this.transferRecipientLabel = Selector('div').withText('Recipient')
        this.transferRecipientDetailsLabel = Selector('div').withText('Recipient Details')
        this.transferInstitutionLabel = Selector('div').withText('Institution')
        this.transferDirectionLabel = Selector('div').withText('Direction')

        //Basic Information Page Objects - TextBoxes
        this.transferID = Selector('div.input-textfield__value__tokens').nth(0).child(0)
        this.transferState = Selector('div.input-textfield__value__tokens').nth(1).child(0)
        this.transferBatch = Selector('div.input-textfield__value__tokens').nth(2).child(0)
        this.transferDateSubmitted = Selector('div.input-textfield__value__tokens').nth(3).child(0)
        this.transferAmount = Selector('div.input-textfield__value__tokens').nth(4).child(0)
        this.transferCurrency = Selector('div.input-textfield__value__tokens').nth(5).child(0)
        this.transferSender = Selector('div.input-textfield__value__tokens').nth(6).child(0)
        this.transferSenderDetails = Selector('div.input-textfield__value__tokens').nth(7).child(0)
        this.transferRecipient = Selector('div.input-textfield__value__tokens').nth(8).child(0)
        this.transferRecipientDetails = Selector('div.input-textfield__value__tokens').nth(9).child(0)
        this.transferInstitution = Selector('div.input-textfield__value__tokens').nth(10).child(0)
        this.transferDirection = Selector('div.input-textfield__value__tokens').nth(11).child(0)

        this.closeTransferDetailsButton = Selector('span.input-button__label').nth(4)

        //Technical Details Page Objects - Labels
        this.techSchemeTransferIDLabel = Selector('div').withText('Scheme Transfer ID')
        this.techTransactionIDLabel = Selector('div').withText('Transaction ID')
        this.techQuoteID = Selector('div').withText('Scheme Transfer ID')
        this.techHomeTransferIDLabel = Selector('div').withText('Home Transfer ID')
        this.techtransferStateLabel = Selector('div').withText('Transfer State')
        this.techViewMessageDetailsLabel = Selector('div').withText('View Message Details')
        this.techPartyInformationLabel = Selector('div').withText('Party Information')

        //Technical Details Textbox Values
        this.techSchemeTransferID = Selector('div.input-textfield__value__tokens').nth(0).child(0)
        this.techTransactionID = Selector('div.input-textfield__value__tokens').nth(1).child(0)
        this.techQuoteID = Selector('div.input-textfield__value__tokens').nth(2).child(0)
        this.techHomeTransferID = Selector('div.input-textfield__value__tokens').nth(3).child(0)
        this.techTransferState = Selector('div.input-textfield__value__tokens').nth(4).child(0)

        //Technical Details Page Objects - Buttons
        this.payerInfoButton = Selector('span.input-button__label').withText('Payer Information')
        this.payeeInfoButton = Selector('span.input-button__label').withText('Payee Information')
        this.partyLookupResponseButton = Selector('span.input-button__label').withText('Party Lookup Response')
        this.quoteRequestButton = Selector('span.input-button__label').withText('Quote Request')
        this.quoteResponseButton = Selector('span.input-button__label').withText('Quote Response')
        this.transferPrepareButton = Selector('span.input-button__label').withText('Transfer Prepare')
        this.transferFulfilButton = Selector('span.input-button__label').withText('Transfer Fulfil')
        this.transferviewErrorButton = Selector('span.input-button__label').nth(4)
        this.closeViewErrorPopupButton = Selector('span.input-button__label').nth(13)
        this.closeErroredTechnicalDetailsButton = Selector('span.input-button__label').nth(12)

        //This page object closes the Transfer Details when technical details is open
        this.closeTechnicalDetailsButton = Selector('span.input-button__label').nth(11)
        this.closeTechDetailsButtonPopupButton = Selector('span.input-button__label').nth(12)

        //Extension List Objects
        this.closePartyExtensionPopupButton = Selector('span.input-button__label').nth(14)
        this.partyExtLstTitle = Selector('div.el-modal__header-title').withText('Party Extension List')
        this.keyLabelInExtLst = Selector('.el-datalist__header-cell__label').withText('Key')
        this.valueLabelInExtLst = Selector('.el-datalist__header-cell__label').withText('Value')
        this.keyTextInExtLst = Selector('div.el-datalist__item-cell').nth(-2).child(0) 
        this.valueTextInExtLst = Selector('div.el-datalist__item-cell').nth(-1).child(0) 


        //This Page object can be used for any Close Button which pops from Party Information or View Message Details
        this.closePartyWithExtensionList = Selector('span.input-button__label').nth(13)
        

        //Party objects - the Labels are common between Payee and Payer information
        this.partyIDTypeLabel = Selector('div').withText('Id Type')
        this.partyValueLabel = Selector('div').withText('Id Value')
        this.partyDisplayNameLabel = Selector('div').withText('Display Name')
        this.partyFirstNameLabel = Selector('div').withText('First Name')
        this.partyMiddleNameLabel = Selector('div').withText('Middle Name')
        this.partyLastNameLabel = Selector('div').withText('Last Name')
        this.partyDOBLabel = Selector('div').withText('Date Of Birth')
        this.partyMerchantCodeLabel = Selector('div').withText('Merchant Classification Code')
        this.partyFSPIdLabel = Selector('div').withText('FSP Id')
        

        //Party Objects Text boxes - use this for both Payye and and Payer information
        this.partyIdType = Selector('div.input-textfield__value__tokens').nth(5).child(0)
        this.partyIdValue = Selector('div.input-textfield__value__tokens').nth(6).child(0)
        this.partyDisplayName = Selector('div.input-textfield__value__tokens').nth(7).child(0)
        this.partyFirstName = Selector('div.input-textfield__value__tokens').nth(8).child(0)
        this.partyMiddleName = Selector('div.input-textfield__value__tokens').nth(9).child(0)
        this.partyLastName = Selector('div.input-textfield__value__tokens').nth(10).child(0)
        this.partyDOB = Selector('div.input-textfield__value__tokens').nth(11).child(0)
        this.partyMerchantCode = Selector('div.input-textfield__value__tokens').nth(12).child(0)
        this.partyFSPId = Selector('div.input-textfield__value__tokens').nth(13).child(0)
        this.partyExtensionListButton = Selector('span.input-button__label').withText('View Extension List')
        this.partyDisabledExtensionListButton = Selector('button').withAttribute('disabled label','View Extension List')

        //Transfer Prepare Objects
        this.tpilpPacket = Selector('span').withText('"ilpPacket"')
        this.tpilpPacketValue = Selector('span').withText('"ilpPacket"').nextSibling(0)
        this.tpcondition = Selector('span').withText('"condition"')
        this.tpconditionValue = Selector('span').withText('"condition"').nextSibling(0)
        this.tpexpiration = Selector('span').withText('"expiration"')
        this.tpexpirationValue = Selector('span').withText('"expiration"').nextSibling(0)

        //Transfer Fulfil Objects
        this.tfcompletedTimestamp = Selector('span').withText('"completedTimestamp"')
        this.tftimeStampValue = Selector('span').withText('"completedTimestamp"').nextSibling(0)
        this.tftransferState = Selector('span').withText('"transferState"')
        this.tftransferStateValue = Selector('span').withText('"transferState"').nextSibling(0)
        this.tffulfilment = Selector('span').withText('"fulfilment"')
        this.tffulfilmentValue = Selector('span').withText('"fulfilment"').nextSibling(0)

        //Quote Request Objects
        this.qrquoteId = Selector('span').withText('"quoteId"')
        this.qrquoteIdValue = Selector('span').withText('"quoteId"').nextSibling(0)
        this.qrpayerpartyIdType = Selector('span').withText('"partyIdType"')
        this.qrpayerpartyIdTypeValue = Selector('span').withText('"partyIdType"').nextSibling(0)
        this.qrpayerpartyIdentifier = Selector('span').withText('"partyIdentifier"')
        this.qrpayerpartyIdentifierValue = Selector('span').withText('"partyIdentifier"').nextSibling(0)
        this.qramountTypeId = Selector('span').withText('"amountType"')
        this.qramountTypeValue = Selector('span').withText('"amountType"').nextSibling(0)
        this.qrcurrency = Selector('span').withText('"currency"')
        this.qrcurrencyValue = Selector('span').withText('"currency"').nextSibling(0)
        this.qramount = Selector('span').withText('"amount"').nth(1)
        this.qramountValue = Selector('span').withText('"amount"').nth(1).nextSibling(0)
        this.qrpayeepartyIdType = Selector('span').withText('"partyIdType"').nth(1)
        this.qrpayeepartyIdTypeValue = Selector('span').withText('"partyIdType"').nth(1).nextSibling(0)
        this.qrpayeepartyIdentifier = Selector('span').withText('"partyIdentifier"').nth(1)
        this.qrpayeepartyIdentifierValue = Selector('span').withText('"partyIdentifier"').nth(1).nextSibling(0)
        this.qrpayeefspId = Selector('span').withText('"fspId"').nth(1)
        this.qrpayeefspIdValue = Selector('span').withText('"fspId"').nth(1).nextSibling(0)

        //Quote Response Objects
        this.expiration = Selector('span').withText('"expiration"')
        this.expirationValue = Selector('span').withText('"expiration"').nextSibling(0)
        this.ilpPacket = Selector('span').withText('"ilpPacket"')
        this.ilpPacketValue = Selector('span').withText('"ilpPacket"').nextSibling(0)
        this.condition = Selector('span').withText('"condition"')
        this.conditionValue = Selector('span').withText('"condition"').nextSibling(0)

        //Party Lookup Response Objects
        this.plrpartyIdType = Selector('span').withText('"partyIdType"')
        this.plrpartyIdTypeValue = Selector('span').withText('"partyIdType"').nextSibling(0)
        this.plrpartyIdentifier = Selector('span').withText('"partyIdentifier"')
        this.plrpartyIdentifierValue = Selector('span').withText('"partyIdentifier"').nextSibling(0)
        this.plrfspId = Selector('span').withText('"fspId"')
        this.plrfspIdValue = Selector('span').withText('"fspId"').nextSibling(0)
        this.plrdateOfBirth = Selector('span').withText('"dateOfBirth"')
        this.plrdateOfBirthValue = Selector('span').withText('"dateOfBirth"').nextSibling(0)
        this.plrfirstName = Selector('span').withText('"firstName"')
        this.plrfirstNameValue = Selector('span').withText('"firstName"').nextSibling(0)
        this.plrlastName = Selector('span').withText('"lastName"')
        this.plrlastNameValue = Selector('span').withText('"lastName"').nextSibling(0)

        //Transfer Status count
        this.successfulCount = Selector('span.el-pill__label').nth(0)
        this.pendingCount = Selector('span.el-pill__label').nth(1)
        this.failedCount = Selector('span.el-pill__label').nth(2)
        this.totalErrorsCount = Selector('span').withText('Total Errors').nextSibling(0)
        this.totalTransferStatuses = Selector('span').withText('Total Transfer Statuses')

        //Transfers Overview
        this.transfersOverview = Selector('span').withText('Successful Transfers')
        this.successfulTransfers = Selector('span').withText('Successful Transfers')
        this.averageTransferTime = Selector('span').withText('Average Transfer Time (E2E)')
        this.successfulChart = Selector('#apexchartstransferxsuccessxpercxchart')
        this.averageTransferTimeChart = Selector('#apexchartstransferxavgxtimexchart')
        this.viewAllErrorsButton = Selector('span.input-button__label').withText('View All Errors')
        this.idFilterLabel = Selector('div').withText('ID')
        this.directionFilterLabel = Selector('div').withText('Direction')
        this.typeFilterLabel = Selector('div').withText('Type')
        this.valueFilterLabel = Selector('div').withText('Send Value')
        this.currencyFilterLabel = Selector('div').withText('Send Currency')
        this.receiveValueFilterLabel = Selector('div').withText('Receive Value')
        this.receiveCurrencyFilterLabel = Selector('div').withText('Receive Currency')
        this.errorTypeFilterLabel = Selector('div').withText('Error Type')
        this.DateFilterLabel = Selector('div').withText('Date')
    };
}

module.exports = Transfers;