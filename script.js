/**
 * SEO Ustaad - Core Interactions
 * Handles motion effects, smooth scrolling, and WhatsApp automation.
 */

// Global Data for Packages

const packagesData = [
  // Web Development
  {
    name: "Website Speed Optimization",
    price: "5,000 PKR",
    category: "web",
    features: ["Core Web Vitals Boost", "Image Compression", "Caching Setup"],
  },
  {
    name: "E-Commerce Bug Fixing & Tweaks",
    price: "10,000 PKR",
    category: "web",
    features: [
      "Shopify/WooCommerce Bugs",
      "CSS Layout Fixes",
      "Checkout Optimization",
    ],
  },
  {
    name: "Premium Custom WordPress development full website",
    price: "15,000 PKR",
    category: "web",
    features: [
      "100% Responsive Design",
      "Premium Theme Setup",
      "Speed Optimized",
    ],
  },
  {
    name: "Premium custom Shopify Store development and Setup",
    price: "25,000 PKR",
    category: "web",
    features: [
      "Premium Liquid Theme",
      "Product Setup",
      "Payment Gateway Integration",
    ],
  },
  {
    name: "Custom Next.js full website [for any niche]",
    price: "30,000 PKR",
    category: "web",
    features: [
      "React / Next.js Framework",
      "API Integration",
      "Blazing Fast Speed",
    ],
  },

  // Technical & On-Page SEO
  {
    name: "Premium Disavow Toxic Backlinks & Penalty Recovery",
    price: "5,000 PKR",
    category: "seo",
    features: [
      "Toxic Link Audit",
      "Disavow File Creation",
      "Google Search Console Update",
    ],
  },
  {
    name: "Premium Schema Markup & Advanced Structured Data",
    price: "8,000 PKR",
    category: "seo",
    features: ["LocalBusiness Schema", "Product Schema", "FAQ Snippet Coding"],
  },
  {
    name: "Comprehensive Keyword Research & Competitor Gap Analysis",
    price: "10,000 PKR",
    category: "seo",
    features: ["500+ Keywords", "Search Intent Mapping", "Competitor Matrix"],
  },
  {
    name: "Premium Technical SEO Audit & Action Plan",
    price: "15,000 PKR",
    category: "seo",
    features: [
      "Crawl Error Fixes",
      "Indexability Check",
      "Architecture Review",
    ],
  },
  {
    name: "Complete On-Page SEO Optimization [up to 10 Pages]",
    price: "20,000 PKR",
    category: "seo",
    features: ["Title/Meta Tags", "Header Tags Hierarchy", "Internal Linking"],
  },
  {
    name: "Advanced Core Web Vitals & PageSpeed Fixes",
    price: "25,000 PKR",
    category: "seo",
    features: ["LCP Optimization", "CLS Reduction", "INP Improvements"],
  },

  // Local SEO
  {
    name: "Premium Local Citations & High-DA Directory Listings",
    price: "8,000 PKR",
    category: "local",
    features: ["50+ Local Citations", "NAP Consistency", "Map Pack Boost"],
  },
  {
    name: "Premium Google Business Profile (GMB) Setup & Ranking",
    price: "10,000 PKR",
    category: "local",
    features: ["Profile Verification", "Geo-tagged Images", "Q&A Setup"],
  },
  {
    name: "Highly-Converting Geo-Targeted Landing Page Copywriting",
    price: "15,000 PKR",
    category: "local",
    features: [
      "Location specific Copy",
      "High Conversion Rate",
      "Entity Rich Content",
    ],
  },
  {
    name: "Premium Local SEO Monthly Retainer [Dominate your City]",
    price: "20,000 PKR",
    category: "local",
    features: [
      "Monthly Citation Building",
      "GMB Management",
      "Local Backlinks",
    ],
  },

  // E-Commerce SEO
  {
    name: "Premium Shopify/WooCommerce Product SEO [20 Products]",
    price: "15,000 PKR",
    category: "ecom",
    features: ["Product Descriptions", "Image Alt Tags", "Schema Setup"],
  },
  {
    name: "Complete E-Commerce Category Page Optimization",
    price: "20,000 PKR",
    category: "ecom",
    features: [
      "Category Descriptions",
      "Internal Silo Links",
      "Faceted Navigation SEO",
    ],
  },
  {
    name: "Advanced Conversion Rate Optimization (CRO) Audit",
    price: "25,000 PKR",
    category: "ecom",
    features: ["UX Heatmaps", "Checkout Flow Review", "A/B Testing Ideas"],
  },
  {
    name: "Premium E-Commerce Architecture & Silo Restructure",
    price: "30,000 PKR",
    category: "ecom",
    features: [
      "URL Restructuring",
      "Taxonomy Optimization",
      "Pagination Fixes",
    ],
  },

  // Link Building & SMM
  {
    name: "10 Premium Foundation Web 2.0 Backlinks",
    price: "5,000 PKR",
    category: "smm",
    features: ["High DA Blogs", "Contextual Links", "100% Manual Placement"],
  },
  {
    name: "Advanced Competitor Backlink Intercept Strategy",
    price: "10,000 PKR",
    category: "smm",
    features: ["Competitor Audit", "Outreach List", "Link Gap Execution"],
  },
  {
    name: "High-Converting Ad Copywriting & Creative Strategy",
    price: "15,000 PKR",
    category: "smm",
    features: ["3 Ad Variations", "Hook & CTA Design", "Targeting Advice"],
  },
  {
    name: "Premium Meta Ads Campaign Setup & Targeting",
    price: "20,000 PKR",
    category: "smm",
    features: ["Pixel Installation", "Custom Audiences", "Retargeting Setup"],
  },
  {
    name: "5 Ultra High-DR Guest Post Backlinks [Contextual]",
    price: "25,000 PKR",
    category: "smm",
    features: ["DR 50+ Sites", "Real Traffic Blogs", "Dofollow Links"],
  },
  {
    name: "Premium Social Media Management [Full Month / 3 Posts Wk]",
    price: "30,000 PKR",
    category: "smm",
    features: ["12 Custom Posts", "Hashtag Strategy", "Community Engagement"],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll & Toggle Effects
  const navbar = document.querySelector(".navbar");
  const burgerMenu = document.querySelector(".hamburger-menu");
  const navCollapse = document.getElementById("navbarNav");

  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check

  if (navCollapse && burgerMenu) {
    navCollapse.addEventListener("show.bs.collapse", () => {
      burgerMenu.classList.add("active");
      document.body.classList.add("mobile-menu-open");
    });
    navCollapse.addEventListener("hide.bs.collapse", () => {
      burgerMenu.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
    });
  }

  // 2. Smart Navigation & Smooth Scrolling
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || !href.includes("#")) return;

      // Handle local file paths and absolute URLs
      const url = new URL(
        this.href,
        window.location.origin + window.location.pathname,
      );
      const currentPath =
        window.location.pathname.split("/").pop() || "index.html";
      const targetPath = url.pathname.split("/").pop() || "index.html";

      const isSamePage =
        currentPath === targetPath ||
        (currentPath === "" && targetPath === "index.html");

      if (isSamePage) {
        const targetId = url.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetElement.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navMenu =
            document.getElementById("navbarNav") ||
            document.getElementById("navbarNavDetail");
          if (
            navMenu &&
            navMenu.classList.contains("show") &&
            typeof bootstrap !== "undefined"
          ) {
            const bsCollapse =
              bootstrap.Collapse.getInstance(navMenu) ||
              new bootstrap.Collapse(navMenu);
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // 3. Magnetic Effect Placeholder for WhatsApp Button (Disabled when panel is active)
  const waButton = document.getElementById("whatsappCTA");
  document.addEventListener("mousemove", (e) => {
    if (!waButton || waButton.classList.contains("active")) return;
    const rect = waButton.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);

    if (distance < 100) {
      waButton.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    } else {
      waButton.style.transform = `translate(0, 0)`;
    }
  });

  // 4. Growth Calculator Logic & Micro-Animations
  const budgetRange = document.getElementById("budgetRange");
  const budgetValue = document.getElementById("budgetValue");
  const serviceSelect = document.getElementById("serviceSelect");
  const locationSelect = document.getElementById("locationSelect");

  const resVisitors = document.getElementById("resVisitors");
  const resLeads = document.getElementById("resLeads");
  const resTime = document.getElementById("resTime");
  const calcOrderBtn = document.getElementById("calcOrderBtn");

  let visitorsAnimFrame = null;
  let leadsAnimFrame = null;
  let prevVisitors = 0;
  let prevLeads = 0;

  // Flicker-free requestAnimationFrame number counter loop
  function animateCounter(
    element,
    start,
    end,
    duration,
    suffix = "",
    type = "visitors",
  ) {
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quad ease-out equation
      const ease = progress * (2 - progress);
      const value = Math.floor(start + (end - start) * ease);

      element.innerText = value.toLocaleString() + suffix;

      if (type === "visitors") {
        prevVisitors = value;
      } else {
        prevLeads = value;
      }

      if (progress < 1) {
        if (type === "visitors") {
          visitorsAnimFrame = requestAnimationFrame(update);
        } else {
          leadsAnimFrame = requestAnimationFrame(update);
        }
      } else {
        element.innerText = end.toLocaleString() + suffix;
        if (type === "visitors") {
          prevVisitors = end;
          visitorsAnimFrame = null;
        } else {
          prevLeads = end;
          leadsAnimFrame = null;
        }
      }
    };

    if (type === "visitors") {
      if (visitorsAnimFrame) cancelAnimationFrame(visitorsAnimFrame);
      visitorsAnimFrame = requestAnimationFrame(update);
    } else {
      if (leadsAnimFrame) cancelAnimationFrame(leadsAnimFrame);
      leadsAnimFrame = requestAnimationFrame(update);
    }
  }

  const updateSliderTrack = () => {
    if (!budgetRange) return;
    const min = budgetRange.min || 5000;
    const max = budgetRange.max || 30000;
    const val = budgetRange.value;
    const percentage = ((val - min) / (max - min)) * 100;
    budgetRange.style.background = `linear-gradient(to right, var(--primary-orange) 0%, var(--primary-orange) ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%, rgba(255, 255, 255, 0.1) 100%)`;
  };

  const updateCalculator = () => {
    if (!budgetRange) return;

    const budget = parseInt(budgetRange.value);
    const location = locationSelect.value;
    const service = serviceSelect.value;

    // Dynamic PKR currency display
    budgetValue.innerHTML = `${budget.toLocaleString()} PKR`;

    updateSliderTrack();

    const hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    };

    // Target Multipliers dynamically based on selection
    const serviceMult = 0.8 + (hashString(service) % 50) / 100;
    const locationMult = 0.8 + (hashString(location) % 50) / 100;

    // Localized Timeline Matrix (Days)
    const timeOptions = [
      [120, 180],
      [90, 150],
      [60, 120],
      [30, 90],
    ];
    const timeIdx = hashString(location) % timeOptions.length;
    const [minDaysBase, maxDaysBase] = timeOptions[timeIdx];

    const speedFactor = budget > 20000 ? 0.8 : budget > 10000 ? 0.9 : 1;
    const minDays = Math.floor(minDaysBase * speedFactor);
    const maxDays = Math.floor(maxDaysBase * speedFactor);

    const baseCPC = 45; // 0.15 USD in PKR
    const visitors = Math.floor(
      (budget / baseCPC) * serviceMult * locationMult,
    );
    const leads = Math.floor(visitors * 0.04);

    // Animate counter values
    animateCounter(resVisitors, prevVisitors, visitors, 350, "+", "visitors");
    animateCounter(resLeads, prevLeads, leads, 350, "", "leads");
    resTime.innerText = `${minDays} - ${maxDays} Days`;

    // Growth Velocity indicator calculations
    let velocityLabel = "Starter Plan";
    let velocityWidth = 10;

    if (budget < 10000) {
      velocityLabel = "Starter Plan";
      velocityWidth = 10 + ((budget - 5000) / 5000) * 15;
    } else if (budget < 20000) {
      velocityLabel = "Accelerated Growth";
      velocityWidth = 25 + ((budget - 10000) / 10000) * 30;
    } else if (budget < 25000) {
      velocityLabel = "High Velocity";
      velocityWidth = 55 + ((budget - 20000) / 5000) * 25;
    } else {
      velocityLabel = "Market Domination";
      velocityWidth = 80 + ((budget - 25000) / 5000) * 20;
    }

    const growthSpeedBar = document.getElementById("growthSpeedBar");
    const growthVelocityLabel = document.getElementById("growthVelocityLabel");
    if (growthSpeedBar) growthSpeedBar.style.width = `${velocityWidth}%`;
    if (growthVelocityLabel) growthVelocityLabel.innerText = velocityLabel;

    // WhatsApp redirect message compilation
    const locationName =
      locationSelect.options[locationSelect.selectedIndex].text;
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const msg = `Hi SEO Ustaad! I used your calculator. My budget is ${budget.toLocaleString()} PKR for ${serviceName} targeting ${locationName}. Estimated traffic: ${visitors.toLocaleString()}+ visitors and ${leads} leads in ${minDays}-${maxDays} days. Please send me this growth plan!`;
    calcOrderBtn.href = `https://wa.me/923353453099?text=${encodeURIComponent(msg)}`;
  };

  if (budgetRange) {
    [budgetRange, serviceSelect, locationSelect].forEach((el) => {
      el.addEventListener("input", updateCalculator);
    });
    updateCalculator(); // Initial run
  }

  // 5. 40-Package Grid Data & Logic
  const packageGrid = document.getElementById("packageGrid");
  const tierButtons = document.querySelectorAll("#tierNav .btn");
  const serviceFilters = document.getElementById("serviceFilters");

  let currentTier = "tier1";
  let currentServiceFilter = "all";

  // 30-City Pakistan Database for Localized SEO, GEO & AEO
  const pakistanCities = [
    {
      id: "karachi",
      name: "Karachi",
      region: "Sindh",
      type: "Major Hub",
      industry: "E-commerce & Corporate Tech",
    },
    {
      id: "lahore",
      name: "Lahore",
      region: "Punjab",
      type: "Major Hub",
      industry: "Retail Brand E-commerce & Startups",
    },
    {
      id: "islamabad",
      name: "Islamabad",
      region: "Capital",
      type: "Major Hub",
      industry: "SaaS, Software & Corporate Brands",
    },
    {
      id: "rawalpindi",
      name: "Rawalpindi",
      region: "Punjab",
      type: "Major Hub",
      industry: "Local Trade, Retail & Services",
    },
    {
      id: "faisalabad",
      name: "Faisalabad",
      region: "Punjab",
      type: "Industrial Tier",
      industry: "Textile & Wholesale Manufacturing",
    },
    {
      id: "sialkot",
      name: "Sialkot",
      region: "Punjab",
      type: "Industrial Tier",
      industry: "Sports & Surgical Goods Exports",
    },
    {
      id: "gujranwala",
      name: "Gujranwala",
      region: "Punjab",
      type: "Industrial Tier",
      industry: "Metal & Sanitary Manufacturing",
    },
    {
      id: "peshawar",
      name: "Peshawar",
      region: "KPK",
      type: "Regional Tier",
      industry: "Cross-border Trade & Local Services",
    },
    {
      id: "multan",
      name: "Multan",
      region: "Punjab",
      type: "Regional Tier",
      industry: "Agriculture & Handicrafts Trade",
    },
    {
      id: "quetta",
      name: "Quetta",
      region: "Balochistan",
      type: "Regional Tier",
      industry: "Dry Fruit & Import/Export Logistics",
    },
    {
      id: "hyderabad",
      name: "Hyderabad",
      region: "Sindh",
      type: "Regional Tier",
      industry: "Retail, Crafts & Local Manufacturing",
    },
    {
      id: "bahawalpur",
      name: "Bahawalpur",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Agri-Tech & Local Education Hubs",
    },
    {
      id: "sargodha",
      name: "Sargodha",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Citrus Trade & Small Businesses",
    },
    {
      id: "sahiwal",
      name: "Sahiwal",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Dairy Trade & Startup Ventures",
    },
    {
      id: "sukkur",
      name: "Sukkur",
      region: "Sindh",
      type: "Emerging Tier",
      industry: "Wholesale Markets & Distribution",
    },
    {
      id: "jhang",
      name: "Jhang",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Local Crafts & Agri-trade",
    },
    {
      id: "larkana",
      name: "Larkana",
      region: "Sindh",
      type: "Emerging Tier",
      industry: "Local Services & Trade",
    },
    {
      id: "gujrat",
      name: "Gujrat",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Fan Manufacturing & Ceramics exports",
    },
    {
      id: "mardan",
      name: "Mardan",
      region: "KPK",
      type: "Emerging Tier",
      industry: "Agri-Processing & Retail",
    },
    {
      id: "kasur",
      name: "Kasur",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Leather Tanning & Textiles",
    },
    {
      id: "rahim-yar-khan",
      name: "Rahim Yar Khan",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Industrial Plants & Agri-processing",
    },
    {
      id: "sheikhupura",
      name: "Sheikhupura",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Rice Processing & Chemicals",
    },
    {
      id: "okara",
      name: "Okara",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Agri-farming & Small Businesses",
    },
    {
      id: "mingora",
      name: "Mingora",
      region: "KPK",
      type: "Emerging Tier",
      industry: "Tourism, Crafts & Services",
    },
    {
      id: "wah-cantt",
      name: "Wah Cantt",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Engineering & Heavy Industry",
    },
    {
      id: "dg-khan",
      name: "Dera Ghazi Khan",
      region: "Punjab",
      type: "Emerging Tier",
      industry: "Agri-Trading & Textiles",
    },
    {
      id: "mirpur-khas",
      name: "Mirpur Khas",
      region: "Sindh",
      type: "Emerging Tier",
      industry: "Agri-Horticulture & Markets",
    },
    {
      id: "abbottabad",
      name: "Abbottabad",
      region: "KPK",
      type: "Emerging Tier",
      industry: "Education & Tourism Services",
    },
    {
      id: "skardu",
      name: "Skardu",
      region: "Gilgit-Baltistan",
      type: "Emerging Tier",
      industry: "Adventure Tourism & Fruit exports",
    },
    {
      id: "gwadar",
      name: "Gwadar",
      region: "Balochistan",
      type: "Emerging Tier",
      industry: "Maritime Logistics & Port trade",
    },
  ];

  // Expose cities database globally so package-details.html script can access it
  window.pakistanCities = pakistanCities;

  // Helper: Map service type to key checklist deliverables
  function getPackageFeatures(service, price) {
    const baseFeatures = {
      WordPress: [
        "100% Responsive Design",
        "Premium Dynamic Layout",
        "Security Hardening & Cache",
        "30 Days Technical Support",
      ],
      Shopify: [
        "Premium Custom Liquid Theme",
        "COD Payment Gateway Integration",
        "Product Catalog Optimization",
        "Google Merchant Center Feed",
      ],
      "Custom Web": [
        "React / Next.js Framework Build",
        "High-Performance Speed (LCP < 1.5s)",
        "Scalable Database Integration",
        "Cloud Hosting Configuration",
      ],
      SEO: [
        "In-depth Audits & Keyword Maps",
        "On-Page & Schema Configuration",
        "High Domain Authority backlinks",
        "Google Search Console recovery",
      ],
      SMM: [
        "Professional Graphic Branding",
        "Short-form reels video edits",
        "Vibrant community management",
        "Active Audience Acquisition",
      ],
      Ads: [
        "Precision Meta Sales campaigns",
        "Pixel & CAPI Setup verification",
        "Audience Targeting & Retargeting",
        "ROAS Maximization Reporting",
      ],
      App: [
        "Cross-platform iOS & Android",
        "Clean Flutter code structure",
        "Firebase Database integration",
        "App Store submissions setup",
      ],
      Hybrid: [
        "Comprehensive Digital Suite",
        "Custom Web + Local Map SEO",
        "Meta Conversion Funnels",
        "Priority 24/7 Agency Liaison",
      ],
    };
    return (
      baseFeatures[service] || [
        "Premium Deliverable Structure",
        "Full Technical Roadmap",
        "Speed & Local Optimization",
        "100% Satisfaction Guarantee",
      ]
    );
  }

  // Helper: Map service type to branding icon
  function getServiceIcon(service) {
    const icons = {
      WordPress: "fab fa-wordpress text-info",
      Shopify: "fab fa-shopify text-success",
      "Custom Web": "fas fa-code text-primary",
      SEO: "fas fa-search-dollar text-warning",
      SMM: "fas fa-share-alt text-info",
      Ads: "fas fa-bullhorn text-danger",
      App: "fas fa-mobile-alt text-light",
      Hybrid: "fas fa-layer-group text-orange",
    };
    return icons[service] || "fas fa-concierge-bell text-gray";
  }

  const renderPackages = () => {
    if (!packageGrid) return;

    // Filter by Tier
    let filtered = packagesData;

    // Filter by Sub-Service Category
    if (currentServiceFilter === "web") {
      filtered = filtered.filter((p) =>
        ["WordPress", "Shopify", "Custom Web", "App"].includes(p.service),
      );
    } else if (currentServiceFilter === "seo") {
      filtered = filtered.filter((p) => p.service === "SEO");
    } else if (currentServiceFilter === "marketing") {
      filtered = filtered.filter((p) =>
        ["SMM", "Ads", "Hybrid"].includes(p.service),
      );
    }

    packageGrid.innerHTML = filtered
      .map((p) => {
        const featuresList = getPackageFeatures(p.service, p.price);
        const iconClass = getServiceIcon(p.service);
        const isPopular =
          p.name.includes("Elite") ||
          p.name.includes("Giant") ||
          p.name.includes("Dominator");

        return `
                <div class="col-md-6 col-lg-4 fade-in-up">
                    <div class="package-card p-4 d-flex flex-column position-relative ${isPopular ? "popular-card" : ""}">
                        ${isPopular ? `<span class="popular-tag badge bg-orange">Best Value</span>` : ""}
                        
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="tier-badge">${p.tier.replace("tier", "Tier ")}</span>
                            <div class="d-flex align-items-center gap-2">
                                <i class="${iconClass}"></i>
                                <span class="text-gray small fw-semibold">${p.service}</span>
                            </div>
                        </div>
                        
                        <h3 class="h4 outfit text-white mb-2">${p.name}</h3>
                        <p class="text-gray x-small mb-3 pb-3 border-bottom border-secondary border-opacity-25">${p.feature}</p>
                        
                        <ul class="list-unstyled mb-4 flex-grow-1">
                            ${featuresList
                              .map(
                                (f) => `
                                <li class="text-gray small d-flex align-items-start gap-2 mb-2">
                                    <i class="fas fa-check text-orange mt-1 small"></i>
                                    <span>${f}</span>
                                </li>
                            `,
                              )
                              .join("")}
                        </ul>
                        
                        <div class="pt-3 border-top border-secondary border-opacity-25 mt-auto">
                            <div class="d-flex justify-content-between align-items-baseline mb-4">
                                <div>
                                    <span class="text-orange display-6 fw-bold outfit">$${p.price}</span>
                                    <span class="text-gray small">/ package</span>
                                </div>
                                <span class="text-white small opacity-75 fw-medium">~${(p.price * 300).toLocaleString()} PKR</span>
                            </div>
                            
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-light w-50 py-2 btn-sm fw-semibold view-package-details" data-name="${encodeURIComponent(p.name)}">Details</button>
                                <a rel="nofollow noopener noreferrer" href="https://wa.me/923353453099?text=Hi%20SEO%20Ustaad!%20I%20want%20to%20order%20the%20${encodeURIComponent(p.name)}%20package%20($${p.price})." target="_blank" class="btn btn-orange w-50 py-2 btn-sm fw-bold">Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  };

  // Bind Main Tier Navigation clicks
  tierButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tierButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Reset sub-filter to 'all' on tier change
      currentTier = btn.dataset.tier;
      currentServiceFilter = "all";

      if (serviceFilters) {
        const subBtns = serviceFilters.querySelectorAll("button");
        subBtns.forEach((sb) => sb.classList.remove("active"));
        const allBtn = serviceFilters.querySelector('[data-service="all"]');
        if (allBtn) allBtn.classList.add("active");
      }

      renderPackages();
    });
  });

  // Bind Sub-service Category Filter clicks
  if (serviceFilters) {
    const subBtns = serviceFilters.querySelectorAll("button");
    subBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        subBtns.forEach((sb) => sb.classList.remove("active"));
        btn.classList.add("active");
        currentServiceFilter = btn.dataset.service;
        renderPackages();
      });
    });
  }

  // Initialize Default Package Grid
  renderPackages();

  // Bind dynamic Modal launching for Detailed deliverables
  document.addEventListener("click", (e) => {
    const detailBtn = e.target.closest(".view-package-details");
    if (detailBtn) {
      const name = decodeURIComponent(detailBtn.dataset.name);
      const p = packagesData.find((item) => item.name === name);
      if (p) {
        document.getElementById("packageDetailsModalLabel").innerText = p.name;
        document.getElementById("modalPackageTier").innerText = p.tier.replace(
          "tier",
          "Tier ",
        );

        const featuresList = getPackageFeatures(p.service, p.price);
        const iconClass = getServiceIcon(p.service);

        document.getElementById("modalPackageBody").innerHTML = `
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div class="p-3 bg-secondary bg-opacity-10 rounded-3 border border-secondary border-opacity-25">
                            <i class="${iconClass} fa-2x"></i>
                        </div>
                        <div>
                            <span class="text-orange fw-bold d-block fs-3 outfit">$${p.price} <span class="fs-6 fw-normal text-gray">/ package</span></span>
                            <span class="text-gray small">~${(p.price * 300).toLocaleString()} PKR (Est.)</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <h6 class="text-white fw-bold mb-2">Scope of Work</h6>
                        <p class="text-gray small">${p.feature}. Managed specifically for the target economic tier of your cities.</p>
                    </div>
                    <div>
                        <h6 class="text-white fw-bold mb-3">Key Deliverables</h6>
                        <ul class="list-unstyled">
                            ${featuresList
                              .map(
                                (f) => `
                                <li class="text-gray small d-flex align-items-start gap-2 mb-3">
                                    <i class="fas fa-check-circle text-orange mt-1"></i>
                                    <span>${f}</span>
                                </li>
                            `,
                              )
                              .join("")}
                            <li class="text-gray small d-flex align-items-start gap-2 mb-3">
                                <i class="fas fa-check-circle text-orange mt-1"></i>
                                <span>Complete handover files & documentation</span>
                            </li>
                        </ul>
                    </div>
                `;

        const orderBtn = document.getElementById("modalOrderBtn");
        orderBtn.href = `https://wa.me/923353453099?text=Hi%20SEO%20Ustaad!%20I%20want%20to%20order%20the%20${encodeURIComponent(p.name)}%20package%20($${p.price}).`;

        if (typeof bootstrap !== "undefined") {
          const myModal = new bootstrap.Modal(
            document.getElementById("packageDetailsModal"),
          );
          myModal.show();
        }
      }
    }
  });

  // 6. Dynamic FAQs (AEO, GEO & SEO Optimized)
  window.defaultFaqs = [
    {
      q: "How much time does it take to see results?",
      a: "For Local SEO and GMB ranking, noticeable improvements typically occur within 3-4 weeks. For broader Technical and E-Commerce SEO, significant traffic jumps happen between 2-3 months as Google indexes the advanced optimizations and toxic link disavowals.",
    },
    {
      q: "Do you offer custom web development and bug fixing?",
      a: "Yes. We offer complete custom web development using Next.js and React, as well as premium bug fixing and speed optimization for WordPress, Shopify, and WooCommerce stores.",
    },
    {
      q: "How do your SEO packages work?",
      a: "We provide tailored, one-off premium services. Instead of monthly retainers locking you in, you can order specific optimizations (like Schema Markup, Toxic Backlink Disavowal, or Speed Optimization) exactly when you need them. However, we do offer a comprehensive Monthly Retainer for clients who want us to dominate their local city.",
    },
    {
      q: "What is AEO and why does it matter?",
      a: "Answer Engine Optimization (AEO) ensures your website is structured with proper Schema Markup and precise semantic content so that AI search engines (like ChatGPT, Google SGE, and Perplexity) use your business as the definitive answer.",
    },
  ];
  const faqData = window.pageSpecificFaqs || window.defaultFaqs;

  const faqAccordion = document.getElementById("faqAccordion");

  // Inject Structured JSON-LD FAQPage Schema for Search Crawlers
  function injectFaqSchema() {
    const existingSchema = document.getElementById("faqSchemaLD");
    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    };

    const script = document.createElement("script");
    script.id = "faqSchemaLD";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Render FAQs dynamically with search filtering support
  function renderFaqs(filterText = "") {
    if (!faqAccordion) return;

    const normalizedFilter = filterText.toLowerCase().trim();
    const filtered = faqData.filter(
      (f) =>
        f.q.toLowerCase().includes(normalizedFilter) ||
        f.a.toLowerCase().includes(normalizedFilter),
    );

    if (filtered.length === 0) {
      faqAccordion.innerHTML = `
                <div class="text-center py-5 text-gray stagger-reveal">
                    <i class="fas fa-question-circle fa-2x mb-3 text-secondary"></i>
                    <p>No matching questions found. Try searching for "SEO", "Shopify", or "Karachi".</p>
                </div>
            `;
      return;
    }

    faqAccordion.innerHTML = filtered
      .map((f, index) => {
        const originalIndex = faqData.findIndex((item) => item.q === f.q);
        const isFirst = index === 0 && !normalizedFilter;
        return `
                <div class="accordion-item ${isFirst ? "active-item" : ""}" data-index="${originalIndex}">
                    <h2 class="accordion-header">
                        <button class="accordion-button ${isFirst ? "" : "collapsed"} d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#faq${originalIndex}" aria-expanded="${isFirst}" aria-controls="faq${originalIndex}">
                            <span class="pe-3">${f.q}</span>
                            <span class="faq-icon-wrapper">
                                <i class="fas fa-chevron-down transition-300"></i>
                            </span>
                        </button>
                    </h2>
                    <div id="faq${originalIndex}" class="accordion-collapse collapse ${isFirst ? "show" : ""}" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            ${f.a}
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  // Initialize FAQ state
  if (faqAccordion) {
    renderFaqs();
    injectFaqSchema();

    // Listen for collapse transitions to toggle active style borders
    faqAccordion.addEventListener("show.bs.collapse", (e) => {
      const item = e.target.closest(".accordion-item");
      if (item) {
        item.classList.add("active-item");
      }
    });

    faqAccordion.addEventListener("hide.bs.collapse", (e) => {
      const item = e.target.closest(".accordion-item");
      if (item) {
        item.classList.remove("active-item");
      }
    });
  }

  // Bind real-time search filter input
  const faqSearchInput = document.getElementById("faqSearchInput");
  if (faqSearchInput) {
    faqSearchInput.addEventListener("input", (e) => {
      renderFaqs(e.target.value);
    });
  }

  // 7. Curated Testimonials Dataset (AEO, GEO & SEO Optimized)
  const testimonialsData = [
    {
      name: "Zeeshan A.",
      role: "E-commerce Owner, Karachi",
      category: "ads",
      quote:
        "SEO Ustaad scaled our Shopify store sales to 8.4M PKR in just 45 days. The ROAS on Meta Ads went from 2.1 to 6.8!",
      gradient: "avatar-grad-1",
    },
    {
      name: "Fatima K.",
      role: "Fashion Brand, Lahore",
      category: "web",
      quote:
        "The custom Shopify Liquid theme they built is blazing fast. Page loads dropped below 1.2s, and our conversion rate doubled.",
      gradient: "avatar-grad-2",
    },
    {
      name: "M. Usman",
      role: "Leather Exporter, Sialkot",
      category: "seo",
      quote:
        "Our B2B website is now ranking #1 in the US and Germany for leather goods. We are flooded with direct organic inquiries!",
      gradient: "avatar-grad-3",
    },
    {
      name: "Maliha Q.",
      role: "SaaS Founder, Islamabad",
      category: "seo",
      quote:
        "ChatGPT and Gemini are now directly citing our software brand as the top solution. Their AEO strategy is absolutely legendary!",
      gradient: "avatar-grad-4",
    },
    {
      name: "Hamza N.",
      role: "Retail Chain, Faisalabad",
      category: "ads",
      quote:
        "Their local store traffic Meta Ads campaigns are extremely profitable. We've seen a 300% increase in walk-in customer leads.",
      gradient: "avatar-grad-1",
    },
    {
      name: "Ayesha B.",
      role: "Clinic Director, Multan",
      category: "web",
      quote:
        "Excellent web development. They delivered a highly professional medical booking portal with automated WhatsApp reminders.",
      gradient: "avatar-grad-2",
    },
    {
      name: "Bilal S.",
      role: "Rice Mill Owner, Gujranwala",
      category: "seo",
      quote:
        "Best SEO agency in Pakistan. They resolved our Google core update issues and recovered 100% of our organic search traffic.",
      gradient: "avatar-grad-3",
    },
    {
      name: "Sana T.",
      role: "Agency Lead, Peshawar",
      category: "web",
      quote:
        "We outsourced our Next.js custom web projects to SEO Ustaad. Their technical code quality and API integrations are flawless.",
      gradient: "avatar-grad-4",
    },
    {
      name: "Omer F.",
      role: "Real Estate, Lahore",
      category: "ads",
      quote:
        "Highly professional leads generation team. Our property conversion cost decreased by 40% while lead quality improved.",
      gradient: "avatar-grad-1",
    },
    {
      name: "Zainab M.",
      role: "Jewelry Designer, Karachi",
      category: "web",
      quote:
        "The customized WooCommerce store they designed runs so smoothly. The checkout flow is extremely optimized for mobile shoppers.",
      gradient: "avatar-grad-2",
    },
    {
      name: "Farhan T.",
      role: "Logistics Provider, Rawalpindi",
      category: "seo",
      quote:
        "Incredible Local SEO! Our warehouse and cargo services are ranking in the top 3 on Google Maps across the twin cities.",
      gradient: "avatar-grad-3",
    },
    {
      name: "Hina S.",
      role: "Organic Foods, Islamabad",
      category: "ads",
      quote:
        "Our monthly subscription sales doubled after SEO Ustaad restructured our Meta Advantage+ campaigns.",
      gradient: "avatar-grad-4",
    },
    {
      name: "Saad K.",
      role: "Surgical Instruments, Sialkot",
      category: "seo",
      quote:
        "Global SEO expert indeed. We got three major bulk orders from European medical buyers within 4 months of launching.",
      gradient: "avatar-grad-1",
    },
    {
      name: "Maryam A.",
      role: "Education Tech, Lahore",
      category: "web",
      quote:
        "Our online portal was rebuilt using Next.js. It handles 5,000+ concurrent students with absolutely zero lag. Highly recommended.",
      gradient: "avatar-grad-2",
    },
    {
      name: "Ali H.",
      role: "Textile Manufacturer, Faisalabad",
      category: "seo",
      quote:
        "We started ranking on high-value B2B export terms. The quality of wholesale buyers coming from Google is outstanding.",
      gradient: "avatar-grad-3",
    },
    {
      name: "Nadia R.",
      role: "Skincare Brand, Karachi",
      category: "ads",
      quote:
        "Their TikTok and Reels video creatives converted like crazy. The cost per purchase decreased by 35% in our recent SMM push.",
      gradient: "avatar-grad-4",
    },
    {
      name: "Waleed G.",
      role: "Auto Parts, Lahore",
      category: "web",
      quote:
        "Clean code, amazing page speed, and seamless database integration. The custom inventory search tool is super fast.",
      gradient: "avatar-grad-1",
    },
    {
      name: "Amna D.",
      role: "Handicrafts, Peshawar",
      category: "seo",
      quote:
        "Our Etsy and Shopify traffic grew globally. Their search engine strategy helped us reach customers in the US and UK.",
      gradient: "avatar-grad-2",
    },
    {
      name: "Talha Y.",
      role: "Tech Startup, Islamabad",
      category: "ads",
      quote:
        "Their lead generation campaigns for our B2B software yielded premium enterprise leads. Excellent communication throughout.",
      gradient: "avatar-grad-3",
    },
    {
      name: "Sidra J.",
      role: "Furniture Showroom, Karachi",
      category: "web",
      quote:
        "A beautiful, premium catalog website. It matches our brand identity perfectly and has boosted our showroom walk-ins.",
      gradient: "avatar-grad-4",
    },
    {
      name: "Shahbaz M.",
      role: "Sports Goods, Sialkot",
      category: "seo",
      quote:
        "The technical SEO audit they performed resolved our crawl budget issues. Our Google search impressions tripled.",
      gradient: "avatar-grad-1",
    },
    {
      name: "Rabia L.",
      role: "Home Decor, Lahore",
      category: "ads",
      quote:
        "SEO Ustaad's Meta Ads strategy helped us clear out our end-of-season inventory in less than 2 weeks with high ROI.",
      gradient: "avatar-grad-2",
    },
    {
      name: "Kamran W.",
      role: "Construction Group, Rawalpindi",
      category: "web",
      quote:
        "Our new corporate portal is extremely modern and fast. The interactive project showcase works beautifully on mobile.",
      gradient: "avatar-grad-3",
    },
    {
      name: "Maria P.",
      role: "Organic Cosmetics, Islamabad",
      category: "seo",
      quote:
        "Our blog articles are now being featured as Google Rich Snippets and recommended by voice search agents. Superb work!",
      gradient: "avatar-grad-4",
    },
    {
      name: "Fahad S.",
      role: "Fitness Brand, Karachi",
      category: "ads",
      quote:
        "Their social media campaigns built massive brand awareness. Our gym membership sign-ups hit record numbers this quarter.",
      gradient: "avatar-grad-1",
    },
  ];

  const testimonialGrid = document.getElementById("testimonialGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreContainer = document.getElementById("loadMoreContainer");

  let currentCategory = "all";
  let visibleCount = 4; // Show 4 items initially on the right column grid

  function renderTestimonials(resetCount = false) {
    if (!testimonialGrid) return;

    if (resetCount) {
      visibleCount = 4;
    }

    const filtered = testimonialsData.filter(
      (t) => currentCategory === "all" || t.category === currentCategory,
    );

    const sliced = filtered.slice(0, visibleCount);

    testimonialGrid.innerHTML = sliced
      .map(
        (t) => `
            <div class="col-md-6 fade-in-up">
                <div class="testimonial-card">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="text-white mb-3 italic">"${t.quote}"</p>
                    <div class="d-flex align-items-center mt-auto">
                        <div class="avatar-ring ${t.gradient} text-white me-3 d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; min-width: 40px;">
                            ${t.name[0]}
                        </div>
                        <div>
                            <h6 class="mb-0 text-white">${t.name}</h6>
                            <small class="text-orange">${t.role}</small>
                        </div>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    // Toggle "Load More" container visibility
    if (loadMoreContainer) {
      if (visibleCount >= filtered.length) {
        loadMoreContainer.style.display = "none";
      } else {
        loadMoreContainer.style.display = "block";
      }
    }
  }

  // Initialize testimonials state
  if (testimonialGrid) {
    renderTestimonials();

    // Bind filter pill buttons click handler
    const filterButtons = document.querySelectorAll(
      "#testimonialFilters .filter-btn",
    );
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        renderTestimonials(true);
      });
    });

    // Bind Load More button handler with loader feedback
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        const icon = loadMoreBtn.querySelector("i");
        if (icon) {
          icon.classList.add("fa-spin");
        }
        loadMoreBtn.disabled = true;

        setTimeout(() => {
          visibleCount += 4;
          renderTestimonials(false);

          if (icon) {
            icon.classList.remove("fa-spin");
          }
          loadMoreBtn.disabled = false;
        }, 400); // Small delay to feel organic
      });
    }
  }

  // 8. Hash Link Handler (Fix for incoming links like #packages)
  const handleHash = () => {
    const hash = window.location.hash;
    if (hash) {
      // Remove # to find element
      const targetId = hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 600); // Slightly longer wait for grid rendering
      }
    }
  };
  handleHash();

  // 10. Viewport Scroll Observer for Staggered Animations
  const staggerObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, staggerObserverOptions);

  document.querySelectorAll(".stagger-reveal").forEach((el) => {
    staggerObserver.observe(el);
  });

  // 11. Multi-step Form Logic
  const multiForm = document.getElementById("heroMultistepForm");
  if (multiForm) {
    const steps = Array.from(multiForm.querySelectorAll(".form-step"));
    const prevBtn = document.getElementById("prevStepBtn");
    const nextBtn = document.getElementById("nextStepBtn");
    const submitBtn = document.getElementById("submitFormBtn");
    const stepIndicator = document.getElementById("stepIndicator");
    const progressPercent = document.getElementById("stepProgressPercent");
    const progressBar = document.getElementById("stepProgressBar");
    const loadingOverlay = document.getElementById("formLoadingOverlay");
    const successMessage = document.getElementById("formSuccessMessage");
    const restartBtn = document.getElementById("restartFormBtn");

    let currentStep = 1;
    let transitionTimeout = null;

    // Spotlight follow glow for form card
    const formCard = document.querySelector(".hero-form-card");
    if (formCard) {
      formCard.addEventListener("mousemove", (e) => {
        const rect = formCard.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        formCard.style.setProperty("--mouse-x", `${mouseX}px`);
        formCard.style.setProperty("--mouse-y", `${mouseY}px`);
      });
    }

    // Cascade Logic: Category -> Gig -> Price
    const categoryRadios = multiForm.querySelectorAll('input[name="category"]');
    const gigSelect = document.getElementById("gigSelect");
    const displayPrice = document.getElementById("displayPrice");
    const hiddenPriceInput = document.getElementById("hiddenPriceInput");
    const gigsDataEl = document.getElementById("gigsData");

    let allGigs = [];
    if (gigsDataEl) {
      try {
        allGigs = JSON.parse(gigsDataEl.textContent);
      } catch (e) {}
    }

    if (categoryRadios.length > 0 && gigSelect) {
      const populateDropdown = (cat, preselectName = null) => {
        const filtered = allGigs.filter((g) => g.category === cat);

        gigSelect.innerHTML =
          '<option value="" disabled selected>Select a specific gig...</option>';
        filtered.forEach((g) => {
          const isSelected = g.name === preselectName ? "selected" : "";
          gigSelect.innerHTML += `<option value="${g.name}" data-price="${g.price}" ${isSelected}>${g.name}</option>`;
        });

        if (preselectName) {
          const selectedGig = filtered.find((g) => g.name === preselectName);
          if (selectedGig) {
            displayPrice.innerText = selectedGig.price;
            hiddenPriceInput.value = selectedGig.price;
          }
        } else {
          displayPrice.innerText = "Select a gig to view price";
          hiddenPriceInput.value = "";
        }
      };

      categoryRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
          populateDropdown(e.target.value);
        });
      });

      gigSelect.addEventListener("change", (e) => {
        const selectedOption = gigSelect.options[gigSelect.selectedIndex];
        const price = selectedOption.getAttribute("data-price");
        if (price) {
          displayPrice.innerText = price;
          hiddenPriceInput.value = price;
        }
      });

      // Handle pre-selected logic on load
      const checkedCat = multiForm.querySelector(
        'input[name="category"]:checked',
      );
      if (checkedCat) {
        const preselectedGigName = gigSelect.getAttribute("data-preselected");
        populateDropdown(checkedCat.value, preselectedGigName);
      }
    }

    const updateFormUI = (direction = null) => {
      if (transitionTimeout) clearTimeout(transitionTimeout);

      // Toggle steps visibility with slide animations
      steps.forEach((step) => {
        const stepNum = parseInt(step.dataset.step);

        step.classList.remove(
          "active-step",
          "form-step-slide-in-right",
          "form-step-slide-out-left",
          "form-step-slide-in-left",
          "form-step-slide-out-right",
        );

        if (stepNum === currentStep) {
          if (direction === "next") {
            step.classList.add("form-step-slide-in-right");
          } else if (direction === "prev") {
            step.classList.add("form-step-slide-in-left");
          } else {
            step.classList.add("active-step");
          }
        } else if (stepNum === currentStep - 1 && direction === "next") {
          step.classList.add("form-step-slide-out-left");
        } else if (stepNum === currentStep + 1 && direction === "prev") {
          step.classList.add("form-step-slide-out-right");
        }
      });

      // Clean up transition classes after animation completes (400ms)
      if (direction) {
        transitionTimeout = setTimeout(() => {
          steps.forEach((step) => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove(
              "form-step-slide-in-right",
              "form-step-slide-out-left",
              "form-step-slide-in-left",
              "form-step-slide-out-right",
            );
            if (stepNum === currentStep) {
              step.classList.add("active-step");
            }
          });
        }, 400);
      }

      // Toggle buttons
      if (currentStep === 1) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
      }

      if (currentStep === steps.length) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
        generateSummary();
      } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
      }

      // Update Progress Indicator
      const percent = Math.round((currentStep / steps.length) * 100);
      stepIndicator.innerText = `Step ${currentStep} of ${steps.length}`;
      progressPercent.innerText = `${percent}% Complete`;
      progressBar.style.width = `${percent}%`;
      progressBar.setAttribute("aria-valuenow", percent);
    };

    const validateStep = (stepNum) => {
      const stepEl = multiForm.querySelector(
        `.form-step[data-step="${stepNum}"]`,
      );
      if (!stepEl) return true;

      // Select all required fields in this step
      const inputs = stepEl.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (input.type === "radio") {
          const name = input.name;
          const checkedRadio = stepEl.querySelector(
            `input[name="${name}"]:checked`,
          );
          if (!checkedRadio) {
            isValid = false;
          }
        } else if (!input.value.trim()) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
          // Email verification
          if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
              isValid = false;
              input.classList.add("is-invalid");
            }
          }
        }
      });

      return isValid;
    };

    const generateSummary = () => {
      const service =
        multiForm.querySelector('select[name="service"]')?.value || "-";
      const location =
        multiForm.querySelector('select[name="location"]')?.value || "-";
      const budget = document.getElementById("hiddenPriceInput")?.value || "-";
      const name = multiForm.querySelector('input[name="name"]')?.value || "-";
      const phone =
        multiForm.querySelector('input[name="phone"]')?.value || "-";

      document.getElementById("summaryService").innerText = service;
      document.getElementById("summaryLocation").innerText = location;
      document.getElementById("summaryBudget").innerText = budget;
      document.getElementById("summaryName").innerText = name;
      document.getElementById("summaryPhone").innerText = phone;

      // Setup dynamic WhatsApp link for success screen
      const successWaBtn = document.getElementById("successWaBtn");
      if (successWaBtn) {
        const goals =
          multiForm.querySelector('textarea[name="goals"]').value || "";
        const timeline =
          multiForm.querySelector('select[name="timeline"]').value || "";
        const email =
          multiForm.querySelector('input[name="email"]').value || "";

        const waText =
          `Hi SEO Ustaad! I just submitted your project analysis request form.\n\n` +
          `*Name*: ${name}\n` +
          `*WhatsApp*: ${phone}\n` +
          `*Email*: ${email}\n` +
          `*Service*: ${service}\n` +
          `*Location*: ${location}\n` +
          `*Budget*: ${budget}\n` +
          `*Timeline*: ${timeline}\n` +
          `*Goals*: ${goals}`;

        successWaBtn.href = `https://wa.me/923353453099?text=${encodeURIComponent(waText)}`;
      }
    };

    // Event Listeners for Nav buttons
    nextBtn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length) {
          currentStep++;
          updateFormUI("next");
        }
      } else {
        multiForm.classList.add("was-validated");
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateFormUI("prev");
      }
    });

    // Clear Bootstrap validation styles on input
    multiForm.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("is-invalid");
        multiForm.classList.remove("was-validated");
      });
    });

    // AJAX Formspree submission handler
    multiForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateStep(currentStep)) {
        multiForm.classList.add("was-validated");
        return;
      }

      // Show loading spinner
      loadingOverlay.classList.remove("d-none");
      loadingOverlay.classList.add("d-flex");

      // Gather form values into JSON
      const formData = new FormData(this);
      const dataObject = {};
      formData.forEach((value, key) => {
        dataObject[key] = value;
      });

      // Fetch POST to Formspree endpoint
      fetch("https://formspree.io/f/mkowzgeb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataObject),
      })
        .then((response) => {
          loadingOverlay.classList.remove("d-flex");
          loadingOverlay.classList.add("d-none");
          if (response.ok) {
            successMessage.classList.remove("d-none");
            successMessage.classList.add("d-flex");
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, "errors")) {
                alert(
                  "Submission failed: " +
                    data["errors"].map((error) => error["message"]).join(", "),
                );
              } else {
                alert(
                  "Oops! There was a problem submitting your form. Please try again.",
                );
              }
            });
          }
        })
        .catch((error) => {
          loadingOverlay.classList.remove("d-flex");
          loadingOverlay.classList.add("d-none");
          alert(
            "Network error: Could not submit the form. Please check your connection and try again.",
          );
        });
    });

    // Reset form on restart button click
    restartBtn.addEventListener("click", () => {
      multiForm.reset();
      currentStep = 1;
      successMessage.classList.remove("d-flex");
      successMessage.classList.add("d-none");
      multiForm.classList.remove("was-validated");
      const defaultService = multiForm.querySelector(
        'input[name="service"][value="Web Development"]',
      );
      if (defaultService) defaultService.checked = true;
      const defaultBudget = multiForm.querySelector(
        'input[name="budget"][value="$100 - $300"]',
      );
      if (defaultBudget) defaultBudget.checked = true;
      updateFormUI();
    });

    // Initialize
    updateFormUI();
  }

  // 12. Floating Back to Top Logic (Toggled by scrolling past 300px)
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 13. Advanced WhatsApp Widget Toggle
  const waWidget = document.getElementById("whatsappCTA");
  if (waWidget) {
    const trigger = waWidget.querySelector(".whatsapp-trigger-btn");
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      waWidget.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!waWidget.contains(e.target)) {
        waWidget.classList.remove("active");
      }
    });
  }

  // 14. Services Cards Spotlight & 3D Tilt Hover Effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      // Disable 3D tilt on touch devices or small screens
      if (window.innerWidth < 992) return;

      const rect = card.getBoundingClientRect();

      // X and Y cursor coordinates relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Mouse coordinates relative to card top-left in pixels (for spotlight)
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Max degrees of tilt
      const maxTilt = 8;
      const tiltX = -(y / (rect.height / 2)) * maxTilt;
      const tiltY = (x / (rect.width / 2)) * maxTilt;

      // Set custom properties
      card.style.setProperty("--mouse-x", `${mouseX}px`);
      card.style.setProperty("--mouse-y", `${mouseY}px`);
      card.style.setProperty("--tilt-x", `${tiltX}deg`);
      card.style.setProperty("--tilt-y", `${tiltY}deg`);
    });

    card.addEventListener("mouseleave", () => {
      // Reset transforms and spotlight slowly
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });

  // 15. Explore Services Deep-linking to Packages Grid
  const exploreButtons = document.querySelectorAll(".explore-service-btn");
  exploreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      const packagesSection = document.getElementById("packages");

      if (packagesSection) {
        // Smooth scroll to packages section with offset
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = packagesSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Automatically activate corresponding filter button
        if (typeof serviceFilters !== "undefined" && serviceFilters) {
          const subFilterBtn = serviceFilters.querySelector(
            `button[data-service="${category}"]`,
          );
          if (subFilterBtn) {
            subFilterBtn.click();
          }
        }
      }
    });
  });

  // 9. Console Hello (AEO related trust signal)
  console.log(
    "%cSEO Ustaad Digital Agency",
    "color: #FF6600; font-size: 20px; font-weight: bold;",
  );
  console.log("Optimizing for Pakistan 2026. WhatsApp: +923353453099");
});

