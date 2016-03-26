import React from 'react';
import Navigation from './navigation.jsx';

const Layout = ({content = () => null }) => (
  <div>
    <header>
    <h1>Mantra Voice</h1>
    <Navigation />
    </header>

    <div>
    {content()}
    </div>

    <footer>
    <small>Built by <a href='https://github.com/redgecko'>RedGecko</a> &amp; ZSO Uri.</small>
    </footer>
  </div>
);

export default Layout;
