import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { Link, Router } from '../../routes';  //Link -> its a react object helps to render anchor tags in rreact component and navigate around the application
//Router -> this object helps us to redirect from one page to another page


import factory from '../../ethereum/factory'; 
import web3 from '../../ethereum/web3'; 

class CampaginNew extends Component { 
  state = { 
    minimumContribution: '', 
    errorMessage: '', 
    loading: false
  };

  onSubmit = async (e) => { 
    e.preventDefault(); 
    
    this.setState({ loading: true, errorMessage: '' });

    try{ 
        const accounts = await web3.eth.getAccounts(); 
    
         //creating new instance of a campaign
         //while using send method in browser , metamask will take care of the gas value
         //so no need to provide gas value 
        await factory.methods
        .createCampaign(this.state.minimumContribution) 
        .send({ 
           from: accounts[0]  
        });

        Router.pushRoute('/');  
        
    } catch (err) { 
      this.setState({ errorMessage: err.message });
    }
    
    
    this.setState({ loading: false });

  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3> 

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}> 
       <Form.Field> 
        <label>Minimum Contribution</label> 
        <Input 
        label="wei" 
        labelPosition="right" 
        value={this.state.minimumContribution}
        onChange={e => this.setState({ minimumContribution: e.target.value })} 
        />
       </Form.Field>  
       <Message error header="Oops!" content={this.state.errorMessage} />
       <Button loading={this.state.loading} primary>Create!</Button>
      </Form>
      </Layout>
    );
  }
}

export default CampaginNew;
