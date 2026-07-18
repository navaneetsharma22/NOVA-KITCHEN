export const projects = [
  {
    id: 1,
    slug: "luxury-walnut-kitchen",
    title: "Luxury Walnut Kitchen",
    location: "Mumbai",
    area: "420 sq.ft",
    completed: "2026",
    materials: "Walnut, Quartz, Bronze Hardware",
    category: "Kitchens",
    shortDescription: "A bespoke modular kitchen designed to combine natural materials, seamless functionality and timeless elegance.",
    image: "/images/projects/project_walnut_kitchen_1784361383210.png",
    caseStudy: {
      overview: "Located in the heart of Mumbai, this luxury penthouse kitchen was designed to be the warm, architectural heart of the home. The client requested a space that felt deeply organic yet highly functional for both daily use and evening hosting.",
      challenge: "The primary challenge was balancing the rich, dark tones of natural walnut with the ambient light of the space to prevent it from feeling overly heavy, while seamlessly hiding all structural appliances.",
      solution: "We engineered custom floor-to-ceiling walnut cabinetry with integrated LED channel lighting and paired it with highly reflective white quartz surfaces to bounce natural light throughout the room.",
      testimonial: {
        quote: "Nova Kitchens completely transformed how we interact with our home. The attention to detail and the quality of the walnut finish is beyond anything we expected.",
        author: "A. Patel, Homeowner"
      }
    },
    gallery: [
      "/images/projects/project_walnut_kitchen_1784361383210.png",
      "/images/difference/diff_precision_1784362852741.png",
      "/images/materials/material_walnut_1784361156242.png",
      "/images/difference/diff_italian_1784362822206.png"
    ],
    timeline: [
      { phase: "Initial Consultation", duration: "1 Week", description: "Site visit and material selection." },
      { phase: "Design & Engineering", duration: "3 Weeks", description: "3D rendering and mechanical layout." },
      { phase: "Manufacturing", duration: "4 Weeks", description: "Precision milling and finishing in our facility." },
      { phase: "Installation", duration: "4 Days", description: "Final assembly and white-glove handover." }
    ],
    beforeAfter: {
      before: "/images/process/process_concept_1784363030238.png", // using sketch as "before"
      after: "/images/projects/project_walnut_kitchen_1784361383210.png"
    },
    relatedProjects: ["open-kitchen-concept", "contemporary-island"]
  },
  {
    id: 2,
    slug: "minimal-white-kitchen",
    title: "Minimal White Kitchen",
    location: "Bangalore",
    area: "350 sq.ft",
    completed: "2025",
    materials: "Matte Lacquer, Corian, Steel",
    category: "Kitchens",
    shortDescription: "A pure, handleless architectural volume focusing on light, geometry, and absolute minimalism.",
    image: "/images/projects/project_white_kitchen_1784361394052.png",
    caseStudy: {
      overview: "Designed for a minimalist architectural villa in Bangalore, this kitchen was conceived as a pristine, monolithic block of white that serves as a quiet backdrop to the family's vibrant life.",
      challenge: "Creating a completely handleless, visually silent space without compromising on heavy-duty storage capacity or daily ergonomic function.",
      solution: "We utilized our premium anti-fingerprint matte lacquer system with push-to-open servo drives, ensuring the surface remains perfectly flush and pristine at all times.",
      testimonial: {
        quote: "It feels more like an art installation than a kitchen. The absolute purity of the design is breathtaking.",
        author: "R. Sharma, Architect"
      }
    },
    gallery: [
      "/images/projects/project_white_kitchen_1784361394052.png",
      "/images/materials/material_matte_lacquer_1784361194609.png",
      "/images/difference/diff_precision_1784362852741.png",
      "/images/process/process_manufacturing_1784363051208.png"
    ],
    timeline: [
      { phase: "Concept", duration: "2 Weeks", description: "Defining the minimalist geometry." },
      { phase: "Engineering", duration: "3 Weeks", description: "Servo-drive integration planning." },
      { phase: "Production", duration: "4 Weeks", description: "Multi-coat matte lacquer application." },
      { phase: "Installation", duration: "5 Days", description: "Millimeter-perfect alignment." }
    ],
    beforeAfter: {
      before: "/images/process/process_concept_1784363030238.png",
      after: "/images/projects/project_white_kitchen_1784361394052.png"
    },
    relatedProjects: ["open-kitchen-concept", "villa-kitchen"]
  },
  // Replicating basic structure for the rest to avoid massive file bloating during this demo,
  // but keeping them fully functional.
  ...[
    { 
      id: 3, slug: "open-kitchen-concept", title: "Open Kitchen Concept", category: "Kitchens", 
      image: "/images/projects/project_open_kitchen_1784361404302.png" 
    },
    { 
      id: 4, slug: "contemporary-island", title: "Contemporary Island", category: "Islands", 
      image: "/images/projects/project_kitchen_island_1784361413908.png" 
    },
    { 
      id: 5, slug: "coastal-outdoor-kitchen", title: "Coastal Outdoor Kitchen", category: "Outdoor", 
      image: "/images/hero/island.png" 
    },
    { 
      id: 6, slug: "luxury-pantry", title: "Walk-in Chef's Pantry", category: "Storage", 
      image: "/images/hero/pantry.png" 
    },
    { 
      id: 7, slug: "villa-kitchen", title: "Sunlit Villa Kitchen", category: "Kitchens", 
      image: "/images/hero/white.png" 
    },
    { 
      id: 8, slug: "wine-tasting-bar", title: "Executive Wine Bar", category: "Storage", 
      image: "/images/hero/storage.png" 
    }
  ].map(p => ({
    ...p,
    location: "Metro City", area: "400 sq.ft", completed: "2025", materials: "Premium Materials",
    shortDescription: "A beautiful architectural space engineered for perfection.",
    caseStudy: {
      overview: "An in-depth look at this bespoke project, designed from the ground up to reflect luxury and precision.",
      challenge: "Overcoming spatial limitations and integrating complex smart home technology.",
      solution: "A bespoke engineering approach utilizing our proprietary European hardware systems.",
      testimonial: { quote: "An absolute masterpiece. We couldn't be happier.", author: "Satisfied Client" }
    },
    gallery: [p.image, p.image, p.image, p.image],
    timeline: [
      { phase: "Design", duration: "2 Weeks", description: "Layout planning." },
      { phase: "Production", duration: "4 Weeks", description: "Custom manufacturing." },
      { phase: "Install", duration: "1 Week", description: "Final handover." }
    ],
    beforeAfter: { before: "/images/process/process_concept_1784363030238.png", after: p.image },
    relatedProjects: ["luxury-walnut-kitchen", "minimal-white-kitchen"]
  }))
];
