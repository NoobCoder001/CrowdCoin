import React from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";
class CampaignIndex extends React.Component {
  //static -> due to this getInitialProps doesn't requires any instance of a class, and called directly
  //only present in NextJs
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call(); //This is going to retrieve an array

    return { campaigns: campaigns };
    //this object is returned to our component as props
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}> 
          <a>View Campaign</a>
          </Link>
          ),
        fluid: true, //since we want our card to take up the width of its container
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                content="Create Campaign"
                icon="add circle"
                primary
                floated="right"
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

//since next expects index.js to export something
//we need to export our component
export default CampaignIndex;
