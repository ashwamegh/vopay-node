# VoPay Node 
**[In Development]**

<img src="https://vopay.com/wp-content/themes/vopay2019/library/images/V-Vopay.svg" alt="VoPay Logo" width="150" />

> This is an unofficial library to leverage VoPay REST API(s) for payment solutions.

[![npm](https://img.shields.io/npm/v/vopay-node.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/vopay-node)
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Partner](#partner)
  - [IQ11](#iq11)
  - [Account](#account)
  - [EFT](#eft)
- [Development](#development)

## Installation

```bash
npm i vopay-node
```
or
```bash
yarn add vopay-node
```
<br/>

## Usage

You will be needed to create a VoPay instance with the details provided by VoPay team.
Things you will need for the instance:

| Name      |
| ------------- |
| AccountID |
| ApiKey |
| ApiSecret |

<br/>

```javascript
const VoPay = require('vopay-node')

let VoPayClient = new VoPay({
	AccountID: "YOUR_ACCOUNT_ID",
	ApiKey: "YOUR_API_KEY",
	ApiSecret: "YOUR_API_SECRET"
})
```
<br/>

### Response Handling
`vopay-node` uses axios as HTTP client.

```javascript
// USING PROMISES
VoPayClient.iq11.generateEmbedURL({
	RedirectURL: "https://redirect.com/page?Token=1234"
})
.then(response => console.log(response))
.catch((error) => {
	console.log(error);
});

// USING ASYNC/AWAIT
const loadEmbedUrl = async () => {
	try {
		const embedUrl = await VoPayClient.iq11.generateEmbedURL({
			RedirectURL: "https://redirect.com/page?Token=1234"
		})
		console.log(embedUrl);
	} catch(error) {
		console.log(error);
	}
}
```
<br/>

## API Reference

All methods return a Promise.

> **In cases where you are needed to provide `AccountID`, `Key` and `Signature`. you can avoid adding that, since the library instance is already having them after you initialized it.**

<br/>

<a id="partner" />

### Partner - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#tag-partner-endpoints)

<br/>

#### **Create User Account** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountpost)
<br/>

> This endpoint is used to create a VoPay account. You will need to sign-up as a partner account in order to use this endpoint and start creating VoPay accounts for your users.

> This Endpoint does not mark the account as active, you will need to submit the rest of the required information in the POST /account/submit-extended-info endpoint

```javascript
// Check Official Docs for more fields
const { Success, ErrorMessage, AccountID, APISharedSecret, APIKey } = await VoPayClient.partner.createUserAccount({
	Name: "{Name}",
  	ClientAccountEnabled: "{ClientAccountEnabled}",
  	EmailAddress: "{EmailAddress}",
})
```

<br/>

#### **Get a list of User Accounts** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountget)
<br/>

> This endpoint is used to get a list of accounts created using a partner account. It will return the accounts data including shareholder, signing authority and balance information

```javascript
// Check Official Docs for more fields
const { Success, ErrorMessage, PartnerAccount, Accounts } = await VoPayClient.partner.accountLists()
```

<br/>

<a id="iq11" />

### IQ11 - [Official Docs](https://docs.vopay.com/v2/vopay-api-reference/ref#tag-iq11-methods)

<br/>

#### **Generate Embed URL** - [Official Docs](https://docs.vopay.com/v2/vopay-api-reference/ref#iq11generateembedurlpost)
<br/>

```javascript
// Check Official Docs for more fields
const { EmbedURL, Success, ErrorMessage } = await VoPayClient.iq11.generateEmbedURL({
	RedirectURL: "https://redirect.com/page?Token=1234"
})
```

<br/>

#### **Token Info** - [Official Docs](https://docs.vopay.com/v2/vopay-api-reference/ref#iq11tokeninfoget)

<br/>

```javascript
// Check Official Docs for more fields in response
const { MaskedAccount, Success, ErrorMessage, BankName } = await VoPayClient.iq11.tokenInfo({
	Token: "IQ11_TOKEN"
})
```

<br/>

#### **Tokenize** - [Official docs](https://docs.vopay.com/v2/vopay-api-reference/ref#iq11tokenizepost)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Token, Success, ErrorMessage } = await VoPayClient.iq11.tokenize()
```

<br/>


<a id="account" />

### Account - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#tag-account-methods)

<br/>

#### **Get Account Balance** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountbalanceget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { AccountBalance, Success, ErrorMessage } = await VoPayClient.account.balance({
	Currency: "{Currency}"
})
```

<br/>

#### **Get Account Transactions** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accounttransactionsget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Transactions, Success, ErrorMessage, NumberOfRecords } = await VoPayClient.account.transactions({
	StartDateTime: "{StartDateTime}",
	EndDateTime: "{EndDateTime}",
	Currency: "{Currency}",
	TransactionType: "{TransactionType}",
	TransactionID: "{TransactionID}",
	ClientReferenceNumber: "{ClientReferenceNumber}",
	ScheduledTransactionID: "{ScheduledTransactionID}",
	PayLinkStatus: "{PayLinkStatus}"
})
```

<br/>

#### **Cancel Transaction** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accounttransactionscancelpost)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID, TransactionStatus } = await VoPayClient.account.cancelTransaction({
	TransactionID: "{TransactionID}"
})
```

<br/>

#### **Set Webhook URL** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountwebhookurlpost)
> The purpose of the webhook URL is to notify users of any changes in transaction status.

<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage } = await VoPayClient.account.setWebhookURL({
	WebHookUrl: "{WebHookUrl}",
	Disabled: "{Disabled}"
})
```

<br/>

#### **Get Webhook URL** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountwebhookurlinfoget)

<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, WebHookURL } = await VoPayClient.account.getWebhookURL()
```

<br/>

#### **Test Webhook URL** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountwebhookurltestget)

<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage } = await VoPayClient.account.testWebhookURL()
```

<br/>

#### **Transfer funds to another VoPay Account** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accounttransfertopost)
> This method allows you to transfer funds between VoPay accounts.
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID } = await VoPayClient.account.transferAccountFundsTo({
	Amount: "{Amount}",
	Currency: "{Currency}",
	RecipientAccountID: "{RecipientAccountID}",
	ClientReferenceNumber: "{ClientReferenceNumber}",
	Notes: "{Notes}",
	ParentTransactionID: "{ParentTransactionID}",
	IdempotencyKey: "{IdempotencyKey}"
})
```

<br/>

#### **Transfer funds from another VoPay Account to your VoPay Account** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accounttransferfrompost)
> This method allows you to transfer funds from a pre-authorized VoPay account to your VoPay account.
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID } = await VoPayClient.account.transferAccountFundsFrom({
	Amount: "{Amount}",
	Currency: "{Currency}",
	DebitorAccountID: "{DebitorAccountID}",
	ClientReferenceNumber: "{ClientReferenceNumber}",
	Notes: "{Notes}",
	IdempotencyKey: "{IdempotencyKey}"
})
```

<br/>

#### **Set Up Auto Balance Transfer** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountautobalancetransferpost)
> This method allows you to set up an auto-balance transfer from your VoPay account to your linked bank account. The frequency available to set the auto-transfer can be daily, weekly, bi-weekly or monthly.
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage } = await VoPayClient.account.setupAutoBalanceTransfer({
	ScheduleStartDate: "{ScheduleStartDate}",
	AutoBalanceTransferAmount: "{AutoBalanceTransferAmount}",
	TypeOfFrequency: "{TypeOfFrequency}",
	EmailAddress: "{EmailAddress}",
	FirstName: "{FirstName}",
	LastName: "{LastName}",
	CompanyName: "{CompanyName}",
	Address1: "{Address1}",
	City: "{City}",
	Province: "{Province}",
	Country: "{Country}",
	PostalCode: "{PostalCode}",
	AccountNumber: "{AccountNumber}",
	FinancialInstitutionNumber: "{FinancialInstitutionNumber}",
	BranchTransitNumber: "{BranchTransitNumber}",
	FlinksAccountID: "{FlinksAccountID}",
	FlinksLoginID: "{FlinksLoginID}",
	Token: "{Token}",
	PlaidPublicToken: "{PlaidPublicToken}",
	PlaidAccessToken: "{PlaidAccessToken}",
	PlaidAccountID: "{PlaidAccountID}",
	PlaidProcessorToken: "{PlaidProcessorToken}",
	InveriteRequestGUID: "{InveriteRequestGUID}"
})
```

<br/>

#### **Get Auto Balance Transfer Details** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountautobalancetransferget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, AutoBalanceTransferAmount, NameOfFrequency,... } = await VoPayClient.account.getAutoBalanceTransferInfo()
```

<br/>

#### **Cancel Auto Balance Transfer** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#accountautobalancetransfercancelpost)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, Status } = await VoPayClient.account.cancelAutoBalanceTransfer()
```

<br/>

<a id="eft" />

### EFT - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#tag-electronic-funds-transfer-methods)

<br/>

#### **Fund Your Vopay Account** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftfundpost)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID } = await VoPayClient.eft.fundAccount({
	FirstName: "{FirstName}",
	LastName: "{LastName}",
	CompanyName: "{CompanyName}",
	DOB: "{DOB}",
	PhoneNumber: "{PhoneNumber}",
	Address1: "{Address1}",
	City: "{City}",
	Province: "{Province}",
	Country: "{Country}",
	PostalCode: "{PostalCode}",
	AccountNumber: "{AccountNumber}",
	FinancialInstitutionNumber: "{FinancialInstitutionNumber}",
	BranchTransitNumber: "{BranchTransitNumber}",
	Amount: "{Amount}",
	Currency: "{Currency}",
	ClientReferenceNumber: "{ClientReferenceNumber}",
	KYCPerformed: "{KYCPerformed}",
	KYCReferenceNumber: "{KYCReferenceNumber}",
	EmailAddress: "{EmailAddress}",
	IPAddress: "{IPAddress}",
	FlinksAccountID: "{FlinksAccountID}",
	FlinksLoginID: "{FlinksLoginID}",
	Token: "{Token}",
	PlaidPublicToken: "{PlaidPublicToken}",
	PlaidAccessToken: "{PlaidAccessToken}",
	PlaidAccountID: "{PlaidAccountID}",
	PlaidProcessorToken: "{PlaidProcessorToken}",
	InveriteRequestGUID: "{InveriteRequestGUID}",
	TransactionLabel: "{TransactionLabel}",
	Notes: "{Notes}",
	DelayBankingInfo: "{DelayBankingInfo}",
	IdempotencyKey: "{IdempotencyKey}"
})
```

<br/>

#### **Get Status of a Fund Transaction** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftfundstatusget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionStatus, SubTransactions } = await VoPayClient.eft.getFundTransactionStatus({
	TransactionID: "{TransactionID}"
})
```

