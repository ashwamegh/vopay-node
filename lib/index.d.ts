export interface VoPayRequest {
	AccountID?: string; // Your account ID
	Key?: string; // API key for the account
	Signature?: string; // Hashed signature for the request
}

export interface VoPayResponse {
	Success?: boolean; // True if the request was successful, false if it failed
	ErrorMessage ?: string; // Contains a description of the error if the request failed
}

export interface VoPayProfileInfo {
	FirstName?: string; // Recipient’s first name
	LastName?: string; // Recipient’s last name
	EmailAddress?: string; // Recipient’s email address.
	CompanyName?: string; // Company’s name
	DOB?: string; // Date of Birth, in date format YYYY-MM-DD. For example: 1960-01-15
	PhoneNumber?: string; // Recipient’s phone number. (Digits only – no parentheses or dashes allowed.)
	Address1?: string; // Recipient’s address line 1
	Address2?: string; // Customer’s address line 2
	City?: string; // Recipient’s city
	Province?: string; // Recipient’s province specified using two character abbreviation (eg. BC, AB)
	Country?: string; // Recipient’s country specified using full country name or ISO 3166-1 alpha-2 code.
	PostalCode?: string; // Recipient’s postal code.
	IPAddress?: string; // Recipient’s IP Address.
}

export interface VoPayBankDetails {
	AccountHolderName ?: string; // String that defines the account holder name.
	AccountNumber?: string; // Recipient’s bank account number. This is the account that funds will be deposited into.
	FinancialInstitutionNumber?: string; // Canadian banks. Three digit institution number.
	BranchTransitNumber?: string; // Canadian banks. Transit number for the Recipient’s account.
	IBAN?: string; // International Bank Account Number
	ABARoutingNumber?: string; // United State banks. ABA routing transit number
	SortCode?: string; // UK banks. Six digit bank identification number.
	Currency?: string; // 3 character currency code for the currency to fetch transactions for. If this is not specified the transaction will use the account’s local currency. NOTE: Currently the eft/withdraw API endpoint only supports CAD and USD transactions
}

export interface VoPayThirdPartyDetails {
	FlinksAccountID?: string; // Used by clients with a Flinks account
	FlinksLoginID?: string; // Used by clients with a Flinks account
	Token?: string; // Your iQ11 Token that has been generated using Custom Iframe. See iQ11 API Endpoints.
	PlaidPublicToken?: string; // Used by clients with a Plaid account
	PlaidAccessToken?: string; // Used by clients with a Plaid account
	PlaidAccountID?: string; // Used by clients with a Plaid account
	PlaidProcessorToken?: string; // Used by clients with a Plaid account. If you use this field PlaidPublicToken, PlaidAccessToken, and PlaidAccountID are not neccesary
	InveriteRequestGUID?: string; // Used by clients with an Inverite account
}


//---------------------------------------------------------------------//
//																	   //
//																	   //
//					IQ11 ENDPOINTS TYPE DEFINITIONS					   //
//																	   //
//																	   //
//																	   //
//---------------------------------------------------------------------//

export interface GenerateEmbedURLFormData extends VoPayRequest {
	RedirectURL: string; // URL to redirect to after the customer logs in to their online banking account. The bank account token will be passed as a GET parameter, for example https://redirect.com/page?Token=1234
	CompanyName?: string; // Name of the Company
	BGColor ?: string; // Hexadecimal color value of the background color of an iframe
	ForegroundColor ?: string // Hexadecimal color value of the foreground color of an iframe
	Language ?: string // Language of iQ11 iFrame- en (English) or fr (French). Default value is en (English)
	RedirectMethod ?: string; // This parameter accepts InnerRedirect, OuterRedirect, and JavascriptMessage as parameter values.
	ConsentMessage ?: string; // Used to control which consent messages are displayed during the iQ11 bank login process. Allowed parameter values are None, TransactionHistory, AccountInfo and AccountNumber. If multiple messages are being specified a comma separated list must be provided, for example “AccountNumber,AccountInfo”. Specifying None will completely remove the consent message page from the login process. The default value is to show all consent messages.
	AccountSelectionMethod ?: string; // This parameter accepts online and manual as parameter values.
	TermsAndConditions ?: string; // Used to add your own terms and conditions
	Country ?: string; // This parameter accepts country codes [CA, US]. Default is CA
	Version ?: string; // This parameter only accepts v1 and v2 as values. Default is v1
}

