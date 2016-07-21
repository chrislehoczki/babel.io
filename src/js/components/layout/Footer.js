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
            <p>Copyright &copy; <a href="http://cphillips.co.uk">Peak Studios</a></p>
          </div>
        </div>
      </footer>
    );
  }
}
