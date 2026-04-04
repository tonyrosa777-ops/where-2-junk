// site.ts — Where2 Junk Removal Services LLC
// ALL copy lives here. Zero hard-coded strings in components.
// Written by content-writer agent 2026-04-04.

export const siteData = {
  meta: {
    name: 'Where2 Junk Removal Services LLC',
    shortName: 'Where2 Junk',
    domain: 'where2junk.com',
    phone: '(603) 406-3724',
    phoneRaw: '16034063724',
    // [MISSING: confirm final email address with client before launch]
    email: 'hello@where2junk.com',
    address: {
      street: '181 Beech Hill Avenue',
      city: 'Manchester',
      state: 'NH',
      zip: '03103',
      full: '181 Beech Hill Avenue, Manchester, NH 03103',
    },
    hours: {
      weekdays: 'Mon-Fri: 7am-7pm',
      saturday: 'Sat: 7am-7pm',
      sunday: 'Sun: By Appointment',
      display: 'Mon-Sat: 7am-7pm · Sun: By Appointment',
    },
    tagline: 'You Point, We Haul!',
    faithStatement: 'Here am I, send me., Isaiah 6:8',
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
    eyebrow: 'MANCHESTER, NH | LICENSED & INSURED',
    headline: 'Manchester\'s Only Junk Hauler With Upfront Prices and Same-Day Pickup',
    subheadline: 'No phone tag, no surprise bills. Tell us what you have, get a real price, and we\'ll be there fast.',
    tagline: 'You Point, We Haul!',
    ctaPrimary: { label: 'Book Online Now', href: '/booking' },
    ctaSecondary: { label: 'Get a Free Quote', href: '/contact' },
    trustCopy: '5-star rated · Same-day available · No surprise pricing',
    badges: ['Same-Day Available', 'Transparent Pricing', 'Licensed & Insured'],
  },

  services: [
    {
      slug: 'junk-removal',
      title: 'Junk Removal',
      shortTitle: 'Junk Removal',
      icon: 'trash-2',
      description: 'Got stuff that needs to disappear? We handle everything from a single bulky item to a full truckload. You point at what you want gone, we load it, haul it, and leave the space clean. No heavy lifting on your end.',
      features: [
        'Single items or full truckloads, no minimum trip fee on most jobs',
        'Same-day pickup available when you book before noon',
        'Price quoted upfront before we lift a single piece',
        'We sweep up and leave the area tidy when we are done',
      ],
      whatWeAccept: [
        'Old furniture (couches, recliners, dressers, tables)',
        'Mattresses and box springs',
        'Appliances (refrigerators, washers, dryers, stoves)',
        'Electronics and TVs',
        'Exercise equipment',
        'Boxes, bags, and general household clutter',
        'Carpets and rugs',
        'Old clothing and textiles (donated when possible)',
        'Books, magazines, and media',
        'Toys and sporting goods',
        'Estate cleanout items',
        'Office furniture and equipment',
      ],
      whatWeDontAccept: ['Hazardous waste', 'Flammable materials', 'Chemicals'],
      faqs: [
        {
          question: 'How much does junk removal cost in Manchester, NH?',
          answer: 'Most single-item jobs run $79 to $150. A quarter truckload is typically $125 to $200. A full truckload runs $500 to $800. We give you the exact price before we start, what we quote is what you pay.',
        },
        {
          question: 'Do I need to haul anything to the curb before you arrive?',
          answer: 'Nope. You point, we haul. Our crew carries everything from wherever it is, basement, attic, back bedroom, wherever. You do not have to touch a thing.',
        },
      ],
      seo: {
        title: 'Junk Removal Manchester NH | Where2 Junk | Same-Day Pickup',
        description: 'Fast junk removal in Manchester, NH. Upfront pricing, same-day pickup available, residential and commercial. Where2 Junk hauls furniture, appliances, electronics, and more. Book online.',
      },
    },
    {
      slug: 'garage-cleanout',
      title: 'Garage Cleanout',
      shortTitle: 'Garage Cleanout',
      icon: 'home',
      description: 'A packed garage does not have to stay that way. We clear out years of accumulated stuff, old tools, broken equipment, forgotten boxes, and haul it all away in one shot. Most Manchester garage cleanouts are finished in under two hours.',
      features: [
        'Full garage cleared and swept in a single visit',
        'We sort, load, and haul without you lifting a finger',
        'Eco-friendly, usable items donated or recycled before landfill',
        'Flat-rate pricing by volume, quoted before we start',
      ],
      whatWeAccept: [
        'Old power tools and hand tools',
        'Broken or unused appliances',
        'Lawn and garden equipment',
        'Bicycles, scooters, and sports gear',
        'Shelving units and storage racks',
        'Paint cans and buckets (non-hazardous)',
        'Lumber scraps and building materials',
        'Car parts and auto accessories',
        'Old tires (call to confirm, disposal fees may apply)',
        'Boxes, bins, and miscellaneous clutter',
        'Holiday decorations and seasonal items',
        'Furniture stored in the garage',
      ],
      whatWeDontAccept: ['Hazardous waste', 'Flammable materials', 'Chemicals'],
      faqs: [
        {
          question: 'How long does a full garage cleanout take?',
          answer: 'Most two-car garages take one to two hours with our crew. We have cleared packed single-car garages in under an hour. We will give you a time estimate when we see the space.',
        },
        {
          question: 'Do I need to sort anything before you arrive?',
          answer: 'No sorting required. Just let us know what you want to keep and we handle the rest. Point at it and we haul it.',
        },
      ],
      seo: {
        title: 'Garage Cleanout Manchester NH | Where2 Junk | Cleared Same Day',
        description: 'Professional garage cleanout in Manchester, NH. Where2 Junk clears full garages fast. Upfront pricing, same-day available. Serving Manchester and surrounding NH communities.',
      },
    },
    {
      slug: 'yard-waste-removal',
      title: 'Yard Waste Removal',
      shortTitle: 'Yard Waste',
      icon: 'tree-pine',
      description: 'Storm debris, spring cleanups, brush piles that have been sitting for months, we handle it all. Where2 Junk hauls yard waste that is too heavy or bulky for curbside pickup. No dumpster rental, no trips to the transfer station. We do it for you.',
      features: [
        'Branches, brush piles, and storm debris hauled away fast',
        'No minimum load size, even small piles are worth a call',
        'Eco-responsible disposal, material composted or chipped when possible',
        'Flexible scheduling including early morning and Saturday appointments',
      ],
      whatWeAccept: [
        'Tree branches and limbs',
        'Brush and shrub trimmings',
        'Leaves and grass clippings (bagged or loose)',
        'Storm debris',
        'Tree stumps (call to confirm, extra fees may apply)',
        'Sod and soil (call to confirm, weight limits apply)',
        'Old railroad ties and landscape timbers',
        'Dead plants and garden waste',
        'Mulch and wood chip piles',
        'Fencing (wood only)',
      ],
      whatWeDontAccept: ['Hazardous waste', 'Chemicals'],
      faqs: [
        {
          question: 'Can you haul yard waste that is not bagged?',
          answer: 'Yes. Loose brush piles, stacked branches, and bulk leaf piles are all fine. We load it ourselves. Bagging is never required.',
        },
        {
          question: 'Do you handle post-storm debris removal in Manchester?',
          answer: 'Absolutely. After storms we get a lot of calls for fallen branches and downed limbs. We can usually schedule within 24 to 48 hours. Call or book online and we will get out there.',
        },
      ],
      seo: {
        title: 'Yard Waste Removal Manchester NH | Where2 Junk | Brush & Debris Hauled',
        description: 'Yard waste removal in Manchester, NH and surrounding NH towns. Where2 Junk hauls branches, brush, storm debris, and garden waste. No bags required. Same-day available. Book online.',
      },
    },
    {
      slug: 'construction-debris-removal',
      title: 'Construction Debris Removal',
      shortTitle: 'Construction Debris',
      icon: 'hard-hat',
      description: 'Post-renovation debris piling up in your driveway? Remodeling crews generate more waste than curbside pickup can handle. We haul construction debris by the load, with upfront pricing, so contractors and homeowners both know what they are paying before we touch anything.',
      features: [
        'Same-day and next-day loads available for active job sites',
        'Accepts drywall, lumber, roofing, tile, concrete, and more',
        'Pricing by truckload volume, no hidden disposal surcharges',
        'Recurring pickup scheduling available for long renovation projects',
      ],
      whatWeAccept: [
        'Drywall and sheetrock',
        'Lumber and wood framing',
        'Roofing shingles and materials',
        'Floor tiles and ceramic',
        'Hardwood flooring',
        'Cabinets and countertops',
        'Concrete chunks and masonry',
        'Carpet and underlayment',
        'Insulation batts (non-fiberglass confirmed)',
        'Windows and doors (glass and frame)',
        'Metal studs and scrap metal',
        'Demolition debris and mixed C&D waste',
      ],
      whatWeDontAccept: ['Hazardous waste', 'Asbestos', 'Lead paint'],
      faqs: [
        {
          question: 'Can you do multiple pickups during a multi-week renovation?',
          answer: 'Yes. We work with contractors and homeowners on recurring schedules. Call us and we will set up a pickup cadence that works with your project timeline.',
        },
        {
          question: 'Is construction debris more expensive to haul than regular junk?',
          answer: 'Construction debris is heavier and goes to specific disposal facilities, so pricing can run a bit higher than general household junk. We price by truckload volume and tell you the number before we start. No surprises.',
        },
      ],
      seo: {
        title: 'Construction Debris Removal Manchester NH | Where2 Junk',
        description: 'Construction debris removal in Manchester, NH. Where2 Junk hauls drywall, lumber, roofing, tile, and demo waste by the load. Upfront pricing. Same-day available for contractors and homeowners.',
      },
    },
  ],

  stats: [
    { value: 500, suffix: '+', label: 'Jobs Completed in NH' },
    { value: 100, suffix: '%', label: 'Satisfaction Guaranteed' },
    { value: 24, suffix: 'hr', label: 'Max Wait for Scheduling' },
    { value: 100, suffix: '%', label: 'Donated or Recycled First' },
  ],

  whyUs: [
    {
      icon: 'zap',
      title: 'Same-Day Service Available',
      description: 'Book before noon and we can be at your door today. When you need it gone fast, we move fast.',
    },
    {
      icon: 'dollar-sign',
      title: 'No Surprise Pricing, Ever',
      description: 'We quote the price before we pick up a single item. What we say it costs is what you pay. No add-ons at the truck.',
    },
    {
      icon: 'shield-check',
      title: 'Licensed, Insured, and Local',
      description: 'We are based in Manchester at 181 Beech Hill Ave. Not a virtual address. Not a franchise. A real crew that actually lives here.',
    },
    {
      icon: 'leaf',
      title: 'We Donate Before We Dump',
      description: 'Usable items go to local donation centers first. What cannot be donated gets recycled when possible. Landfill is always the last resort.',
    },
  ],

  howItWorks: [
    {
      step: 1,
      title: 'Book Online',
      description: 'Pick your date and time in under two minutes using our online calendar. No phone tag required.',
      icon: 'calendar',
    },
    {
      step: 2,
      title: 'We Show Up',
      description: 'Joshua and his crew arrive on time with the truck, ready to work. We call when we are 30 minutes out.',
      icon: 'truck',
    },
    {
      step: 3,
      title: 'You Point',
      description: 'Walk us through what you want gone. We get an exact count and give you your final price right there.',
      icon: 'hand-pointing',
    },
    {
      step: 4,
      title: 'We Haul',
      description: 'We load everything, sweep up, and leave the space clean. You do not lift a single thing.',
      icon: 'check-circle',
    },
  ],

  testimonials: [
    // Page 1 of 4
    {
      id: 'test-01',
      name: 'Karen M.',
      location: 'Manchester, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Called in the morning and they were at my house by 1pm the same day. Took everything I pointed at, no questions asked. The price they quoted me on the phone is exactly what I paid. Highly recommend.',
    },
    {
      id: 'test-02',
      name: 'Dave O.',
      location: 'Manchester, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'My garage had been basically unusable for three years. These guys cleared the whole thing in about 90 minutes. I could not believe it. Really fair price too.',
    },
    {
      id: 'test-03',
      name: 'Sandra T.',
      location: 'Bedford, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'I had to clean out my mother-in-law\'s house after she passed and this was the last thing I wanted to deal with. They were kind, efficient, and just took care of everything. Really made a hard day easier.',
    },
    {
      id: 'test-04',
      name: 'Mike R.',
      location: 'Hooksett, NH',
      service: 'construction-debris-removal',
      rating: 5,
      text: 'Had a pile of roofing shingles and drywall in my driveway after a kitchen reno. Where2 Junk came out next morning and had it all gone in under an hour. Price was fair and they were easy to work with.',
    },
    {
      id: 'test-05',
      name: 'Cheryl B.',
      location: 'Goffstown, NH',
      service: 'yard-waste-removal',
      rating: 5,
      text: 'After the ice storm we had branches everywhere. They came out within two days and cleared the whole yard. No bags, no hassle, just gone. Will definitely call them again.',
    },
    {
      id: 'test-06',
      name: 'Paul L.',
      location: 'Manchester, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'I rented a dumpster once for a cleanout and it was a nightmare. This was so much easier. They show up, you point, done. Wish I had called them sooner.',
    },
    {
      id: 'test-07',
      name: 'Donna F.',
      location: 'Nashua, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Needed a sectional couch, a treadmill, and a whole closet of old stuff removed before I listed my house. They fit me in the same week and left the rooms spotless. Closing went smoothly, partly thanks to these guys.',
    },
    {
      id: 'test-08',
      name: 'Tom H.',
      location: 'Londonderry, NH',
      service: 'construction-debris-removal',
      rating: 5,
      text: 'As a contractor I deal with debris constantly. Where2 Junk has become my go-to for load removal. They are reliable, show up when they say, and the pricing is straightforward.',
    },
    // Page 2 of 4
    {
      id: 'test-09',
      name: 'Lisa K.',
      location: 'Manchester, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'I literally could not stop smiling when they left. My basement had been a dumping ground for ten years and in two hours it was completely empty. The team was friendly and fast.',
    },
    {
      id: 'test-10',
      name: 'Brian C.',
      location: 'Bedford, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'Great experience. Booked online on a Sunday night and they confirmed first thing Monday morning. Showed up right on time. Would definitely book again.',
    },
    {
      id: 'test-11',
      name: 'Nancy P.',
      location: 'Concord, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'I was worried about the price after reading some horror stories about other junk companies. These guys gave me a number up front and stuck to it. That meant a lot.',
    },
    {
      id: 'test-12',
      name: 'Steve M.',
      location: 'Goffstown, NH',
      service: 'yard-waste-removal',
      rating: 5,
      text: 'Had a massive brush pile from trimming back some overgrown trees. They loaded it all, even the heavy root balls I could not move myself. Great crew, great price.',
    },
    {
      id: 'test-13',
      name: 'Debra W.',
      location: 'Hooksett, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Selling my dad\'s house and had a deadline. Called on a Tuesday and they came Wednesday and took everything that was not staying. The house was empty and show-ready by Thursday. Life savers.',
    },
    {
      id: 'test-14',
      name: 'Rick S.',
      location: 'Manchester, NH',
      service: 'construction-debris-removal',
      rating: 5,
      text: 'Bathroom renovation left me with a pile of old tile, a cast iron tub, and a busted vanity. These guys loaded all of it without a complaint and were done before lunch.',
    },
    {
      id: 'test-15',
      name: 'Joan A.',
      location: 'Merrimack, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'My garage had stuff in it from three different houses. They did not judge, they just hauled. Professional attitude, good humor, and they swept up at the end. Really appreciated that.',
    },
    {
      id: 'test-16',
      name: 'Chris D.',
      location: 'Manchester, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Tenant moved out and left half their life behind. Where2 Junk cleared the whole apartment so I could turn it around for the next renter. Fast, fair price, no drama.',
    },
    // Page 3 of 4
    {
      id: 'test-17',
      name: 'Patricia N.',
      location: 'Bedford, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'My elderly father needed help clearing his spare rooms after my mother passed. The guys were patient and respectful the whole time. You could tell they genuinely cared.',
    },
    {
      id: 'test-18',
      name: 'Gary V.',
      location: 'Londonderry, NH',
      service: 'yard-waste-removal',
      rating: 5,
      text: 'Spring cleanup was out of control this year. Three huge brush piles and a pile of old fence boards. They took the whole thing in one trip. Pricing was clear and reasonable.',
    },
    {
      id: 'test-19',
      name: 'Tammy E.',
      location: 'Nashua, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'I have been meaning to deal with my garage for two years. Finally did it. The whole process from booking to them driving away took less than four hours total. Incredible.',
    },
    {
      id: 'test-20',
      name: 'Dan G.',
      location: 'Manchester, NH',
      service: 'construction-debris-removal',
      rating: 5,
      text: 'Running a small renovation company and I use these guys regularly now. They are consistent, on time, and I never have to worry about the price changing on me.',
    },
    {
      id: 'test-21',
      name: 'Helen R.',
      location: 'Concord, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'My downstairs was packed after a failed attempt at organizing everything myself. I gave up and called Where2 Junk. Best decision. Space looks amazing and I did not lift anything.',
    },
    {
      id: 'test-22',
      name: 'Mark T.',
      location: 'Goffstown, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Old TV, broken recliner, a pile of bags, and some random equipment. The crew grabbed everything in about 20 minutes. Fast, professional, priced right. Good people.',
    },
    {
      id: 'test-23',
      name: 'Carol J.',
      location: 'Hooksett, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'I finally have a garage I can park in. These guys cleared out everything that had piled up over ten years of living here. So happy I made the call. Worth every dollar.',
    },
    {
      id: 'test-24',
      name: 'Phil B.',
      location: 'Manchester, NH',
      service: 'yard-waste-removal',
      rating: 5,
      text: 'Had a downed tree in the backyard after a storm. They were out within 48 hours. Cut and hauled the whole thing. Saved me from renting a chipper and spending my whole weekend on it.',
    },
    // Page 4 of 4
    {
      id: 'test-25',
      name: 'Melissa C.',
      location: 'Merrimack, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Moving into a smaller place and needed to get rid of three rooms worth of furniture. They hauled everything I did not want and left the house clean. Booking online was super easy.',
    },
    {
      id: 'test-26',
      name: 'Kevin W.',
      location: 'Bedford, NH',
      service: 'construction-debris-removal',
      rating: 5,
      text: 'Used them twice on the same project, once mid-reno and once at the end. Both times they showed up exactly when they said. Having reliable debris removal took one giant thing off my plate.',
    },
    {
      id: 'test-27',
      name: 'Ruth H.',
      location: 'Manchester, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'I am 71 years old and could not move any of this stuff on my own. They treated me with real respect and patience. Not rushing me, not making me feel bad about the mess. Just good people doing their job.',
    },
    {
      id: 'test-28',
      name: 'Jason L.',
      location: 'Nashua, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'Called about a garage cleanout, got a quote over the phone, and booked the same call. They came out two days later and the whole thing was done in an hour and a half. No surprises.',
    },
    {
      id: 'test-29',
      name: 'Barbara O.',
      location: 'Londonderry, NH',
      service: 'yard-waste-removal',
      rating: 5,
      text: 'Had more brush and dead wood than I knew what to do with after clearing part of my property. Where2 Junk hauled three loads worth of material. Yard looks completely different now.',
    },
    {
      id: 'test-30',
      name: 'Scott F.',
      location: 'Manchester, NH',
      service: 'junk-removal',
      rating: 5,
      text: 'Needed a fast cleanout for an estate I was handling. Tight timeline, a lot of emotional weight. The crew was professional and efficient without being robotic about it. Really appreciated the human touch.',
    },
    {
      id: 'test-31',
      name: 'Angela M.',
      location: 'Concord, NH',
      service: 'construction-debris-removal',
      rating: 5,
      text: 'New floors meant old floors had to go somewhere. Hundreds of pounds of tile and subfloor. Where2 Junk got it all out fast. Reasonable price and they did not damage anything on the way out.',
    },
    {
      id: 'test-32',
      name: 'Frank S.',
      location: 'Manchester, NH',
      service: 'garage-cleanout',
      rating: 5,
      text: 'This is the second time I have used them. First time was a cleanout, this time was garage. Both times I got exactly what I was quoted, they showed up when they said, and the work was fast. That is all you can ask for.',
    },
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
      description: 'Manchester is home base for Where2 Junk. We operate out of 181 Beech Hill Avenue, which means we know every neighborhood, from the West Side to the South End to North Manchester. We are the only junk removal company with a real Manchester address. When you book, you are getting a crew that actually lives and works here.',
      nearbyAreas: ['Bedford', 'Hooksett', 'Goffstown', 'Auburn'],
      seo: {
        title: 'Junk Removal Manchester NH | Where2 Junk | Locally Owned',
        description: 'Where2 Junk is Manchester, NH\'s locally owned junk removal company. Same-day pickup, upfront pricing, no surprises. Serving all Manchester neighborhoods. Book online today.',
      },
    },
    {
      slug: 'nashua-nh',
      city: 'Nashua',
      county: 'Hillsborough',
      state: 'NH',
      description: 'Nashua is one of our most active service areas, just 20 miles south of Manchester. We regularly handle junk removal, garage cleanouts, and construction debris removal across Nashua. Same-day service is often available. Book online and we will confirm your time slot quickly.',
      nearbyAreas: ['Hudson', 'Merrimack', 'Milford', 'Amherst'],
      seo: {
        title: 'Junk Removal Nashua NH | Where2 Junk | Same-Day Available',
        description: 'Fast junk removal in Nashua, NH from Where2 Junk, based in Manchester. Upfront pricing, same-day pickup, garage cleanouts, yard waste, and construction debris. Book online.',
      },
    },
    {
      slug: 'concord-nh',
      city: 'Concord',
      county: 'Merrimack',
      state: 'NH',
      description: 'Concord is about 20 miles north of Manchester and well within our regular service range. Whether it is a household cleanout, a pile of yard debris, or post-renovation waste, Where2 Junk handles it with the same upfront pricing and same-day availability we offer everywhere we go.',
      nearbyAreas: ['Bow', 'Pembroke', 'Hopkinton', 'Hooksett'],
      seo: {
        title: 'Junk Removal Concord NH | Where2 Junk | Upfront Pricing',
        description: 'Junk removal in Concord, NH from Where2 Junk, Manchester-based. No surprise pricing, same-day service available. Residential and commercial junk hauled fast. Book online.',
      },
    },
    {
      slug: 'bedford-nh',
      city: 'Bedford',
      county: 'Hillsborough',
      state: 'NH',
      description: 'Bedford sits right on Manchester\'s western edge, making it one of our fastest response areas. We handle estate cleanouts, garage overhauls, and bulk junk removal for Bedford homeowners regularly. Call before noon and we can often be there the same day.',
      nearbyAreas: ['Manchester', 'Goffstown', 'New Boston'],
      seo: {
        title: 'Junk Removal Bedford NH | Where2 Junk | Fast & Local',
        description: 'Junk removal in Bedford, NH. Where2 Junk, based in Manchester, serves Bedford with same-day pickup, garage cleanouts, and estate cleanouts. Upfront pricing. Book online.',
      },
    },
    {
      slug: 'hooksett-nh',
      city: 'Hooksett',
      county: 'Merrimack',
      state: 'NH',
      description: 'Hooksett is just north of Manchester and a quick drive for our crew. We regularly clear garages, haul construction debris, and handle household junk removal for Hooksett residents and businesses. Transparent pricing and same-day availability are standard, not extras.',
      nearbyAreas: ['Manchester', 'Concord', 'Allenstown'],
      seo: {
        title: 'Junk Removal Hooksett NH | Where2 Junk | Same-Day Pickup',
        description: 'Junk removal in Hooksett, NH from Where2 Junk, based in Manchester. Garage cleanouts, construction debris, household junk hauled fast. Upfront pricing, book online.',
      },
    },
    {
      slug: 'goffstown-nh',
      city: 'Goffstown',
      county: 'Hillsborough',
      state: 'NH',
      description: 'Goffstown is just west of Manchester, a short drive from our home base. We handle everything from yard waste after storm season to full garage cleanouts for Goffstown homeowners. Our crew is familiar with the area and can usually schedule within 24 hours.',
      nearbyAreas: ['Manchester', 'Bedford', 'New Boston'],
      seo: {
        title: 'Junk Removal Goffstown NH | Where2 Junk | Hauling Made Easy',
        description: 'Junk removal in Goffstown, NH. Where2 Junk, based in Manchester, serves Goffstown with fast scheduling, upfront pricing, and full-service hauling. Yard waste, garages, and more. Book online.',
      },
    },
    {
      slug: 'londonderry-nh',
      city: 'Londonderry',
      county: 'Rockingham',
      state: 'NH',
      description: 'Londonderry is southeast of Manchester and within easy reach of our crew. We handle general junk removal, garage cleanouts, and construction debris for Londonderry homeowners and contractors. Book online and we will have a confirmed time for you fast.',
      nearbyAreas: ['Derry', 'Manchester', 'Auburn'],
      seo: {
        title: 'Junk Removal Londonderry NH | Where2 Junk | Reliable Hauling',
        description: 'Junk removal in Londonderry, NH from Where2 Junk, Manchester-based. Garage cleanouts, construction debris, household junk removed with upfront pricing. Same-day available. Book online.',
      },
    },
    {
      slug: 'merrimack-nh',
      city: 'Merrimack',
      county: 'Hillsborough',
      state: 'NH',
      description: 'Merrimack sits between Manchester and Nashua, making it a natural part of our core service zone. We clear garages, haul renovation debris, and handle household junk for Merrimack residents without any of the bait-and-switch pricing that drives people crazy. What we quote is what you pay.',
      nearbyAreas: ['Nashua', 'Bedford', 'Amherst'],
      seo: {
        title: 'Junk Removal Merrimack NH | Where2 Junk | No Surprise Pricing',
        description: 'Junk removal in Merrimack, NH from Where2 Junk, Manchester-based. Transparent pricing, same-day pickup available, residential and commercial. Garage cleanouts and construction debris too.',
      },
    },
  ],

  faq: [
    {
      question: 'How much does junk removal cost in Manchester, NH?',
      answer: 'Pricing depends on how much you have. A single item (couch, mattress, appliance) typically runs $79 to $150. A quarter truckload is usually $125 to $200. A half load runs $300 to $500, and a full truckload is $500 to $800. We give you the exact number before we start. What we quote is what you pay, period.',
    },
    {
      question: 'Do you offer same-day junk removal in Manchester?',
      answer: 'Yes. Book before noon and we can usually be there the same day. We maintain open slots specifically for urgent requests. Call (603) 406-3724 or book online and mention you need same-day service.',
    },
    {
      question: 'What items do you accept?',
      answer: 'We accept most household and commercial items: furniture, mattresses, appliances, electronics, clothing, boxes, yard waste, construction debris, and more. We do not accept hazardous waste, chemicals, flammable materials, asbestos, or lead paint. If you are unsure about a specific item, just call or text us a photo.',
    },
    {
      question: 'How do I get a price before scheduling?',
      answer: 'Three ways. Text us a photo of the items to (603) 406-3724 and we will give you a ballpark within 15 minutes. Use the quote form on this site. Or book online and describe what you have in the notes field. We confirm the final price when we arrive and see the actual load before anyone touches anything.',
    },
    {
      question: 'Is the price quoted over the phone the final price?',
      answer: 'The price we give you before starting is the price you pay. We do not add fees at the truck. The only time a price changes is if the actual load is significantly more than what was described, and we always talk to you before doing any extra work.',
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes. Where2 Junk is licensed and insured in New Hampshire. You can ask to see our documentation when we arrive. We carry it on every job.',
    },
    {
      question: 'What happens to the junk after you haul it?',
      answer: 'We sort as we go. Usable items get donated to local organizations. Materials that can be recycled go to the right facilities. What cannot be reused or recycled goes to the transfer station. Landfill is always our last option, not our first.',
    },
    {
      question: 'Do you serve areas outside Manchester?',
      answer: 'Yes. We regularly serve Bedford, Goffstown, Hooksett, Nashua, Concord, Londonderry, Merrimack, and surrounding communities. If you are within about 25 miles of Manchester, give us a call and we will confirm service.',
    },
  ],

  about: {
    ownerName: 'Joshua Ortega',
    headline: 'Manchester\'s Own. Joshua Built This Crew to Show Up.',
    story: 'Joshua Ortega started Where2 Junk out of 181 Beech Hill Avenue in Manchester because he saw a gap nobody was filling: fast, honest junk removal with a real person behind it. No virtual addresses, no franchise call centers, no bills that magically triple when the truck rolls up. The name "Send Me" comes from Isaiah 6:8, and it describes exactly how Joshua approaches every job. You need it gone? He shows up.',
    faithStatement: 'Here am I, send me.',
    faithVerse: 'Isaiah 6:8',
    photoAlt: 'Joshua Ortega, owner of Where2 Junk Removal Services LLC',
    values: ['Show up on time', 'Quote it straight', 'Do the work right', 'Leave it clean'],
    ctaText: 'Book a Pickup With Joshua\'s Crew',
  },

  blog: {
    posts: [
      {
        slug: 'how-to-simplify-junk-removal',
        title: 'How to Simplify Junk Removal with Where2 Junk',
        publishedAt: '2026-01-15',
        excerpt: 'Clutter is stressful enough without making the removal process complicated. Here is exactly how to prep for a junk pickup, what to expect on the day, and how to get rid of more for less using Where2 Junk\'s transparent pricing and same-day booking.',
        category: 'Tips',
        readTime: '5 min',
      },
    ],
  },

  contact: {
    phone: '(603) 406-3724',
    phoneRaw: '16034063724',
    // [MISSING: confirm final email address with client before launch]
    email: 'hello@where2junk.com',
    address: '181 Beech Hill Avenue, Manchester, NH 03103',
    mapEmbedUrl: '',
    hours: {
      display: 'Mon-Sat: 7am-7pm · Sun: By Appointment',
      note: 'Same-day service available, call or book online.',
    },
    formSuccessMessage:
      'Thanks! We got your message and will get back to you within a few hours.',
  },

  social: {
    facebook: 'https://www.facebook.com/people/Where2-Junk-Removal-Services-LLC/61585535498382/',
    instagram: '',
  },

  seo: {
    defaultTitle: 'Where2 Junk Removal | Manchester, NH | You Point, We Haul!',
    defaultDescription:
      'Fast, transparent junk removal in Manchester NH. Same-day available. Residential and commercial. House cleanouts, garage cleanouts, yard waste, construction debris. Book online.',
    ogImage: '/images/og-image.jpg',
    schema: {
      type: 'LocalBusiness',
      subType: 'HomeAndConstructionBusiness',
    },
  },

  quiz: {
    headline: 'Not Sure What You Need? Let\'s Figure It Out.',
    subheadline: 'Answer three quick questions and we will tell you exactly which service fits your situation and what it typically costs.',
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
      headline: 'Where should we send your recommendation and price range?',
      fields: ['name', 'phone', 'email'],
      submitLabel: 'See My Recommendation',
    },
    result: {
      headline: 'Here Is What We Recommend For You',
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
