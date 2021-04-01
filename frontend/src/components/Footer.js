import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <div className="footer-copyright text-center py-3 fixed-bottom">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://apaasbot.appcloud6.barcapint.com"> Barclays </a>
            Designed by: <a href="sip:lineesh.niduvappurathemeethal@barclays.com">Lineesh.NM</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;