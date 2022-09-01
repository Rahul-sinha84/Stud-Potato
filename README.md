# Stud-Potato

A Blockchain based e-commerce web app wherein people get their product delivered physically as well as digitally in the form of a NFT. Warranties are stored in the form of NFTs too. A customer can buy, replace or claim warranty for their products easily.
Also it is easy for the seller to add or edit their products and warranties as well as handle warranty claim requests.

## Tech Stack

**Client:** NextJS, Redux, SASS, ethersJS.

**Server:** NodeJS, ExpressJS, MongoDB.

**Smart-Contract**: Solidity, hardhat.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Rahul-sinha84/Stud-Potato.git
```

Go to the project directory

```bash
  cd Stud-Potato
```

Install dependencies

```bash
  yarn
```

## Installation

To install this application locally, please follow the steps below:

The project is of three components in total.

1. NodeJS Server
2. Smart-contracts
3. NextJS app

### Smart-Contract

First we need to deploy our smart-contract locally, for that first of all we need to install all the dependencies.

```bash
  cd smart-contracts
  yarn
```

This will install all the dependencies in `smart-contract` folder.

Now we need to run the blockchain locally, for that:

```bash
npx hardhat node
```

Now in seperate terminal, deploy the contract to this local chain

```bash
npx hardhat --network localhost run scripts/deploy.js
```

### NodeJS Server

First we need to install all the dependencies in server file.

```bash
cd server
yarn
```

To start the local server, run the following command in your terminal in the `server` folder

```bash
yarn start
```

### NextJS application

In the root folder itself install all the dependencies

```bash
yarn
```

To run the nextJS server run the following command

```bash
yarn dev
```

## Environment Variables

This project contains two environment files in total.

#### `server` file

`MONGO_URI`: mongoDB url

`PORT`: port on which our server runs

`ACCESS_TOKEN_SECRET`: for JWT based authentication

`SMS_API_KEY`: Nexmo sms api for sending sms to the users

#### root

as `.env.local` in the root directory

`NEXT_PUBLIC_CONTRACT_ADDRESS`: Deployed Contract address

`NEXT_PUBLIC_CLOUD_NAME`: for cloudinary

`NEXT_PUBLIC_UPLOAD_PRESET`: for cloudinary

`NEXT_PUBLIC_NFTSTORAGE_API_KEY`: NFT storage api

`NEXT_PUBLIC_NETWORK_ID`: Chain ID on which contract is deployed

`NEXT_PUBLIC_NODE_API`: NodeJS Server URL

## Demo

You can access the link of the deployed website: https://stud-potato.vercel.app/

##Video

https://user-images.githubusercontent.com/52829478/187812212-062cf02b-ebda-4309-a6a1-9240ca29adc7.mp4




## Authors

- [@stuti612](https://github.com/stuti612)
- [@rajrawat37](https://github.com/rajrawat37)
- [@Rahul-sinha84](https://github.com/Rahul-sinha84)
