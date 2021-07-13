const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const factoryPath = require("../ethereum/build/Factory.json");
const campaignPath = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(factoryPath.interface))
    .deploy({ data: factoryPath.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  await factory.methods.addCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  const addresses = await factory.methods.getCampaigns().call();
  campaignAddress = addresses[0];

  campaign = await new web3.eth.Contract(
    JSON.parse(campaignPath.interface),
    campaignAddress
  );
});

describe("Campaign", () => {
  it("deployed factory and campaign contract", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("check manager is same as caller of contract", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute and mark them approvers", async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: "200",
    });
    const isContributor = await campaign.methods
      .contributors(accounts[1])
      .call();
    assert(isContributor);
  });

  it("checks user fullfills minimum contribution requirements", async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: "5",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("checks if the manager can make a payment request", async () => {
    try {
      await campaign.methods
        .createRequest("Buy Software", "100", accounts[1])
        .send({
          from: accounts[0],
          gas: 1000000,
        });
      const request = await campaign.methods.requests(0).call();
      assert.equal(request.description, "Buy Software");
    } catch (error) {
      assert(error);
    }
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("Buy trimmer", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});