export interface GenerateEmbedURLFormDataResponse extends VoPayResponse {
	EmbedURL ?: string; // Custom generated iQ11 iframe url for users to use
}

export interface TokenInfoRequest extends VoPayRequest {
	Token: string; // Your iQ11 Token that has been generated using Custom iFrame
}

export interface TokenInfoResponse extends VoPayResponse {
	MaskedAccount ?: string; // The last four digits of a Bank account number. For example: ****1234
	Bank ?: string; // Three digit institution number of a Canadian bank.
	FullName ?: string; // Full name of a bank account owner.
	BankName ?: string; // Name of a Canadian Bank.
}

export interface TokenizeRequest extends VoPayRequest, VoPayBankDetails {
}

export interface TokenizeResponse extends VoPayResponse {
	Token ?: string; // A codify variable that contains the bank account
}


//---------------------------------------------------------------------//
//																	   //
//																	   //
//					ACCOUNT ENDPOINTS TYPE DEFINITIONS				   //
//																	   //
//																	   //
//																	   //
//---------------------------------------------------------------------//

export interface AccountBalanceRequest extends VoPayRequest {
	Currency?: string; // 3 character currency code for the currency to fetch transactions for. If this is not specified it will be defaulted to the account’s local currency (generally CAD).
}

interface AccountBalance {
	Currency: string; // 3 character currency code for the balance being returned.
	AccountBalance?: number; // Indicates the total current account balance, including pending funds.
	SecurityDeposit: number; // Indicates the portion of the account balance which is being held as a security deposit against returned or fraudulent transactions.
	AvailableImmediately: number; //Indicate the portion of the account balance that is available immediately
	PendingBalance?: number; // Indicates the portion of the account balance which is pending due to in-progress EFT transactions.
	AvailableBalance?: number; // Indicates the portion of the account balance which is currently available for use. This is calculated by taking the AccountBalance and subtracting the PendingFunds and SecurityDeposit amounts.
}

export interface AccountBalanceResponse extends VoPayResponse, AccountBalance {
	PendingFunds: number; // Indicates the portion of the account balance which is pending due to in-progress EFT transactions.
	AvailableFunds: number; // Indicates the portion of the account balance which is currently available for use. This is calculated by taking the AccountBalance and subtracting the PendingFunds and SecurityDeposit amounts.
}

export interface AccountTransactionsRequest extends VoPayRequest {
	StartDateTime: string; // Return transactions that occurred on or after this date/time. Can be specified in either YYYY-MM-DD HH:MM:SS or YYYY-MM-DD format.
	EndDateTime: string; // Return transactions that occurred on or before this date/time. Can be specified in either YYYY-MM-DD HH:MM:SS or YYYY-MM-DD format.
	Currency?: string; // 3 character currency code for the currency to fetch transactions for. If this is not specified it will be defaulted to the account’s local currency (generally CAD).
	TransactionType?: string; // Specifies the type of transaction to return, for example “EFT Funding”, “EFT Withdrawal”, “Fee”.
	TransactionID?: number; // Searches for a transaction with the specified transaction ID, including any related child transactions which may exist.
	ClientReferenceNumber?: string; // Searches for transactions with the specified client reference number.
	ScheduledTransactionID?: string; // Id of the schedule transaction to search
	PayLinkStatus?: string; // Find the list of transactions with the particular status. Accepted values are: pending, cancelled, completed
}

interface PayLinkDetail {
	FirstName?: string; // Customer’s first name
	LastName?: string; // Customer’s last name
	EmailAddress?: string; // Recipient’s email address.
	InvoiceNumber?: string; // Invoice number
	Note?: string; // If applicable, notes giving context to the transaction.
	SenderName?: string; // Sender’s full name.
	PayLinkStatus?: string; // Status of the Paylink request
	FailureReason?: string; // Detailed description of why the paylink request failed.
	PayLinkCreated?: string;
}

