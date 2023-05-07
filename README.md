# My Awesome App

This is a full-stack web app that uses Node.js and React. The app allows users to search for and view information about cryptocurrencies.

## Prerequisites

Before running the app, you need to have the following installed:

- Node.js
- npm or yarn

## Installation

To install the app, follow these steps:

1. Clone this repository to your local machine:


```bash
git clone https://github.com/stavthal/gecko-proxy.git
```

2. Change into the project directory:

```bash
cd gecko-proxy
```

3. Install the dependencies:

```bash
npm install
```

4. Install React's dependencies
```bash
cd client && npm install
cd ..
```


## Usage

To start the app, run the following command:

```bash
npm run dev
```


This will start the backend and frontend development servers simultaneously using `concurrently`. You can then access the app at `http://localhost:3000` (assuming your frontend development server is set up to run on port 3000).

## API

The app uses the CoinGecko API to fetch cryptocurrency data. You can find more information about the API here: [https://www.coingecko.com/api/documentations/v3](https://www.coingecko.com/api/documentations/v3)

## Contributing

If you'd like to contribute to the project, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
