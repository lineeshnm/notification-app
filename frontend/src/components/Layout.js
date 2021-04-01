import React from 'react'
import Header from './Header';
import FooterPage from './Footer'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            <FooterPage />
        </React.Fragment>
    );
};

export default Layout;