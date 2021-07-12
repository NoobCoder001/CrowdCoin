import React from 'react';  
import { Container } from 'semantic-ui-react';  
import Head from 'next/head';  //any child inside of this component moves the child in the head tag of HTML document
import Header from './Header'; 

export default (props) => { 
   return ( 
       <Container> 
       <Head> 
       <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/> 
       </Head>
        <Header />
        {props.children}
       </Container>
   );
}; 