interface TransactionInfo {
	TransactionID?: number; // Unique ID for the Transaction
	TransactionDateTime?: string; // The timestamp on which the transaction occurred.
	TransactionType?: string; // Specifies the type of transaction, for example “EFT Funding”, “EFT Withdrawal”, “Fee”.
	TransactionStatus?: string; // A message indicating the current transaction status. Statuses are: pending, in progress, successful, failed, cancelled
	Notes?: string; // If applicable, notes giving context to the transaction.
	DebitAmount?: number; // The dollar amount by which this transaction debited funds from your account balance. If DebitAmountis set, CreditAmount will be null.
	CreditAmount?: number; // The dollar amount by which this transaction credited funds to your account balance. If CreditAmount is set, DebitAmount will be null.
	Currency?: string; // 3 character currency code.
	Amount?: number;// The dollar amount of the withdraw transaction. This is the amount to be deposited into the recipient’s bank account. Previous versions of the API used DollarAmount as the label for this field.
	HoldAmount?: number; // The dollar amount of the funds from this transaction which are temporarily on hold. This is only applicable for transactions where CreditAmount is set.
	LastModified?: string; // This timestamp indicates when the transaction record was last modified. In normal circumstances the transaction record will only be modified when the HoldAmount is changed.
	ParentTransactionID?: string; // If a transaction directly relates to another transaction, this value will be set to link the new transaction to its parent. For example if an EFT comes back with insufficient funds a new transaction will be created referencing the original transaction as its parent.
	ChildTransactionIDs?: number; // If this transaction directly relates to any other transactions this will contain a collection of child transaction IDs. For example if an EFT is reversed due to insufficient funds the original transaction record will reference the new transaction as a child.
	ClientReferenceNumber?: string; // The optional reference number which was set when the transaction was created.
	ScheduledTransactionID?: number; // ID of the scheduled transaction
	PayLinkDetails?: [PayLinkDetail] // Collection of Pay Link Detail data

	// Added for withdraw transactions
	DollarAmount?: number; // The dollar amount of the failed transaction. Previous versions of the API used DollarAmount as the label for this field.
	ErrorCode?: string; // Detail error code of the failure.
	FailureReason?: string; // Detailed description of why the transaction failed. Transactions which have failed cannot be modified, a new fund or withdraw transaction must be created if you wish to re-attempt the transaction.
}

export interface AccountTransactionsResponse extends VoPayResponse {
	NumberOfRecords?: number; // Total number of transaction records returned
	Transactions?: [TransactionInfo]; // Collection of TransactionInfo data

}

export interface AccountCancelTransactionRequest extends VoPayRequest {
	TransactionID: number; // The unique ID for the transaction
}

export interface AccountTransactionResponse extends VoPayResponse {
	TransactionID?: number; // The unique ID for the transaction
	TransactionStatus?: string; // A message indicating the current transaction status - cancelled
	Timestamp?: string; // The timestamp when the transaction status was last modified
}

export interface AccountWebhookURLRequest extends VoPayRequest {
	WebHookUrl?: string; // URL where the users want us to send their notifications. This parameter has to be a valid URL. If the field Disabled is added, this field can be optional; otherwise, it will consider as mandatory
	Disabled?: boolean; // If this parameter is present WebHookUrl is not mandatory.
}

export interface AccountWebhookURLInfo extends VoPayResponse {
	WebHookURL?: string; // Webhook URL, is the url is not setup it will return empty
}

export interface AccountTransferFundsRequest extends VoPayRequest {
	Amount: number; // The amount to debit from the customer’s bank account. Previous versions of the API used DollarAmount as the label for this field.
	Currency?: string; // 3 character currency code for the currency to fetch transactions for. If this is not specified the transaction will use the account’s local currency (generally CAD).
	ClientReferenceNumber?: string; // An optional reference number to associate with the transfer
	Notes?: string; // An optional note to associate with the transaction.
	IdempotencyKey?: string; // A unique key which the server can use to recognize and reject subsequent retries of the same request.
}