// PWA Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration.scope);
      })
      .catch((error) => {
        console.log("SW registration failed: ", error);
      });
  });
}

// Dynamic WhatsApp Widget Logic
document.addEventListener("DOMContentLoaded", () => {
  const waWidgetChatBtn = document.getElementById("waWidgetChatBtn");
  if (waWidgetChatBtn) {
    waWidgetChatBtn.addEventListener("click", () => {
      const serviceSelect = document.getElementById("waWidgetService");
      const locationSelect = document.getElementById("waWidgetLocation");

      const service =
        serviceSelect && serviceSelect.value
          ? serviceSelect.value
          : "your services";
      const location =
        locationSelect && locationSelect.value ? locationSelect.value : "";

      let text = `Hi SEO Ustaad! I want to discuss ${service}`;
      if (location) {
        text += ` targeting ${location}`;
      }
      text += `. Can we connect?`;

      window.open(
        `https://wa.me/923353453099?text=${encodeURIComponent(text)}`,
        "_blank",
      );
    });
  }
});

window.openWhatsAppChat = function (phone) {
  if (!phone) phone = "923353453099";
  const serviceSelect = document.getElementById("waWidgetService");
  const locationSelect = document.getElementById("waWidgetLocation");

  const service =
    serviceSelect && serviceSelect.value
      ? serviceSelect.value
      : "your services";
  const location =
    locationSelect && locationSelect.value ? locationSelect.value : "";

  let text = `Hi SEO Ustaad! I want to discuss ${service}`;
  if (location) {
    text += ` targeting ${location}`;
  }
  text += `. Can we connect?`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

// Smart Widget Quick FAQs Logic
document.addEventListener("DOMContentLoaded", () => {
  const serviceSelect = document.getElementById("waWidgetService");
  const locationSelect = document.getElementById("waWidgetLocation");
  const quickFaqsContainer = document.getElementById("waWidgetQuickFaqs");

  if (quickFaqsContainer) {
    function updateQuickFaqs() {
      const service =
        serviceSelect && serviceSelect.value ? serviceSelect.value : "";
      const loc =
        locationSelect && locationSelect.value ? locationSelect.value : "";

      // Generate some dynamic FAQs
      let dynamicFaqs = [];
      if (service) {
        dynamicFaqs.push(`What does the ${service} package include?`);
        dynamicFaqs.push(`How fast can you start working on ${service}?`);
      }
      if (loc) {
        dynamicFaqs.push(`Do you have case studies for clients in ${loc}?`);
      }

      if (dynamicFaqs.length === 0) {
        dynamicFaqs = [
          "How much for a custom Shopify store?",
          "What are your premium SEO packages?",
          "How to start with Meta Ads?",
        ];
      }

      // Limit to 3 items to save space
      dynamicFaqs = dynamicFaqs.slice(0, 3);

      quickFaqsContainer.innerHTML = "";
      dynamicFaqs.forEach((faq) => {
        const a = document.createElement("a");
        a.href = "javascript:void(0)";
        // Call openWhatsAppChat with Agent 1 by default, but pass the specific question
        a.onclick = function () {
          const phone = "923353453099";
          let text = `Hi SEO Ustaad! I have a question: ${faq}`;
          window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
            "_blank",
          );
        };
        a.className =
          "wa-widget-faq-link d-flex justify-content-between align-items-center p-2 rounded text-decoration-none border border-secondary border-opacity-25 mb-1";

        const span = document.createElement("span");
        span.className = "text-white small";
        span.textContent = faq;

        const i = document.createElement("i");
        i.className = "fas fa-chevron-right text-orange x-small";

        a.appendChild(span);
        a.appendChild(i);

        quickFaqsContainer.appendChild(a);
      });
    }

    // Initial population
    updateQuickFaqs();

    // Listeners
    if (serviceSelect)
      serviceSelect.addEventListener("change", updateQuickFaqs);
    if (locationSelect)
      locationSelect.addEventListener("change", updateQuickFaqs);
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // --- Text-to-HTML Ratio Fix: Dynamic Dropdowns ---
  const locationDropdown = document.querySelector('select[name="location"]');
  const waLocationDropdown = document.getElementById('waWidgetLocation');
  const waServiceDropdown = document.getElementById('waWidgetService');

  if (locationDropdown || waLocationDropdown) {
    const locationsHtml = pakistanCities.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    if (locationDropdown) {
        // Keep the first option
        const firstOpt = locationDropdown.innerHTML;
        locationDropdown.innerHTML = firstOpt + locationsHtml;
    }
    if (waLocationDropdown) {
        const firstOptWa = waLocationDropdown.innerHTML;
        waLocationDropdown.innerHTML = firstOptWa + locationsHtml;
    }
  }

  if (waServiceDropdown) {
    const servicesHtml = packagesData.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
    const firstOptSvc = waServiceDropdown.innerHTML;
    waServiceDropdown.innerHTML = firstOptSvc + servicesHtml;
  }
}); // End DOMContentLoaded