<br/>

#### **Get Details of a Fund Transaction** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftfundtransactionget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionStatus, TransactionDateTime, Amount, SubTransactions } = await VoPayClient.eft.getFundTransactionInfo({
	TransactionID: "{TransactionID}"
})
```

<br/>

#### **Withdraw funds out of your VoPay account** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftwithdrawpost)
> This endpoint is used to take funds out of your VoPay account, and deposit them to the specified recipient’s bank account. In the below endpoint, either CompanyName OR FirstName and LastName must be provided.

> If either Token, Flinks (FlinksAccountID, FlinksLoginID), Inverite (InveriteRequestGUID), or Plaid (PlaidPublicToken/PlaidAccessToken, PlaidAccountID) is provided, then the FinancialInstitutionNumber, BranchTransitNumber, and AccountNumber will not be required.

> If the bank information is provided (FinancialInstitutionNumber, BranchTransitNumber, and AccountNumber), then the Address1, City, Province, Country, and PostalCode are required.
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID } = await VoPayClient.eft.withdraw({
	ClientAccountID: "{ClientAccountID}",
	FirstName: "{FirstName}",
	LastName: "{LastName}",
	CompanyName: "{CompanyName}",
	DOB: "{DOB}",
	PhoneNumber: "{PhoneNumber}",
	Address1: "{Address1}",
	City: "{City}",
	Province: "{Province}",
	Country: "{Country}",
	PostalCode: "{PostalCode}",
	AccountNumber: "{AccountNumber}",
	FinancialInstitutionNumber: "{FinancialInstitutionNumber}",
	BranchTransitNumber: "{BranchTransitNumber}",
	IBAN: "{IBAN}",
	ABARoutingNumber: "{ABARoutingNumber}",
	SortCode: "{SortCode}",
	Amount: "{Amount}",
	Currency: "{Currency}",
	ClientReferenceNumber: "{ClientReferenceNumber}",
	KYCPerformed: "{KYCPerformed}",
	KYCReferenceNumber: "{KYCReferenceNumber}",
	EmailAddress: "{EmailAddress}",
	IPAddress: "{IPAddress}",
	FlinksAccountID: "{FlinksAccountID}",
	FlinksLoginID: "{FlinksLoginID}",
	Token: "{Token}",
	PlaidPublicToken: "{PlaidPublicToken}",
	PlaidAccessToken: "{PlaidAccessToken}",
	PlaidAccountID: "{PlaidAccountID}",
	PlaidProcessorToken: "{PlaidProcessorToken}",
	InveriteRequestGUID: "{InveriteRequestGUID}",
	ParentTransactionID: "{ParentTransactionID}",
	TransactionLabel: "{TransactionLabel}",
	Notes: "{Notes}",
	DelayBankingInfo: "{DelayBankingInfo}",
	IdempotencyKey: "{IdempotencyKey}"
})
```

<br/>


#### **Get single withdraw transaction info** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftwithdrawtransactionget)
> This endpoint is used to look up details on a single withdraw transaction. Withdraw transactions debit funds from your account and deposit them into the customer's account.
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID, TransactionStatus, PayLinkDetails } = await VoPayClient.eft.getWithdrawTransactionInfo({
	TransactionID: "{TransactionID}"
})
```

<br/>

#### **Get single withdraw transaction status** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftwithdrawstatusget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, TransactionID, TransactionStatus, Timestamp } = await VoPayClient.eft.getWithdrawTransactionStatus({
	TransactionID: "{TransactionID}"
})
```

<br/>

#### **Get Failed Transactions** - [Official Docs](https://docs.vopay.com/vopay-api-reference/ref#eftfailuresget)
<br/>

```javascript
// Check Official Docs for more fields in response
const { Success, ErrorMessage, NumberOfRecords, FailedTransactions } = await VoPayClient.eft.getFailedTransactions({
	StartDateTime: "{StartDateTime}",
	EndDateTime: "{EndDateTime}"
})
```

<br/>



## Development

```bash
yarn install
```

<!--  ## Testing

```bash
yarn test
``` -->