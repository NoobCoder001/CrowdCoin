import React from 'react'; 
import factory from '../ethereum/factory'; 

class CampaignIndex extends React.Component { 
  //static -> due to this getInitialProps doesn't requires any instance of a class, and called directly
  //only present in NextJs
  static async getInitialProps() { 
    const campaigns = await factory.methods.getDeployedCampaigns().call(); //This is going to retrieve an array 
     
    return { campaigns: campaigns };   
    //this object is returned to our component as props
  }
  
  // async componentDidMount(){ 
  //   const campaigns = await factory.methods.getDeployedCampaigns().call(); //This is going to retrieve an array 
  //    //of addresses of all the deployed contracts 
  //    console.log(campaigns);
  // } 

  render(){ 
    return ( 
      <div>{this.props.campaigns[0]}</div>
    );
  }
}

//since next expects index.js to export something 
//we need to export our component 
export default CampaignIndex; 