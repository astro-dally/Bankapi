# 🏦 Bank API

A modern, lightweight API for retrieving Indian bank and branch information. Built with Next.js and optimized for quick, efficient queries.

![GitHub license](https://img.shields.io/github/license/astro-dally/Bankapi)
![GitHub last commit](https://img.shields.io/github/last-commit/astro-dally/Bankapi)

## 📋 Overview

This API provides a simple and efficient way to access Indian bank and branch information. It's particularly useful for:

- Fintech applications requiring bank validation
- Form autocomplete for bank and branch fields
- IFSC code validation and lookup
- Financial applications needing bank branch details

## 🔍 Features

- **Bank Search**: Find banks by name with fuzzy matching
- **Branch Lookup**: Get detailed branch information filtered by bank
- **Fast Response**: Optimized for quick queries and low latency
- **Comprehensive Data**: Includes IFSC codes, MICR, address, and contact information
- **CORS Enabled**: Ready for use in web applications

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📊 Data Sources

The bank and branch data is sourced from the following Razorpay IFSC repositories:

- **Bank Names**: [razorpay/ifsc/banknames.json](https://github.com/razorpay/ifsc/blob/master/src/banknames.json)
- **Branch Data**: [razorpay/ifsc-api/data](https://github.com/razorpay/ifsc-api/tree/master/data)

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/astro-dally/Bankapi.git
   cd Bankapi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. The API will be accessible at `http://localhost:3000`

## 📡 API Reference

### Bank Search

Retrieves a list of banks matching a query string.

```
GET /api/banks?q={query}
```

#### Parameters

| Parameter | Type   | Required | Description                                |
|-----------|--------|----------|--------------------------------------------|
| q         | string | Yes      | Search query for bank name (min 2 chars)   |

#### Response

```json
[
  {
    "code": "HDFC",
    "name": "HDFC Bank"
  },
  {
    "code": "HDFB",
    "name": "HDFC Bank Ltd"
  }
]
```

### Branch Search

Retrieves branch information for a specific bank and branch name.

```

GET /api/branches?bank={bankCode}&branch={branchQuery}

```

#### Parameters

| Parameter | Type   | Required | Description                                |
|-----------|--------|----------|--------------------------------------------|
| bank      | string | Yes      | Bank code (e.g., "HDFC")                   |
| branch    | string | Yes      | Branch name or location (min 2 chars)      |

#### Response

```json
[
  {
    "BANK": "HDFC Bank",
    "IFSC": "HDFC0000002",
    "MICR": "400240004",
    "BRANCH": "MUMBAI - KHAR WEST",
    "ADDRESS": "SWAGATAM,OPP. KHAR POLICE STATION,S.V.ROAD, KHAR WEST MUMBAI MAHARASHTRA400 052",
    "STATE": "MAHARASHTRA",
    "CONTACT": "+919890603333",
    "UPI": true,
    "RTGS": true,
    "CITY": "GREATER MUMBAI",
    "CENTRE": "MUMBAI",
    "DISTRICT": "MUMBAI",
    "NEFT": true,
    "IMPS": true,
    "SWIFT": "HDFCINBB",
    "ISO3166": "IN-MH"
  }
]
```

## 🔄 Response Fields

### Bank Object

| Field | Type   | Description                     |
|-------|--------|---------------------------------|
| code  | string | Bank code (e.g., "HDFC")        |
| name  | string | Full bank name                  |

### Branch Object

| Field    | Type    | Description                                |
|----------|---------|-------------------------------------------|
| BANK     | string  | Bank name                                 |
| IFSC     | string  | IFSC code                                 |
| MICR     | string  | MICR code                                 |
| BRANCH   | string  | Branch name                               |
| ADDRESS  | string  | Full address                              |
| STATE    | string  | State name                                |
| CONTACT  | string  | Contact number                            |
| UPI      | boolean | UPI availability                          |
| RTGS     | boolean | RTGS availability                         |
| CITY     | string  | City name                                 |
| CENTRE   | string  | Centre name                               |
| DISTRICT | string  | District name                             |
| NEFT     | boolean | NEFT availability                         |
| IMPS     | boolean | IMPS availability                         |
| SWIFT    | string  | SWIFT code (null if not available)        |
| ISO3166  | string  | ISO 3166 code for state                   |

## 📝 Usage Examples

### JavaScript Fetch

```javascript
// Search for banks
const searchBanks = async (query) => {
  const response = await fetch(`https://bankapi-hazel.vercel.app/api/banks?q=${query}`);
  const banks = await response.json();
  return banks;
};

// Search for branches
const searchBranches = async (bankCode, branchQuery) => {
  const response = await fetch(
    `https://bankapi-hazel.vercel.app/api/branches?bank=${bankCode}&branch=${branchQuery}`
  );
  const branches = await response.json();
  return branches;
};
```

### React Example

```jsx
import { useState, useEffect } from 'react';

function BankSearch() {
  const [query, setQuery] = useState('');
  const [banks, setBanks] = useState([]);
  
  useEffect(() => {
    if (query.length >= 2) {
      fetch(`https://bankapi-hazel.vercel.app/api/banks?q=${query}`)
        .then(res => res.json())
        .then(data => setBanks(data))
        .catch(err => console.error(err));
    }
  }, [query]);
  
  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search banks..."
      />
      <ul>
        {banks.map(bank => (
          <li key={bank.code}>{bank.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🌐 Live Demo

Try the API at: [https://bankapi-hazel.vercel.app](https://bankapi-hazel.vercel.app)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Razorpay](https://razorpay.com/) for maintaining the IFSC repository
- [Next.js](https://nextjs.org/) for the framework
- [Vercel](https://vercel.com/) for hosting

## 📞 Contact

For questions or feedback, please open an issue on GitHub or contact the repository owner.

---

Made with ❤️ by [astro-dally](https://github.com/astro-dally)
