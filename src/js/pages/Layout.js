import React from "react";

import Footer from "../components/layout/Footer";
import SimpleNav from "../components/layout/SimpleNav";
import loginStore from "../stores/loginStore";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
   
    const userName = loginStore.getUserName();
    
    return (

      <div>
        <SimpleNav location={location} />

        <p className="text-center"> {userName ? "Hello " + userName : null} </p>
        <div className="container" style={containerStyle}>
              {this.props.children}
          <Footer/>
        </div>
      </div>

    );
  }
}
