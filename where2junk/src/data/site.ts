// site.ts — Where2 Junk Removal Services LLC
// ALL copy lives here. Zero hard-coded strings in components.
// Fields marked [FILL] are populated by the content-writer agent.

export const siteData = {
  meta: {
    name: 'Where2 Junk Removal Services LLC',
    shortName: 'Where2 Junk',
    domain: 'where2junk.com',
    phone: '(603) 406-3724',
    phoneRaw: '16034063724',
    email: '[FILL]',
    address: {
      street: '181 Beech Hill Avenue',
      city: 'Manchester',
      state: 'NH',
      zip: '03103',
      full: '181 Beech Hill Avenue, Manchester, NH 03103',
    },
    hours: {
      weekdays: '[FILL]',
      saturday: '[FILL]',
      sunday: '[FILL]',
      display: '[FILL]',
    },
    tagline: 'You Point, We Haul!',
    faithStatement: 'Here am I, send me. — Isaiah 6:8',
  },

  nav: {
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Service Areas', href: '/areas' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: 'Book Now', href: '/booking' },
    stickyBar: {
      callLabel: 'Call Now',
      bookLabel: 'Book Online',
    },
  },

  hero: {
    eyebrow: '[FILL]',
    headline: '[FILL]',
    subheadline: '[FILL]',
    tagline: 'You Point, We Haul!',
    ctaPrimary: { label: 'Book Online Now', href: '/booking' },
    ctaSecondary: { label: 'Get a Free Quote', href: '/contact' },
    trustCopy: '[FILL]',
    badges: ['Same-Day Available', 'Transparent Pricing', 'Licensed & Insured'],
  },

  services: [
    {
      slug: 'junk-removal',
      title: 'Junk Removal',
      shortTitle: 'Junk Removal',
      icon: 'trash-2',
      description: '[FILL]',
      features: ['[FILL]', '[FILL]', '[FILL]', '[FILL]'],
      whatWeAccept: ['[FILL]'],
      whatWeDontAccept: ['Hazardous waste', 'Flammable materials', 'Chemicals'],
      faqs: [
        { question: '[FILL]', answer: '[FILL]' },
        { question: '[FILL]', answer: '[FILL]' },
      ],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'garage-cleanout',
      title: 'Garage Cleanout',
      shortTitle: 'Garage Cleanout',
      icon: 'home',
      description: '[FILL]',
      features: ['[FILL]', '[FILL]', '[FILL]', '[FILL]'],
      whatWeAccept: ['[FILL]'],
      whatWeDontAccept: ['Hazardous waste', 'Flammable materials', 'Chemicals'],
      faqs: [
        { question: '[FILL]', answer: '[FILL]' },
        { question: '[FILL]', answer: '[FILL]' },
      ],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'yard-waste-removal',
      title: 'Yard Waste Removal',
      shortTitle: 'Yard Waste',
      icon: 'tree-pine',
      description: '[FILL]',
      features: ['[FILL]', '[FILL]', '[FILL]', '[FILL]'],
      whatWeAccept: ['[FILL]'],
      whatWeDontAccept: ['Hazardous waste', 'Chemicals'],
      faqs: [
        { question: '[FILL]', answer: '[FILL]' },
        { question: '[FILL]', answer: '[FILL]' },
      ],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'construction-debris-removal',
      title: 'Construction Debris Removal',
      shortTitle: 'Construction Debris',
      icon: 'hard-hat',
      description: '[FILL]',
      features: ['[FILL]', '[FILL]', '[FILL]', '[FILL]'],
      whatWeAccept: ['[FILL]'],
      whatWeDontAccept: ['Hazardous waste', 'Asbestos', 'Lead paint'],
      faqs: [
        { question: '[FILL]', answer: '[FILL]' },
        { question: '[FILL]', answer: '[FILL]' },
      ],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
  ],

  stats: [
    { value: 500, suffix: '+', label: 'Jobs Completed' },
    { value: 100, suffix: '%', label: 'Customer Satisfaction' },
    { value: 24, suffix: 'hr', label: 'Typical Response Time' },
    { value: 100, suffix: '%', label: 'Eco-Friendly Disposal' },
  ],

  whyUs: [
    {
      icon: 'zap',
      title: '[FILL]',
      description: '[FILL]',
    },
    {
      icon: 'dollar-sign',
      title: '[FILL]',
      description: '[FILL]',
    },
    {
      icon: 'shield-check',
      title: '[FILL]',
      description: '[FILL]',
    },
    {
      icon: 'leaf',
      title: '[FILL]',
      description: '[FILL]',
    },
  ],

  howItWorks: [
    {
      step: 1,
      title: 'Book Online',
      description: '[FILL]',
      icon: 'calendar',
    },
    {
      step: 2,
      title: 'We Show Up',
      description: '[FILL]',
      icon: 'truck',
    },
    {
      step: 3,
      title: 'You Point',
      description: '[FILL]',
      icon: 'hand-pointing',
    },
    {
      step: 4,
      title: 'We Haul',
      description: '[FILL]',
      icon: 'check-circle',
    },
  ],

  testimonials: [
    // 32 testimonials written by content-writer agent
    // Format: { id, name, location, service, rating, text }
    // ZERO em dashes. Short sentences. Sounds like a real phone review.
  ] as Array<{
    id: string;
    name: string;
    location: string;
    service: string;
    rating: number;
    text: string;
  }>,

  serviceAreas: [
    {
      slug: 'manchester-nh',
      city: 'Manchester',
      county: 'Hillsborough',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Bedford', 'Hooksett', 'Goffstown', 'Auburn'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'nashua-nh',
      city: 'Nashua',
      county: 'Hillsborough',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Hudson', 'Merrimack', 'Milford', 'Amherst'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'concord-nh',
      city: 'Concord',
      county: 'Merrimack',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Bow', 'Pembroke', 'Hopkinton', 'Hooksett'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'bedford-nh',
      city: 'Bedford',
      county: 'Hillsborough',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Manchester', 'Goffstown', 'New Boston'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'hooksett-nh',
      city: 'Hooksett',
      county: 'Merrimack',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Manchester', 'Concord', 'Allenstown'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'goffstown-nh',
      city: 'Goffstown',
      county: 'Hillsborough',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Manchester', 'Bedford', 'New Boston'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'londonderry-nh',
      city: 'Londonderry',
      county: 'Rockingham',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Derry', 'Manchester', 'Auburn'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
    {
      slug: 'merrimack-nh',
      city: 'Merrimack',
      county: 'Hillsborough',
      state: 'NH',
      description: '[FILL]',
      nearbyAreas: ['Nashua', 'Bedford', 'Amherst'],
      seo: {
        title: '[FILL]',
        description: '[FILL]',
      },
    },
  ],

  faq: [
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
    { question: '[FILL]', answer: '[FILL]' },
  ],

  about: {
    ownerName: 'Joshua Ortega',
    headline: '[FILL]',
    story: '[FILL]',
    faithStatement: 'Here am I, send me.',
    faithVerse: 'Isaiah 6:8',
    photoAlt: 'Joshua Ortega, owner of Where2 Junk Removal Services LLC',
    values: ['[FILL]', '[FILL]', '[FILL]', '[FILL]'],
    ctaText: '[FILL]',
  },

  blog: {
    posts: [
      {
        slug: 'how-to-simplify-junk-removal',
        title: 'How to Simplify Junk Removal with Where2 Junk',
        publishedAt: '2026-01-15',
        excerpt: '[FILL]',
        category: 'Tips',
        readTime: '5 min',
      },
    ],
  },

  contact: {
    phone: '(603) 406-3724',
    phoneRaw: '16034063724',
    email: '[FILL]',
    address: '181 Beech Hill Avenue, Manchester, NH 03103',
    mapEmbedUrl: '',
    hours: {
      display: '[FILL]',
      note: 'Same-day service available — call or book online.',
    },
    formSuccessMessage:
      'Thanks! We got your message and will get back to you within a few hours.',
  },

  social: {
    facebook: 'https://www.facebook.com/people/Where2-Junk-Removal-Services-LLC/61585535498382/',
    instagram: '',
  },

  seo: {
    defaultTitle: 'Where2 Junk Removal | Manchester, NH — You Point, We Haul!',
    defaultDescription:
      'Fast, transparent junk removal in Manchester NH. Same-day available. Residential and commercial. House cleanouts, garage cleanouts, yard waste, construction debris. Book online.',
    ogImage: '/images/og-image.jpg',
    schema: {
      type: 'LocalBusiness',
      subType: 'HomeAndConstructionBusiness',
    },
  },

  quiz: {
    headline: '[FILL]',
    subheadline: '[FILL]',
    steps: [
      {
        id: 'problem',
        question: 'What are you trying to get rid of?',
        type: 'multiSelect' as const,
        options: [
          { label: 'Household junk & clutter', value: 'household', service: 'junk-removal' },
          { label: 'Garage or basement cleanout', value: 'garage', service: 'garage-cleanout' },
          { label: 'Yard debris & brush', value: 'yard', service: 'yard-waste-removal' },
          { label: 'Construction materials', value: 'construction', service: 'construction-debris-removal' },
          { label: 'Estate / full house cleanout', value: 'estate', service: 'junk-removal' },
        ],
      },
      {
        id: 'timeline',
        question: 'How soon do you need it gone?',
        type: 'singleSelect' as const,
        options: [
          { label: 'Today or tomorrow', value: 'urgent' },
          { label: 'This week', value: 'week' },
          { label: 'Within 2 weeks', value: 'twoweeks' },
          { label: 'Just exploring options', value: 'exploring' },
        ],
      },
      {
        id: 'volume',
        question: 'How much stuff are we talking?',
        type: 'singleSelect' as const,
        options: [
          { label: 'A few items', value: 'small' },
          { label: 'A truckload or less', value: 'medium' },
          { label: 'Multiple truckloads', value: 'large' },
          { label: 'Not sure yet', value: 'unknown' },
        ],
      },
    ],
    leadCapture: {
      headline: '[FILL]',
      fields: ['name', 'phone', 'email'],
      submitLabel: 'See My Recommendation',
    },
    result: {
      headline: '[FILL]',
      ctaLabel: 'Book My Appointment',
      ctaHref: '/booking',
    },
  },

  pricing: {
    // Optimus sales tool — deleted before launch
    headline: 'Simple, Transparent Pricing',
    tiers: [
      {
        name: 'Starter',
        price: 1500,
        deposit: 750,
        popular: false,
        description: 'Core pages + animated hero',
        features: [
          'Homepage with animated hero',
          'Services page',
          'Contact page',
          'FAQ page',
          'About page',
          'Mobile-responsive',
          'SEO foundation',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Pro',
        price: 3000,
        deposit: 1500,
        popular: true,
        badge: 'Most Popular',
        description: 'Everything in Starter + blog, quiz, and booking calendar',
        features: [
          'Everything in Starter',
          'Blog (9-10 SEO articles)',
          'Interactive lead quiz',
          'Calendly inline booking',
          'Testimonials page (32)',
          'Service area pages',
          'Advanced SEO + AEO',
        ],
        cta: 'Choose Pro',
      },
      {
        name: 'Premium',
        price: 5500,
        deposit: 2750,
        popular: false,
        description: 'Everything in Pro + online shop',
        features: [
          'Everything in Pro',
          'Online shop (Stripe + Printful)',
          'Product catalog',
          'Cart + checkout',
          'Order management',
          'Printful fulfillment',
        ],
        cta: 'Go Premium',
      },
    ],
  },
} as const;

export type SiteData = typeof siteData;
export type Service = (typeof siteData.services)[number];
export type ServiceArea = (typeof siteData.serviceAreas)[number];
export type Testimonial = { id: string; name: string; location: string; service: string; rating: number; text: string };
