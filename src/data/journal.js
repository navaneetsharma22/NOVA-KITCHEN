export const journalArticles = [
  {
    id: 1,
    title: "Luxury Kitchen Design Trends 2026",
    slug: "luxury-kitchen-trends-2026",
    category: "Design",
    readingTime: "5 Min Read",
    date: "October 12, 2026",
    author: "Elena Rossi",
    shortDescription: "Explore the defining architectural trends shaping the future of culinary spaces, from monolithic stone islands to seamlessly integrated smart appliances.",
    image: "/images/journal/journal_trends_1784363296359.png",
    relatedArticles: ["perfect-kitchen-layout", "beauty-of-natural-walnut"],
    content: [
      {
        type: "paragraph",
        text: "The kitchen is no longer just a functional space; it has evolved into the true architectural anchor of the modern home. As we look ahead to 2026, the boundaries between the kitchen and the primary living areas continue to dissolve, giving rise to environments that are as much about aesthetic expression as they are about culinary precision."
      },
      {
        type: "heading",
        id: "monolithic-forms",
        text: "The Rise of Monolithic Forms"
      },
      {
        type: "paragraph",
        text: "One of the most profound shifts in luxury kitchen design is the move toward monolithic stone structures. Instead of fragmented countertops and separate cabinetry blocks, designers are opting for massive, singular volumes carved from Calacatta marble, quartzite, or sintered stone."
      },
      {
        type: "gallery",
        images: [
          "/images/projects/project_kitchen_island_1784361413908.png",
          "/images/difference/diff_craftsmanship_1784362841444.png"
        ]
      },
      {
        type: "paragraph",
        text: "These monolithic islands serve as sculptural centerpieces. They are completely devoid of visible hardware, relying instead on precision-milled grip channels and motorized servo-drives to maintain their unbroken geometry."
      },
      {
        type: "heading",
        id: "invisible-technology",
        text: "Invisible Technology"
      },
      {
        type: "paragraph",
        text: "The smart kitchen of 2026 doesn't look like a spaceship. Instead, the technology is entirely invisible. Induction cooking surfaces are now being integrated directly beneath the stone countertops, leaving a perfectly flat, unbroken expanse when not in use."
      },
      {
        type: "quote",
        text: "True luxury is the absence of visual noise. The best technology should serve you flawlessly without demanding your visual attention."
      },
      {
        type: "paragraph",
        text: "Extraction systems have also evolved. Bulky overhead hoods have been entirely replaced by flush-mounted downdraft extractors that rise from the countertop only when needed, maintaining clean, architectural sightlines across the room."
      }
    ]
  },
  {
    id: 2,
    title: "How To Choose The Perfect Kitchen Layout",
    slug: "perfect-kitchen-layout",
    category: "Planning",
    readingTime: "7 Min Read",
    date: "October 05, 2026",
    author: "Marco Bianchi",
    shortDescription: "A comprehensive guide to understanding spatial dynamics and choosing between open-concept, galley, or L-shaped architectural layouts.",
    image: "/images/projects/project_open_kitchen_1784361404302.png",
    relatedArticles: ["smart-storage-ideas", "luxury-kitchen-trends-2026"],
    content: [
      {
        type: "paragraph",
        text: "Before selecting materials or appliances, the most critical decision in any kitchen renovation is the architectural layout. The layout dictates not only how the space functions for cooking, but how it dictates the flow of traffic and social interaction within the home."
      },
      {
        type: "heading",
        id: "the-open-concept",
        text: "The Open-Concept Evolution"
      },
      {
        type: "paragraph",
        text: "While open-concept living has been dominant for a decade, we are seeing a refinement in its execution. Modern open kitchens utilize 'broken plan' elements—such as slatted timber screens or subtle level changes—to create psychological separation between the cooking zone and the lounge without erecting solid walls."
      },
      {
        type: "gallery",
        images: [
          "/images/projects/project_open_kitchen_1784361404302.png",
          "/images/projects/project_walnut_kitchen_1784361383210.png"
        ]
      },
      {
        type: "heading",
        id: "the-galley-kitchen",
        text: "The Resurgence of the Galley"
      },
      {
        type: "paragraph",
        text: "Often associated with smaller spaces, the galley layout is experiencing a luxury renaissance. Favored by professional chefs for its absolute ergonomic efficiency, a well-designed dual-run galley minimizes movement between the prep, cooking, and cleaning zones."
      }
    ]
  },
  // Replicate structure for the rest
  ...[
    { id: 3, slug: "beauty-of-natural-walnut", title: "The Beauty Of Natural Walnut", category: "Materials", image: "/images/materials/material_walnut_1784361156242.png" },
    { id: 4, slug: "quartz-vs-marble", title: "Quartz vs Marble Countertops", category: "Materials", image: "/images/materials/material_marble_1784361227712.png" },
    { id: 5, slug: "smart-storage-ideas", title: "Smart Storage Ideas For Modern Homes", category: "Storage", image: "/images/hero/pantry.png" },
    { id: 6, slug: "minimal-luxury-guide", title: "Minimal Luxury Interior Design Guide", category: "Lifestyle", image: "/images/projects/project_white_kitchen_1784361394052.png" }
  ].map(p => ({
    ...p,
    readingTime: "5 Min Read", date: "September 2026", author: "Editorial Team",
    shortDescription: "An in-depth editorial exploring premium materials, architectural planning, and minimalist design.",
    relatedArticles: ["luxury-kitchen-trends-2026", "perfect-kitchen-layout"],
    content: [
      { type: "paragraph", text: "This is a premium editorial deep dive into the world of luxury kitchen architecture, focusing on the intersection of function and absolute beauty." },
      { type: "heading", id: "section-1", text: "The Core Philosophy" },
      { type: "paragraph", text: "In high-end design, every millimeter matters. We believe that true luxury is found in the details—the alignment of a grain, the silent close of a drawer, and the durability of a stone surface." },
      { type: "gallery", images: [p.image, p.image] },
      { type: "quote", text: "Design is not just what it looks like and feels like. Design is how it works." },
      { type: "paragraph", text: "By focusing on uncompromising quality and timeless aesthetics, these spaces are designed to last generations while remaining effortlessly relevant." }
    ]
  }))
];
