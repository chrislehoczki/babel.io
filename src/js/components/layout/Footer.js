import React from "react";


export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
      clear: "both"
    };

    return (
      <footer style={footerStyles}>
        <div className="row">
          <div className="col-lg-12" >
            <p>Copyright &copy; John and Chris' Brilliant Web Dev Company That Will Make Loads of Money</p>
          </div>
        </div>
      </footer>
    );
  }
}
