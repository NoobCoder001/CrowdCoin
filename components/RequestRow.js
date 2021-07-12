import React from 'react';  
import { Table, Button } from 'semantic-ui-react'; 
import { Router } from '../routes'; 

import web3 from '../ethereum/web3'; 
import Campaign from '../ethereum/campaign'; 

class RequestRow extends React.Component{  
   
    state = { 
        loadAppr: false, 
        loadFin: false
    };
    onApprove = async () => {  
        
        try{ 

        this.setState({ loadAppr: true });

            const accounts = await web3.eth.getAccounts();
                const campaign = Campaign(this.props.address);
        
                await campaign.methods.approveRequest(this.props.id).send({ 
                    from: accounts[0]
                }); 
          
           
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`); 
        } catch (err){ 
            console.log(err.message);
        } 

        this.setState({ loadAppr: false });
    };
    
    onFinalize = async () => { 
        
        try{ 
            this.setState({ loadFin: true }); 
            const campaign = Campaign(this.props.address); 
    
            const accounts = await web3.eth.getAccounts(); 
            await campaign.methods.finalizeRequest(this.props.id).send({ 
                from: accounts[0]
            }); 
            
        } catch (err){ 
          console.log(err);
        }
        this.setState({ loadFin: false }); 

    };


    render() {
       const { Row, Cell } = Table; 
       const { id, request, approversCount } = this.props; 
       const readyToFinalize = request.approvalCount > approversCount / 2;

       return ( 
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}> 
             <Cell>{id}</Cell>
             <Cell>{request.description}</Cell>
             <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
             <Cell>{request.recipient}</Cell>
             <Cell>{request.approvalCount}/{approversCount}</Cell>
             <Cell> 
             {request.complete ? null : ( 
                <Button loading={this.state.loadAppr} color="green" basic onClick={this.onApprove}> 
                 Approve
                 </Button>
             )}
             </Cell> 
             <Cell>
             {request.complete ? null : (
                <Button loading={this.state.loadFin} color="teal" basic onClick={this.onFinalize}>
                 Finalize
                 </Button> 
             )}
             </Cell> 
             </Row>
        );
    }
}

export default RequestRow;