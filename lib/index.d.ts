interface VoPayRequest {
	AccountID?: string; // Your account ID
	Key?: string; // API key for the account
	Signature?: string; // Hashed signature for the request
}

interface VoPayResponse {
	Success?: boolean; // True if the request was successful, false if it failed
	ErrorMessage ?: string; // Contains a description of the error if the request failed
}

//------------ Iq11 Endpoints Type Defintions ------------------ //

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

export interface TokenizeRequest extends VoPayRequest {
	AccountHolderName ?: string; // String that defines the account holder name.
	AccountNumber ?: string; // Customer’s bank account number for funds to be debited from.
	FinancialInstitutionNumber ?: string; // Three digit institution number for a Canadian bank.
	BranchTransitNumber ?: string; // Transit number for the customer’s account.
	IBAN ?: string; // International Bank Account Number
	ABARoutingNumber ?: string; // United State banks. ABA routing transit number
	SortCode ?: string; // UK banks. Six digit bank identification number.
}

export interface TokenizeResponse extends VoPayResponse {
	Token ?: string; // A codify variable that contains the bank account
}