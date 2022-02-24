# Trading App Project

This project represents the application with trading information.
It uses [IEX Cloud](https://iexcloud.io/) API to access the market data.

## Run project

You need to perform the following actions to run Trading App:

1. Go to the project directory

```sh
cd path/to/trading-app
```

2. Copy the `.env` file for the local deployment

```sh
cp .env .env.local
```

3. Add your own [IEX Cloud token](https://iexcloud.io/console/tokens) to `.env.local` as `REACT_APP_API_TOKEN` variable
4. Install the required packages

```sh
npm ci
```

5. Run the project

```sh
npm start
```

## Test project

To run tests in the project, you need to execute the following command in the terminal:

```sh
npm test
```

Note:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
