export const collectionsDetailed = [
  {
    id: 1,
    slug: "kitchens",
    title: "Luxury Modular Kitchens",
    label: "Modular Kitchens",
    tagline: "Where Precision Meets Passion",
    overview: "Our signature modular kitchens are engineered with absolute precision, combining European mechanical hardware with handpicked natural materials. Every cabinet, drawer, and surface is designed to elevate the everyday culinary experience into a ritual of luxury.",
    heroImage: "/images/hero/walnut.png",
    
    // New: Configurations
    configurations: [
      {
        id: "layout",
        title: "Layout Configurations",
        description: "Choose from L-Shape, U-Shape, Galley, or Single-Wall layouts, fully customised to the architectural dimensions of your space.",
        image: "/images/projects/project_open_kitchen_1784361404302.png"
      },
      {
        id: "hardware",
        title: "Hardware Systems",
        description: "Select from Handleless J-Profile, Push-to-Open mechanisms, or premium milled edge pulls in brushed brass or gunmetal.",
        image: "/images/difference/diff_precision_1784362852741.png"
      },
      {
        id: "lighting",
        title: "Integrated Lighting",
        description: "Continuous LED profile lighting milled directly into the cabinetry, offering warm task lighting and ambient glows.",
        image: "/images/difference/diff_italian_1784362822206.png"
      }
    ],

    gallery: [
      "/images/projects/project_walnut_kitchen_1784361383210.png",
      "/images/projects/project_open_kitchen_1784361404302.png",
      "/images/projects/project_white_kitchen_1784361394052.png",
      "/images/difference/diff_italian_1784362822206.png"
    ],
    
    // Updated: Materials with images for swatch interaction
    materials: [
      { name: "Natural Walnut", image: "/images/materials/material_walnut_1784361156242.png" },
      { name: "Matte Lacquer", image: "/images/materials/material_matte_lacquer_1784361194609.png" },
      { name: "Calacatta Marble", image: "/images/materials/material_marble_1784361227712.png" },
      { name: "Smoked Oak", image: "/images/materials/material_smoked_oak_1784361183682.png" }
    ],

    specs: [
      { label: "Cabinet Depth", value: "600mm" },
      { label: "Counter Height", value: "850–900mm" },
      { label: "Hardware", value: "Blum / Hettich" },
      { label: "Warranty", value: "10 Years" },
      { label: "Core Material", value: "BWR Marine Plywood" },
      { label: "Load Capacity", value: "40kg per drawer" }
    ],

    // New: Specific FAQs
    faqs: [
      {
        id: "faq-1",
        question: "How long does a kitchen installation take?",
        answer: "From initial design approval to final installation, the process typically takes 6-8 weeks. The physical installation in your home takes roughly 3-5 days depending on the scale."
      },
      {
        id: "faq-2",
        question: "Can I integrate my existing appliances?",
        answer: "Yes. Our design team will take precise measurements of your existing appliances to ensure seamless integration, or we can recommend premium built-in appliances from our partners."
      },
      {
        id: "faq-3",
        question: "Are the materials water-resistant?",
        answer: "Absolutely. We use BWR (Boiling Water Resistant) marine-grade plywood for all our kitchen cores, ensuring maximum durability against moisture and humidity."
      }
    ],

    // New: Related Projects
    relatedProjects: [
      {
        title: "The Walnut Residence",
        location: "Mumbai",
        image: "/images/projects/project_walnut_kitchen_1784361383210.png",
        href: "/projects" // Normally this would link to the specific project detail
      },
      {
        title: "Minimalist White Villa",
        location: "Delhi",
        image: "/images/projects/project_white_kitchen_1784361394052.png",
        href: "/projects"
      }
    ]
  },
  {
    id: 2,
    slug: "wardrobes",
    title: "Walk-in Wardrobes",
    label: "Walk-in Wardrobes",
    tagline: "Curated Elegance, Organized Living",
    overview: "Our walk-in wardrobes transform everyday dressing into a luxury experience. Featuring integrated LED lighting, custom drawer dividers, and whisper-quiet sliding mechanisms.",
    heroImage: "/images/hero/wardrobe.png",
    
    configurations: [
      {
        id: "doors",
        title: "Door Systems",
        description: "Choose from open-concept layouts, slim-profile sliding glass doors, or traditional hinged doors with soft-close integration.",
        image: "/images/hero/wardrobe.png"
      },
      {
        id: "internals",
        title: "Internal Organizers",
        description: "Velvet-lined jewellery trays, integrated watch winders, and pull-out shoe racks tailored to your specific collection.",
        image: "/images/difference/diff_storage_1784362863234.png"
      }
    ],

    gallery: [
      "/images/hero/wardrobe.png",
      "/images/difference/diff_storage_1784362863234.png",
      "/images/materials/material_smoked_oak_1784361183682.png",
      "/images/process/process_concept_1784363030238.png"
    ],
    
    materials: [
      { name: "Smoked Oak", image: "/images/materials/material_smoked_oak_1784361183682.png" },
      { name: "Fluted Glass", image: "/images/materials/material_white_oak_1784361174113.png" },
      { name: "Brushed Metal", image: "/images/materials/material_brushed_metal_1784361238481.png" }
    ],

    specs: [
      { label: "Depth", value: "600–750mm" },
      { label: "Height", value: "Up to 2700mm" },
      { label: "Hardware", value: "Hettich TopLine" },
      { label: "Warranty", value: "10 Years" }
    ],

    faqs: [
      {
        id: "faq-w1",
        question: "Do you design custom internal layouts?",
        answer: "Yes, every wardrobe interior is designed entirely around your specific wardrobe collection — from long dresses to shoe racks."
      }
    ],

    relatedProjects: [
      {
        title: "The Glass Penthouse",
        location: "Bangalore",
        image: "/images/hero/wardrobe.png",
        href: "/projects"
      }
    ]
  },
  // We will provide minimal structure for the remaining 4 so the page doesn't crash, 
  // reusing the same basic data structure.
  ...[
    { slug: "islands", title: "Kitchen Islands", image: "/images/hero/island.png" },
    { slug: "pantry", title: "Pantry & Storage", image: "/images/hero/pantry.png" },
    { slug: "tv-units", title: "TV & Living Units", image: "/images/collections/kitchen.png" },
    { slug: "utility", title: "Utility Spaces", image: "/images/hero/white.png" }
  ].map((item, idx) => ({
    id: idx + 3,
    slug: item.slug,
    title: item.title,
    label: item.title,
    tagline: "Precision Engineered Spaces",
    overview: "Explore our premium collection engineered with absolute precision and timeless materials.",
    heroImage: item.image,
    configurations: [
      { id: "c1", title: "Premium Config", description: "Fully customizable layout.", image: item.image }
    ],
    gallery: [item.image, item.image, item.image, item.image],
    materials: [
      { name: "Natural Walnut", image: "/images/materials/material_walnut_1784361156242.png" },
      { name: "Matte Lacquer", image: "/images/materials/material_matte_lacquer_1784361194609.png" }
    ],
    specs: [
      { label: "Warranty", value: "10 Years" },
      { label: "Customizable", value: "Yes" }
    ],
    faqs: [
      { id: "f1", question: "What is the warranty?", answer: "We offer a 10-year comprehensive warranty." }
    ],
    relatedProjects: [
      { title: "Signature Project", location: "Global", image: item.image, href: "/projects" }
    ]
  }))
];
