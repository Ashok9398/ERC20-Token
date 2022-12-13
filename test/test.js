const {ethers } = require("hardhat");
const {assert,expect} = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

let accounts;
let mytoken;
describe("TestToken",()=>{
    beforeEach("Deploys token",async()=>{
        accounts = await ethers.getSigners();
        Token = await ethers.getContractFactory("TestToken",accounts[0]);
        mytoken = await Token.deploy();
        console.log(mytoken.address);
    })
    it ("Checks for totalSupply",async()=>{
        expect(await mytoken.totalSupply()).to.equal(1000);
    })
    it ("Checks for transfer function",async()=>{
        expect(await mytoken.transfer(accounts[1].address,1)).to.emit(mytoken,"Transfer").withArgs(accounts[1].address,1);
    })
    it("Checks for Approve method",async()=>{
        expect(await mytoken.approve(accounts[1].address,2)).to.emit(mytoken,"Approval").withArgs(accounts[0].address,accounts[1].address,1);
    })
    it("Checks for Transfer from method ",async()=>{
        await mytoken.approve(accounts[1].address,2);
        expect(mytoken.connect(accounts[1]).transferFrom(accounts[0].address,accounts[2].address),1).to.emit(mytoken,"Trnasfer").withArgs(accounts[0].address,accounts[2].address,1);
    })
})