export interface AccountTransferFundsToRequest extends AccountTransferFundsRequest {
	RecipientAccountID: number; // Account ID of the account for which you want to transfer funds to.
	ParentTransactionID?: string; // The parent transaction where the transfer-to will be linked to, can become a split payment with multiple transfers. When funds of the parent transaction have been released the system will generate the distributions of these funds automatically.
}

export interface AccountTransferFundsFromRequest extends AccountTransferFundsRequest {
	DebitorAccountID: number; // Account ID of the account for which you want to transfer funds from. The account you wish to transfer funds from must be a sub account of your account or from another sub account with a shared parent account.
}

export interface AccountTransferFundsResponse extends VoPayResponse {
	TransactionID?: number; // The unique ID of the debit transaction associated with this transfer.
}

export interface AccountAutoBalanceTransferSetupRequest extends VoPayRequest, VoPayProfileInfo, VoPayBankDetails, VoPayThirdPartyDetails {
	ScheduleStartDate: string; // Date from which the schedule will be started
	AutoBalanceTransferAmount: number; // The minumum amount to have in your VoPay account to initiate this scheduled.
	TypeOfFrequency: string; // Type of frequency that you which to receive the deposit, the posibles values are: daily, weekly, biweekly, monthly
}

export interface AccountAutoBalanceTransferInfo extends VoPayResponse, VoPayProfileInfo, VoPayThirdPartyDetails, VoPayBankDetails {
	ScheduleStartDate?: string; // Date from which the auto transfer will be started
	Description?: string; // Description of the of the auto transfer balance
	NameOfFrequency?: string; //The frequency of the auto transfer (recurring)
	AutoBalanceTransferAmount?: number; // The minumum amount to have in your VoPay account to start the auto transfer balance
	Status?: string; // A message indicating the current status of the auto transfer. Statuses are: cancelled, completed, or in progress
}

export interface AutoBalanceTransferCancellationResponse extends VoPayResponse {
	Status?: string; // Contains the new status of the auto transfer balance
}


//---------------------------------------------------------------------//
//																	   //
//																	   //
//					EFT ENDPOINTS TYPE DEFINITIONS				   	   //
//																	   //
//																	   //
//																	   //
//---------------------------------------------------------------------//

export interface EFTFundVopayAccountRequest extends VoPayRequest, VoPayProfileInfo, VoPayThirdPartyDetails {
	AccountNumber: number; // Customer’s bank account number for funds to be debited from.
	FinancialInstitutionNumber: number; // Three digit institution number for a Canadian bank.
	BranchTransitNumber: number; // Transit number for the customer’s account.
	Amount: number; // The amount to debit from the customer’s bank account. Previous versions of the API used DollarAmount as the label for this field.
	Currency?: string; // 3 character currency code for the currency to fetch transactions for. If this is not specified the transaction will use the account’s local currency. NOTE: Currently the eft/fund API endpoint only supports CAD and USD transactions.
	ClientReferenceNumber?: string; // An optional reference number to associate with the transaction.
	KYCPerformed?: boolean; // An optional flag that can be used to communicate to us that you have performed KYC on the customer. If you are subscribed to VoPay’s optional KYC service, excluding this parameter or specifying a value of false will automatically trigger the EBVS and watch list screening.
	KYCReferenceNumber?: string; // Can be optionally set if you have a reference number which was returned by your KYC provider.
	IPAddress?: string; // Customer’s IP Address.
	TransactionLabel?: string; // TransactionLabel overrides originator short name
	Notes?: string; // An optional note to associate with the transaction.
	DelayBankingInfo?: boolean; // Option to create a transaction without providing bank information. This option is only available for PayLink functionality.
	IdempotencyKey?: string; // A unique key which the server can use to recognize and reject subsequent retries of the same request.
}

export interface EFTVopayTransactionResponse extends VoPayResponse {
	TransactionID?: number; // This ID should be saved as it is required in order to look up status information on the transaction.
}

