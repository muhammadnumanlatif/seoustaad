const fs = require('fs');
const path = require('path');

const cssToAppend = `
/* =========================================
   MEGA MENU (Glassmorphism & Hover)
   ========================================= */

/* Desktop Mega Menu */
@media all and (min-width: 992px) {
    .navbar .has-megamenu {
        position: static !important;
    }
    .navbar .megamenu {
        left: 0;
        right: 0;
        width: 100%;
        margin-top: 0;
        position: absolute;
        
        /* Glassmorphism Effect */
        background: rgba(15, 15, 15, 0.85) !important;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-top: none;
        
        /* Smooth Fade In */
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        transform: translateY(10px);
    }
    
    /* Hover Interaction */
    .navbar .has-megamenu:hover .megamenu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    /* Keep hover active on link */
    .navbar .has-megamenu:hover .nav-link {
        color: var(--primary-orange) !important;
    }
}

/* Mobile Mega Menu (Accordion style) */
@media (max-width: 991px) {
    .navbar.fixed-top .navbar-collapse, .navbar.sticky-top .navbar-collapse {
        overflow-y: auto;
        max-height: 90vh;
        margin-top: 10px;
    }
    .navbar .megamenu {
        border: none;
        background: rgba(255, 255, 255, 0.03) !important;
        padding: 15px;
        margin-top: 10px;
        border-radius: 8px;
    }
    .navbar .has-megamenu .dropdown-toggle::after {
        float: right;
        margin-top: 8px;
    }
}

/* Base Dropdown overrides */
.dropdown-item {
    color: var(--text-gray);
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease;
}
.dropdown-item:hover, .dropdown-item:focus {
    background-color: rgba(255, 107, 0, 0.1);
    color: var(--primary-orange);
}
`;

const stylePath = path.join(__dirname, 'style.css');
const currentStyle = fs.readFileSync(stylePath, 'utf8');

if (!currentStyle.includes('MEGA MENU (Glassmorphism & Hover)')) {
    fs.appendFileSync(stylePath, cssToAppend, 'utf8');
    console.log("Successfully appended Mega Menu CSS to style.css!");
} else {
    console.log("Mega Menu CSS already exists in style.css.");
}
