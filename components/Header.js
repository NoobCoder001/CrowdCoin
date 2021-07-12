import React from 'react'; 
import { Menu } from 'semantic-ui-react'; 
import { Link } from '../routes';  //Link helper is what allows us to create a linked tag that user can use to navigate around themselves

export default () => { 
   return (
       <Menu style={{ marginTop:'10px' }}> 
       <Link route="/"> 
         <a className="item"> CrowdCoin</a>
       </Link>
        
        <Menu.Menu position="right">
        <Link route="/"> 
         <a className="item"> Campaigns</a>
       </Link>

       <Link route="/campaigns/new"> 
         <a className="item">+</a>
       </Link>
        </Menu.Menu>
       </Menu>
   );
};