export interface EFTFundStatusRequest extends VoPayRequest {
	TransactionID: number; // The unique ID of the transaction
}

interface EFTSubTransaction extends VoPayProfileInfo {
	TransactionID?: number; // The unique ID of the transaction
	TransactionStatus?: string; // A message indicating the current transaction status. Statuses are: pending, in progress, successful, failed, cancelled, waiting on required transaction
	Timestamp?: string; // The timestamp when the transaction status was last modified
	TransactionDateTime?: string; // The timestamp when the transaction was created
	Amount?: number; // The dollar amount of the fund transaction. This is the amount that was withdrawn from the customer’s bank account. Previous versions of the API used DollarAmount as the label for this field.
	Currency?: string; // The currency for the transaction.
	HoldAmount?: number; // Indicates if any of the funds that were credited to your account are still being held.
	LastModified?: string; // This timestamp indicates when the transaction record was last modified. In normal circumstances the transaction record will only be modified when the status of the transaction changes or the HoldAmount is changed.
	FinancialInstitutionNumber?: string; // Three digit institution number for a Canadian bank.
	BranchTransitNumber?: string; // Transit number for the customer’s account.
	AccountNumber?: string; // Customer’s bank account number that funds were debited from.
	ClientReferenceNumber?: string; // An optional reference number which was associated with the transaction.
	KYCPerformed?: boolean; // Indicates if you had communicated to us that KYC was performed on the customer, or if KYC was performed by VoPay through the optional KYC service.
	KYCReferenceNumber?: string; // Contains the optional reference number which was provided when the transaction was created, or the EBVS transaction ID if KYC was performed by VoPay through the optional KYC service.
	ScheduledTransactionID?: number; // Id of the scheduled transaction. This field only will be displayed if the scheduled transaction exists.
}
export interface EFTFundStatusResponse extends VoPayResponse {
	TransactionID?: number; // The unique ID of the transaction
	TransactionStatus?: string; // A message indicating the current transaction status. Statuses are: pending, in progress, successful, failed, cancelled
	Timestamp?: string; // The timestamp when the transaction status was last modified
	SubTransactions?: [EFTSubTransaction];
}

export interface EFTFundTransactionInfo extends VoPayRequest, EFTSubTransaction {
	SubTransactions?: [EFTSubTransaction]; // Collection of sub-transactions related to the main transaction
	PayLinkDetails: [PayLinkDetail]; // Collection of TransactionInfo data
}


export interface EFTWithdrawRequest extends VoPayRequest, VoPayProfileInfo, VoPayBankDetails, VoPayThirdPartyDetails {
	ClientAccountID?: string; // Client Account ID
	Amount: number; // The amount in the specified currency to deposit into the recipient’s bank account. Previous versions of the API used DollarAmount as the label for this field.
	ClientReferenceNumber?: string; // An optional reference number to associate with the transaction.
	KYCPerformed?: boolean; // An optional flag that can be used to communicate to us that you have performed KYC on the customer. If you are subscribed to VoPay’s optional KYC service, excluding this parameter or specifying a value of false will automatically trigger the EBVS and watch list screening.
	KYCReferenceNumber?: string; // Can be optionally set if you have a reference number which was returned by your KYC provider.
	ParentTransactionID?: string; // The parent transaction where the withdrawal will be linked to, can become a split payment with multiple withdrawals. When funds of the parent transaction have been released the system will generate the distributions of these funds automatically.
	TransactionLabel?: string; // TransactionLabel overrides originator short name
	Notes?: string; // An optional note to associate with the transaction.
	DelayBankingInfo?: boolean; // Option to create a transaction without providing bank information. This option is only available for PayLink functionality.
	IdempotencyKey?: string; // sA unique key which the server can use to recognize and reject subsequent retries of the same request.
}

export interface EFTWithdrawTransactionResponse extends VoPayResponse, TransactionInfo, VoPayBankDetails {
	ClientReferenceNumber?: string; // An optional reference number which was associated with the transaction.
	KYCPerformed?: string; // Indicates if you had communicated to us that KYC was performed on the recipient, or if KYC was performed by VoPay through the optional KYC service.
	KYCReferenceNumber?: string; // Contains the optional reference number which was provided when the transaction was created, or the EBVS transaction ID if KYC was performed by VoPay through the optional KYC service.
}

