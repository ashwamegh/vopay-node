# VoPay Node 
**[In Development]**

<img src="https://vopay.com/wp-content/themes/vopay2019/library/images/V-Vopay.svg" alt="VoPay Logo" width="150" />

<br/>

> This is an unofficial library to leverage VoPay REST API(s) for payment solutions.

[![npm](https://img.shields.io/npm/v/vopay-node.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/vopay-node)
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [IQ11](#iq11)
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

<a id="iq11" />

### IQ11 - [Official Docs](https://docs.vopay.com/v2/vopay-api-reference/ref#tag-iq11-methods)

<br/>

#### **Generate Embed URL** - [Official Docs](https://docs.vopay.com/v2/vopay-api-reference/ref#iq11generateembedurlpost)
<br/>

```javascript
await VoPayClient.iq11.generateEmbedURL({
	RedirectURL: "https://redirect.com/page?Token=1234"
})
```

<br/>

#### **Token Info** - [Official Docs](https://docs.vopay.com/v2/vopay-api-reference/ref#iq11tokeninfoget)

<br/>

```javascript
await VoPayClient.iq11.tokenInfo({
	Token: "IQ11_TOKEN"
})
```

<br/>

#### **Tokenize** - [Official docs](https://docs.vopay.com/v2/vopay-api-reference/ref#iq11tokenizepost)
<br/>

```javascript
await VoPayClient.iq11.tokenize()
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