const assert = require('assert'); 
const ganache = require('ganache-cli'); 
const Web3 = require('web3'); 

const web3 = new Web3(ganache.provider()); 

const compiledFactory = require('../ethereum/build/CampaignFactory.json');  
const compiledCampaign = require('../ethereum/build/Campaign.json'); 

let accounts; 
let factory;  //refer to deployed instance of factory Contract 
let campaignAddress; 
let campaign;


beforeEach(async () => { 
  accounts = await web3.eth.getAccounts(); 
 
  //the factory contract instance is created
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) 
                      .deploy({ data: compiledFactory.bytecode }) 
                      .send({ from: accounts[0], gas: '1000000' }); 

 await factory.methods.createCampaign('100').send({ 
     from: accounts[0], 
     gas: '1000000'
 }); 
  
  //here we are storing first address from the deployed contracts
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();  
  
  //creating a JS representation of contract which can access the instance of the contract at campaignAddress
  campaign = await new web3.eth.Contract( 
        JSON.parse(compiledCampaign.interface), 
        campaignAddress
   );
}); 


describe('Campaigns', () => { 
 
    it('deploys a factory and a campaign', () =>{ 
        assert.ok(factory.options.address); 
        assert.ok(campaign.options.address); 
    });

    it('marks caller as the manager', async () =>{ 
        const manager = await campaign.methods.manager().call(); 
        assert.equal(accounts[0], manager);  
    }); 

    it('allows people to contribute money and marks them as approvers', async() => { 
        //people should contribute atleast 100 wei
        await campaign.methods.contribute().send({ 
            value: '200', 
            from: accounts[1]
        });  

        //now we'll check if the contributor is actually added 
        //in the approvers map by passing address of it 
        //if the map returns false : it means we failed the test
        const isContributor = await campaign.methods.approvers(accounts[1]).call(); 

        assert(isContributor);
    }); 

    it('requires a minimum contribution', async() => { 
       //check if we passed less than minimum contribution 
       //it must throw an error 
       try{ 
         await campaign.methods.contribute().send({ 
            value:'5', 
            from: accounts[1]
         });
         
         assert(false); 
       } catch (err){ 
           assert(err); 
       }
    }); 

    it('allows a manager to make a payment request', async() => { 
       await campaign.methods 
       .createRequest('Buy Groceries', '100', accounts[1]) 
       .send({ 
           from: accounts[0], 
           gas: '1000000'
       }); 

       const request = await campaign.methods.requests(0).call(); 
       
       assert.equal('Buy Groceries', request.description); 
       assert.equal('100', request.value); 
    }); 
    

    //the final test  
    //take our campaign -> contribute to it -> create Request -> Approve a request -> check if someone recieves the money 
    
    it('processes requests', async() =>{ 
      await campaign.methods.contribute().send({ 
          from: accounts[0], 
          value: web3.utils.toWei('10', 'ether')
      }); 

      await campaign.methods
      .createRequest('Sample Descrption', web3.utils.toWei('5', 'ether'), accounts[1]) 
      .send({ 
          from: accounts[0], 
          gas: '1000000'
      }); 

      await campaign.methods.approveRequest(0).send({ 
         from: accounts[0], 
         gas: '1000000'
      }); 
      
      await campaign.methods.finalizeRequest(0).send({ 
         from: accounts[0], 
         gas: '1000000'
      }); 
      
        
      // this returns a string -> await web3.eth.getBalance(accounts[1]); 
       let balance = await web3.eth.getBalance(accounts[1]); 

       balance = web3.utils.fromWei(balance, 'ether'); 
       
       //change the string into the floating point number 
       balance = parseFloat(balance); 
        
    //   console.log(balance); 
    assert(balance > 104);
      
    });
});


