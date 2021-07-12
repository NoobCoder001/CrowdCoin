import React from 'react'; 
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { Router } from '../routes';

import Campaign from '../ethereum/campaign'; 
import web3 from '../ethereum/web3'; 

class ContributeForm extends React.Component { 
  state={ 
    value: '', 
    errorMessage: '', 
    loading: false
  };  

  onSubmit = async (e) => { 
      e.preventDefault(); 
      
      //creating a new contract instance, so that we can access its functions
      const campaign = Campaign(this.props.address);  
        
      this.setState({ loading: true,   errorMessage:'' });
 
      try{ 
         const accounts = await web3.eth.getAccounts();  

         await campaign.methods.contribute().send({ 
            from: accounts[0], 
            value: web3.utils.toWei(this.state.value, 'ether')
         }); 

         //Browsers keeps histoy of urls 
         //So if we used pushRoute , then we had just pushed same url again 
         //So if user goes back , they see the same url twice
         //So what we can do is just replace the current route with the same route and refresh !!
         Router.replaceRoute(`/campaigns/${this.props.address}`);
      } catch (err){ 
         this.setState({ errorMessage: err.message });
      }
      
      this.setState({ loading: false, value: '' });
  };
  
  render(){ 
       return (
           <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}> 
             <Form.Field> 
             <label>Amount to Contribute</label> 
             <Input
              value={this.state.value} 
              onChange={e => this.setState({value: e.target.value})}  
              label="ether" 
              labelPosition="right" 
             /> 
             </Form.Field> 
             <Message error header="Oops!" content={this.state.errorMessage} />
             <Button primary loading={this.state.loading}> 
              Contribute!
             </Button>
           </Form>
       );
   }
}

export default ContributeForm;