export interface EFTFailedTransactionsRequest extends VoPayRequest {
	StartDateTime: string; // Start of date range to query for any failed transactions
	EndDateTime: string; // End of date range to query for any failed transactions
}

export interface EFTFailedTransactionsResponse extends VoPayResponse {
	NumberOfRecords?: number; // Total number of failed transaction records returned
	FailedTransactions?: [TransactionInfo]; // Collection of TransactionInfo data
}


//---------------------------------------------------------------------//
//																	   //
//																	   //
//					PARTNER ENDPOINTS TYPE DEFINITIONS				   //
//																	   //
//																	   //
//																	   //
//---------------------------------------------------------------------//

export interface NewUserAccountRequest extends VoPayRequest {
	Name: string; // Name of the person/company you are going to create an account for
	EmailAddress: string; // Email address of the person/company you are creating an account for
	ClientAccountEnabled?: boolean; // This is an optional parameter to enable client accounts
}

export interface NewUserAccountResponse extends VoPayResponse {
	Message?: string; // Contains a description of the successful message
	AccountID?: string; // Account Name of the new user created in the endpoint
	APISharedSecret?: string; // Hashed signature for the request
	APIKey?: string; // The API key for the sub account
}

interface ShareHolderAndSigningAuthority {
	ID?: number; // Shareholder/Signing Authority ID
	FullName?: string; // Shareholder/Signing Authority First name and last name
	Ownership?: string; // Percentage of ownership only if is greater than 20%
	Occupation?: string; // Shareholder’s/Signing Authority's occupation
	HomeAddress?: string; // Shareholder’s/Signing Authority's home address
	DateAdded?: string;
	EmailAddress?: string; // Shareholder’s/Signing Authority's email address
}

export interface PartnerSubAccount {
	LegalBusinessName?: string; // Legal Business Name
	AccountName?: string; // Account name of the account
	AccountID?: string; // Account ID of the account
	OrginatorName?: string; // Short Name of the company to identify themselves in the documents
	OriginatorShortName?: string; // Short Name of the company to identify themselves in the documents (max 15 chars)
	Email?: string; // Account email address
	Phone?: number; // Account's phone number
	Fax?: string; // Account's fax number
	City?: string; // Account's city
	Province?: string; // Account's province specified using two character abbreviation (eg. BC, AB)
	Country?: string; // Account's country specified using full country name or ISO 3166-1 alpha-2 code.
	PostalCode?: string; // Account's postal code.
	Address?: string; // Account's address line
	FlinksUrl?: string; // The Flinks URL
	WebhookUrl?: string; // URL where the users want us to send their notifications.
	IsActive?: boolean; // Is the account active
	GCMEnabled?: boolean; // Permission related to Global cash management
	EFTCollectEnabled?: boolean; // Permission related to EFT Fund
	EFTSendEnabled?: boolean; // Permission related to EFT Withdraw
	USDEFTCollectEnabled?: boolean; // Permission related to EFT Fund using USD currency
	USDEFTSendEnabled?: boolean; // Permission related to EFT Withdraw using USD currency
	VisaDirectEnabled?: boolean; // Permission related to Visa Direct
	InteracMoneyRequestEnabled?: boolean; // Permission related to Interac Money request
	InteracBulkPayoutEnabled?: boolean; // Permission related to Interac bulk payout
	PayLinkEnabled?: boolean; // Permission related to Paylink
	Balances?: [AccountBalance]; // Collection of the balances of the account
	ShareHolders?: [ShareHolderAndSigningAuthority]; // Collection of Share Holders per account
	SigningAuthorities?: [ShareHolderAndSigningAuthority]; // Collection of Signing Authorities per account
}

export interface PartnerAccountLists extends VoPayResponse {
	PartnerAccount?: string; // Partner account name
	Accounts?: [PartnerSubAccount]; //Collection of subaccounts per father account
}

