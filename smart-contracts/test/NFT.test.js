const { ethers, waffle } = require("hardhat");
const chai = require("./setupChai");
const utils = require("./utils");
const { BigNumber } = require("ethers");
const { expect } = chai;

describe("Stud-Potato NFT testing", async () => {
  let contract, buyer, seller, recepient;
  let date = new Date();
  date.setFullYear(2023);

  const url = "https://rahulsinha.xyz",
    price = ethers.utils.parseEther("3"),
    validity = date.getTime(),
    provider = waffle.provider;

  before(async () => {
    [seller, buyer, recepient] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("StudPotato");
    contract = await Contract.deploy();
  });

  it("Deployed Successfully", async () => {
    const address = contract.address;

    expect(address).to.not.be.equal(null);
    expect(address).to.not.be.equal(undefined);
    expect(address).to.not.be.equal("");
    expect(address).to.not.be.equal(0x0);
  });

  describe("Minting and burning of token", () => {
    it("Minting of SPDT token", async () => {
      await expect(
        contract.safeMint(
          buyer.address,
          url,
          seller.address,
          utils.formJStoSol(validity),
          price,
          { value: price }
        )
      ).to.eventually.be.fulfilled;

      const _tokenId = await contract.getLatestTokenId();
      expect(_tokenId).to.be.equal(1);

      const _seller = await contract.getSellerFromTokenId(_tokenId);
      expect(_seller).to.be.equal(seller.address);

      const _buyer = await contract.getOwnerFromTokenId(_tokenId);
      expect(_buyer).to.be.equal(buyer.address);

      const _url = await contract.tokenURI(_tokenId);
      expect(_url).to.be.equal(url);

      const _validity = await contract.getValidityFromTokenId(_tokenId);
      expect(utils.fromSolToJS(_validity)).to.be.equal(
        Math.floor(validity / 1000) * 1000
      );

      const _returnInfo = await contract.getReturnInfoFromTokenId(_tokenId);
      const _price = _returnInfo[0];

      expect(_price).to.be.equal(price);
    });

    it("SPDT token burn", async () => {
      const tokenId = await contract.getLatestTokenId();
      await expect(
        contract.connect(recepient).burnToken(tokenId),
        "Only owner or approved address can burn tokens"
      ).to.eventually.be.rejected;

      await expect(contract.connect(seller).burnToken(tokenId)).to.eventually.be
        .fulfilled;

      // all the data associated with the token should be erased
      await expect(contract.tokenURI(tokenId)).to.eventually.be.rejected;
      await expect(
        contract.getSellerFromTokenId(tokenId)
      ).to.eventually.be.equal("0x0000000000000000000000000000000000000000");
      await expect(
        contract.getValidityFromTokenId(tokenId)
      ).to.eventually.be.equal(0);
      const _returnInfo = await contract.getReturnInfoFromTokenId(tokenId);
      const _price = _returnInfo[0];
      expect(_price).to.be.equal(0);
    });
  });

  describe("Return and Replacement of Product", async () => {
    it("Minting new Token", async () => {
      await expect(
        contract.safeMint(
          buyer.address,
          url,
          seller.address,
          utils.formJStoSol(validity),
          price,
          { value: price }
        )
      ).to.eventually.be.fulfilled;
    });

    it("Return the product", async () => {
      const tokenId = await contract.getLatestTokenId();
      const _returnInfo = await contract.getReturnInfoFromTokenId(tokenId);
      const _price = _returnInfo[0];
      const _priceBN = BigNumber.from(_price.toString());
      await expect(
        contract.connect(buyer).returnProduct(tokenId),
        "Only seller of the token could return the product to consumer !!"
      ).to.eventually.be.rejected;

      //forwarding time
      await provider.send("evm_increaseTime", [utils.fromDaysToSecs(11)]);

      await expect(
        contract.connect(seller).returnProduct(tokenId),
        "Once the return period is over, product can't be returned !!"
      ).to.eventually.be.rejected;

      const _buyerBalance = await provider.getBalance(buyer.address);
      const _buyerBN = BigNumber.from(_buyerBalance.toString());

      //getting back to current time
      await provider.send("evm_increaseTime", [-utils.fromDaysToSecs(10)]);

      await expect(contract.connect(seller).returnProduct(tokenId)).to
        .eventually.be.fulfilled;

      await expect(
        contract.tokenURI(tokenId),
        "Burned token can't be fetched !!"
      ).to.eventually.be.rejected;

      // money of the consumer should be reverted back
      const _afterBuyerBN = await provider.getBalance(buyer.address);
      expect(_afterBuyerBN).to.be.equal(_buyerBN.add(_priceBN));
    });

    it("Minting new Token again", async () => {
      await expect(
        contract.safeMint(
          buyer.address,
          url,
          seller.address,
          utils.formJStoSol(validity),
          price,
          { value: price }
        )
      ).to.eventually.be.fulfilled;
    });

    it("Getting the money to seller's account, if there is not return of the product", async () => {
      const tokenId = await contract.getLatestTokenId();

      // forwarding time after 10 days
      await provider.send("evm_increaseTime", [utils.fromDaysToSecs(10)]);

      await expect(
        contract.connect(buyer).sendMoneyToSeller(tokenId),
        "Only seller can get the money for the product !!"
      ).to.eventually.be.rejected;

      const sellerBal = await provider.getBalance(seller.address);
      const _returnInfo = await contract.getReturnInfoFromTokenId(tokenId);
      const _price = _returnInfo[0];
      const _priceBN = BigNumber.from(_price);

      await expect(contract.sendMoneyToSeller(tokenId)).to.eventually.be
        .fulfilled;

      const sellerBalAfter = await provider.getBalance(seller.address);

      // rounding off the price to 4 digit places as
      // the money will also consume in form of gas fees
      expect(Math.floor(sellerBalAfter / 10 ** 14) * 10 ** 14).to.be.equal(
        Math.floor(_priceBN.add(sellerBal) / 10 ** 14) * 10 ** 14
      );

      const _returnInfoAfter = await contract.getReturnInfoFromTokenId(tokenId);

      // checking whether the return info is deleted or not
      expect(_returnInfoAfter[0]).to.be.equal(0);
    });

    it("Replace the product", async () => {
      const newUri = "https://my-portfolio-84.web.app/";
      const tokenId = await contract.getLatestTokenId();

      await expect(
        contract.connect(buyer).replaceProduct(tokenId, newUri),
        "Only seller could replace the product !!"
      ).to.eventually.be.rejected;

      // forwarding time to one year
      await provider.send("evm_increaseTime", [utils.fromDaysToSecs(365)]);

      await expect(
        contract.replaceProduct(tokenId, newUri),
        "Once the validity of warranty is over, Product can't be replaced !!"
      ).to.eventually.be.rejected;

      // returning back to current time
      await provider.send("evm_increaseTime", [-utils.fromDaysToSecs(365)]);

      await expect(contract.replaceProduct(tokenId, newUri)).to.eventually.be
        .fulfilled;

      const replacedTokenId = await contract.getLatestTokenId();

      // checking for the updated value of replaced token
      // everything expect the tokenUri should be changed
      const _seller = await contract.getSellerFromTokenId(replacedTokenId);
      expect(_seller).to.be.equal(seller.address);

      const _validity = await contract.getValidityFromTokenId(replacedTokenId);
      expect(utils.fromSolToJS(_validity)).to.be.equal(
        Math.floor(validity / 1000) * 1000
      );

      const _consumer = await contract.getOwnerFromTokenId(replacedTokenId);
      expect(_consumer).to.be.equal(buyer.address);

      const _uri = await contract.tokenURI(replacedTokenId);
      expect(_uri).to.be.equal(newUri);

      // return info shouldn't be there
      const _returnInfo = await contract.getReturnInfoFromTokenId(
        replacedTokenId
      );
      expect(_returnInfo[0]).to.be.equal(0);

      // old token should be burned successfully
      await expect(
        contract.tokenURI(tokenId),
        "Burned token can't be fetched !!"
      ).to.eventually.be.rejected;
    });
  });
});
