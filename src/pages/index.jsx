import Layout from "./Layout.jsx";

import About from "./About";

import Compliance from "./Compliance";

import Contact from "./Contact";

import For from "./For";

import Home from "./Home";

import HowItWorks from "./HowItWorks";

import Platform from "./Platform";

import Product from "./Product";

import Why from "./Why";

import CMBS from "./CMBS";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    About: About,
    
    Compliance: Compliance,
    
    Contact: Contact,
    
    For: For,
    
    Home: Home,
    
    HowItWorks: HowItWorks,
    
    Platform: Platform,
    
    Product: Product,
    
    Why: Why,
    
    CMBS: CMBS,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<About />} />
                
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Compliance" element={<Compliance />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/For" element={<For />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/HowItWorks" element={<HowItWorks />} />
                
                <Route path="/Platform" element={<Platform />} />
                
                <Route path="/Product" element={<Product />} />
                
                <Route path="/Why" element={<Why />} />
                
                <Route path="/CMBS" element={<CMBS />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}