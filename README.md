# 🇮🇳 Indian Bank IFSC API

A robust API for searching Indian banks and their branches by IFSC codes, names, and other parameters.

---

## 📦 Data Source

This API uses data from:

* [Razorpay IFSC GitHub Repository](https://github.com/razorpay/ifsc)
* [Razorpay IFSC API](https://github.com/razorpay/ifsc-api/tree/master/data)

---

## 📁 Project Structure

```
├── api/
│   ├── banks.js        # Search banks by name
│   ├── branches.js     # Search branches by bank code and branch name
│   ├── cities.js       # Get cities for a specific bank
│   ├── ifsc.js         # Get branch details by IFSC code
│   └── states.js       # Get states for a specific bank
├── data/
│   ├── banknames.json  # Map of bank codes to bank names
│   └── banks/          # JSON files for each bank with branch details
│       ├── SBIN.json
│       ├── HDFC.json
│       └── ...
├── utils/
│   └── logger.js       # Logging utility
├── middleware.js       # CORS and request logging middleware
└── package.json
```

---

## 🚀 API Endpoints

### 🔍 Search Banks

```
GET /api/banks?q={query}&limit={limit}
```

**Query Parameters:**

* `q` (required): Search query string
* `limit` (optional): Max results (default: 10)

**Example Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    { "code": "HDFC", "name": "HDFC Bank" },
    { "code": "HDFB", "name": "HDFC Bank Bahrain" }
  ],
  "metadata": {
    "query": "hdfc",
    "responseTime": "5ms"
  }
}
```

---

### 🏦 Search Branches

```
GET /api/branches?bank={bank_code}&branch={branch_name}&limit={limit}&page={page}
```

**Query Parameters:**

* `bank` (required): Bank code (e.g., "SBIN", "HDFC")
* `branch` (required): Branch name
* `limit` (optional): Results per page (default: 20)
* `page` (optional): Page number (default: 1)

**Example Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "BANK": "HDFC Bank",
      "IFSC": "HDFC0000001",
      "BRANCH": "MUMBAI - FORT",
      "ADDRESS": "HDFC Bank Ltd, FORT, MUMBAI - 400001",
      "CITY": "MUMBAI",
      "STATE": "MAHARASHTRA",
      "CONTACT": "22022022",
      "UPI": true,
      "RTGS": true,
      "NEFT": true,
      "IMPS": true,
      "SWIFT": null,
      "ISO3166": "IN-MH"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 20,
    "pages": 1
  },
  "metadata": {
    "bank": "HDFC",
    "query": "mumbai",
    "responseTime": "8ms"
  }
}
```

---

### 🧾 Get Branch by IFSC

```
GET /api/ifsc?ifsc={ifsc_code}
```

**Query Parameter:**

* `ifsc` (required): IFSC code of the branch

**Example Response:**

```json
{
  "success": true,
  "data": {
    "BANK": "CITI Bank",
    "IFSC": "CITI0000001",
    "MICR": "700037002",
    "BRANCH": "KOLKATA",
    "ADDRESS": "KANAK BUILDING, 41, CHOWRINGHEE ROAD, KOLKATA - 700071",
    "STATE": "WEST BENGAL",
    "CONTACT": "+913322881878",
    "UPI": true,
    "RTGS": true,
    "CITY": "KOLKATA",
    "CENTRE": "KOLKATA",
    "DISTRICT": "KOLKATA",
    "NEFT": true,
    "IMPS": true,
    "SWIFT": null,
    "ISO3166": "IN-WB"
  },
  "metadata": {
    "ifsc": "CITI0000001",
    "bank_code": "CITI",
    "bank_name": "CITI Bank",
    "responseTime": "3ms"
  }
}
```

---

### 🏙️ Get Cities for a Bank

```
GET /api/cities?bank={bank_code}
```

**Query Parameter:**

* `bank` (required): Bank code

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "data": ["DELHI", "KOLKATA", "MUMBAI"],
  "metadata": {
    "bank": "CITI",
    "responseTime": "4ms"
  }
}
```

---

### 🗺️ Get States for a Bank

```
GET /api/states?bank={bank_code}
```

**Query Parameter:**

* `bank` (required): Bank code

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    { "name": "DELHI", "iso_code": "IN-DL" },
    { "name": "MAHARASHTRA", "iso_code": "IN-MH" },
    { "name": "WEST BENGAL", "iso_code": "IN-WB" }
  ],
  "metadata": {
    "bank": "CITI",
    "responseTime": "4ms"
  }
}
```

---

## ❌ Error Handling

All endpoints return consistent error formats:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message"
}
```

**Common Status Codes:**

* `400`: Bad Request (missing/invalid parameters)
* `404`: Not Found (resource not found)
* `500`: Internal Server Error (unexpected failure)

---

## 🛠️ Development

### 📥 Installation

```bash
npm install
```

### 🚧 Start Development Server

```bash
npm run dev
```

### 🚀 Build for Production

```bash
npm run build
npm start
```

---

