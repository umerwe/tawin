export const products = [
  {
    id: 1,
    title: { en: "Industrial Transformer", ar: "محول صناعي" },
    slug: "industrial-transformer",
    category: { en: "Electricals", ar: "الكهربائيات" },
    price: 1250.0,
    originalPrice: 1500.0,
    rating: 5,
    image: "/16431.png",
    isNew: true,
    discount: 15,
    description: {
      en: "High-capacity outdoor electrical transformer designed for industrial power distribution. Features robust cooling fins and high-voltage bushings.",
      ar: "محول كهربائي خارجي عالي السعة مصمم لتوزيع الطاقة الصناعية. يتميز بزعانف تبريد قوية وموصلات جهد عالي.",
    },
    measurements: '48" x 36" x 60"',
    colors: ["Grey"],
    reviews: 24,
  },
  {
    id: 2,
    title: { en: "Modern Bathroom Vanity", ar: "خزانة حمام حديثة" },
    slug: "modern-bathroom-vanity",
    category: { en: "Walls & Floors", ar: "الجدران والأرضيات" },
    price: 299.0,
    originalPrice: 450.0,
    rating: 4,
    image: "/22018.png",
    description: {
      en: "Wall-mounted dark wood vanity with a sleek white ceramic basin and chrome faucet. Perfect for modern minimalist bathroom designs.",
      ar: "خزانة حمام معلقة على الحائط من الخشب الداكن مع حوض سيراميك أبيض أنيق وصنبور كروم. مثالية لتصاميم الحمامات الحديثة البسيطة.",
    },
    measurements: '24" x 18" x 20"',
    colors: ["Charcoal", "White"],
    reviews: 12,
  },
  {
    id: 3,
    title: { en: "Omnipower Three-Phase Meter", ar: "عداد أومني باور ثلاثي الأطوار" },
    slug: "omnipower-three-phase-meter",
    category: { en: "Electricals", ar: "الكهربائيات" },
    price: 85.0,
    rating: 5,
    image: "/468478.png",
    description: {
      en: "Kamstrup Omnipower smart meter for accurate three-phase electricity monitoring with digital LCD display.",
      ar: "عداد ذكي أومني باور من كامستروب لمراقبة دقيقة للكهرباء ثلاثية الأطوار مع شاشة LCD رقمية.",
    },
    isNew: true,
    reviews: 10,
  },
  {
    id: 4,
    title: { en: "Industrial Power Generator", ar: "مولد طاقة صناعي" },
    slug: "industrial-power-generator",
    category: { en: "Solar Energy", ar: "الطاقة الشمسية" },
    price: 4500.0,
    rating: 5,
    image: "/647719.png",
    description: {
      en: "Kohler high-output standby generator for construction sites and commercial buildings.",
      ar: "مولد احتياطي عالي الإنتاج من كوهلر لمواقع البناء والمباني التجارية.",
    },
    reviews: 15,
  },
  {
    id: 5,
    title: { en: "Modern Aluminum Glass Door", ar: "باب زجاجي ألمنيوم حديث" },
    slug: "modern-aluminum-glass-door",
    category: { en: "Doors", ar: "الأبواب" },
    price: 550.0,
    rating: 5,
    image: "/126305.png",
    isNew: true,
    description: {
      en: "Sleek modern aluminum-framed glass door ideal for interior and exterior use. Provides both security and contemporary design.",
      ar: "باب زجاجي بإطار ألمنيوم عصري مثالي للاستخدام الداخلي والخارجي. يوفر الأمان والتصميم المعاصر.",
    },
    reviews: 8,
  },
  {
    id: 6,
    title: { en: "Pro Industrial Waterbased Paint", ar: "دهان مائي صناعي احترافي" },
    slug: "pro-industrial-waterbased-paint",
    category: { en: "Paints", ar: "الدهانات" },
    price: 45.0,
    rating: 4,
    image: "/images (2).jpeg",
    description: {
      en: "Waterbased Acrolon 100 high-performance coating for industrial surfaces.",
      ar: "طلاء أكريليك يوريثان مائي أكرولون 100 عالي الأداء للأسطح الصناعية.",
    },
    reviews: 21,
  },
  {
    id: 7,
    title: { en: "Glass Balustrade Railing", ar: "درابزين زجاجي" },
    slug: "glass-balustrade-railing",
    category: { en: "Building Materials", ar: "مواد البناء" },
    price: 120.0,
    rating: 5,
    image: "/596425.png",
    description: {
      en: "Premium tempered glass balustrade railing, ideal for balconies and staircases.",
      ar: "درابزين زجاجي مقوى عالي الجودة، مثالي للشرفات والسلالم. يجمع بين الأناقة والأمان للمباني الحديثة.",
    },
    reviews: 33,
  },

  // --- NEW DATA (Added Slugs & Unsplash Images) ---
  {
    id: 101,
    title: { en: "Premium Cement 50kg", ar: "أسمنت فاخر 50 كغ" },
    slug: "premium-cement-50kg",
    category: { en: "Building Materials", ar: "مواد البناء" },
    price: 12.5,
    originalPrice: 15.0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=800&auto=format&fit=crop",
    isNew: true,
    discount: 15,
    description: {
      en: "High-strength portland cement suitable for all structural construction needs.",
      ar: "أسمنت بورتلاندي عالي القوة مناسب لجميع احتياجات البناء الهيكلية.",
    },
    measurements: "50kg bag",
    reviews: 45,
  },
  {
    id: 102,
    title: { en: "Red Clay Bricks", ar: "طوب أحمر" },
    slug: "red-clay-bricks",
    category: { en: "Building Materials", ar: "مواد البناء" },
    price: 0.5,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1590059392604-03713028d011?q=80&w=800&auto=format&fit=crop",
    description: {
      en: "Durable fire-baked red clay bricks for load-bearing walls.",
      ar: "طوب طيني أحمر متين مخبوز بالنار للجدران الحاملة.",
    },
    measurements: "9x4.5x3 inch",
    reviews: 112,
  },
  {
    id: 105,
    title: { en: "Professional Electric Drill", ar: "مثقاب كهربائي احترافي" },
    slug: "pro-electric-drill",
    category: { en: "Hardware & Tools", ar: "الأجهزة والأدوات" },
    price: 75.0,
    originalPrice: 85.0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop",
    isNew: true,
    discount: 12,
    description: {
      en: "High-torque cordless drill with 20V battery and multiple speed settings.",
      ar: "مثقاب لاسلكي عالي العزم مع بطارية 20 فولت وإعدادات سرعة متعددة.",
    },
    colors: ["Yellow", "Black"],
    reviews: 89,
  },
  {
    id: 107,
    title: { en: "Heavy-Duty Safety Helmet", ar: "خوذة سلامة شديدة التحمل" },
    slug: "heavy-duty-safety-helmet",
    category: { en: "Safety & Security", ar: "الأمن والسلامة" },
    price: 20.0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800&auto=format&fit=crop",
    description: {
      en: "ANSI certified safety helmet with adjustable suspension for maximum site protection.",
      ar: "خوذة سلامة معتمدة من ANSI مع نظام تعليق قابل للتعديل لتوفير أقصى قدر من الحماية في الموقع.",
    },
    colors: ["White", "Yellow", "Orange"],
    reviews: 56,
  },
  {
    id: 109,
    title: { en: "Matte Interior Wall Paint", ar: "دهان جدران داخلي مطفي" },
    slug: "matte-interior-paint",
    category: { en: "Paints", ar: "الدهانات" },
    price: 25.0,
    originalPrice: 30.0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1562592306-4500ed91c422?q=80&w=800&auto=format&fit=crop",
    discount: 17,
    description: {
      en: "Eco-friendly, low VOC matte paint for a smooth and durable wall finish.",
      ar: "دهان مطفي صديق للبيئة ومنخفض المركبات العضوية المتطايرة لتشطيب جدران ناعم ومتين.",
    },
    measurements: "5L Bucket",
    reviews: 34,
  },
  {
    id: 112,
    title: { en: "Weatherproof Exterior Paint", ar: "دهان خارجي مقاوم للطقس" },
    slug: "weatherproof-exterior-paint",
    category: { en: "Paints", ar: "الدهانات" },
    price: 65.0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=800&auto=format&fit=crop",
    description: {
      en: "UV-resistant exterior paint designed to withstand extreme heat and humidity.",
      ar: "دهان خارجي مقاوم للأشعة فوق البنفسجية مصمم لتحمل الحرارة الشديدة والرطوبة.",
    },
    measurements: "15L Bucket",
    reviews: 27,
  },
  {
    id: 116,
    title: { en: "Professional Hand Saw", ar: "منشار يدوي احترافي" },
    slug: "pro-hand-saw",
    category: { en: "Hardware & Tools", ar: "الأجهزة والأدوات" },
    price: 18.0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=800&auto=format&fit=crop",
    description: {
      en: "Sharp carbon steel blade hand saw for clean wood cutting.",
      ar: "منشار يدوي بشفرة حادة من الصلب الكربوني لقطع الخشب بشكل نظيف.",
    },
    reviews: 19,
  },
  {
    id: 120,
    title: { en: "Steel Toed Safety Boots", ar: "أحذية سلامة بمقدمة فولاذية" },
    slug: "steel-toed-boots",
    category: { en: "Safety & Security", ar: "الأمن والسلامة" },
    price: 40.0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop",
    description: {
      en: "Waterproof leather safety boots with puncture-resistant soles.",
      ar: "أحذية سلامة جلدية مقاومة للماء مع نعال مقاومة للثقب.",
    },
    colors: ["Black", "Brown"],
    reviews: 62,
  },
  {
    id: 121,
    title: { en: "LED Panel Light 24W", ar: "لوحة إضاءة LED بقدرة 24 واط" },
    slug: "led-panel-light-24w",
    category: { en: "Lighting", ar: "الإضاءة" },
    price: 15.0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=800&auto=format&fit=crop",
    isNew: true,
    description: {
      en: "Energy-efficient recessed LED panel light for office and home use.",
      ar: "مصباح لوحة LED غائر موفر للطاقة للاستخدام المكتبي والمنزلي.",
    },
    reviews: 41,
  }
];

export const categories = [
  {
    "_id": "cat011",
    "name": { "en": "Electricals", "ar": "الكهربائيات" },
    "slug": "electricals",
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "High-performance electrical components and smart metering solutions for industrial and residential grids.",
      "ar": "مكونات كهربائية عالية الأداء وحلول عدادات ذكية لشبكات صناعية وسكنية."
    },
    "subcategories": [
      { "_id": "sub111", "parentId": "cat011", "name": { "en": "Wiring & Cables", "ar": "الأسلاك والكابلات" }, "slug": "wiring-cables" },
      { "_id": "sub112", "parentId": "cat011", "name": { "en": "Circuit Breakers", "ar": "قواطع الدائرة" }, "slug": "circuit-breakers" }
    ]
  },
  {
    "_id": "cat012",
    "name": { "en": "Doors", "ar": "الأبواب" },
    "slug": "doors",
    "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Premium interior and exterior doors designed for modern security, durability, and architectural style.",
      "ar": "أبواب داخلية وخارجية فاخرة مصممة للأمان الحديث والمتانة والأسلوب المعماري."
    },
    "subcategories": [
      { "_id": "sub121", "parentId": "cat012", "name": { "en": "Wooden Doors", "ar": "أبواب خشبية" }, "slug": "wooden-doors" },
      { "_id": "sub122", "parentId": "cat012", "name": { "en": "Steel Doors", "ar": "أبواب فولاذية" }, "slug": "steel-doors" }
    ]
  },
  {
    "_id": "cat013",
    "name": { "en": "Paints", "ar": "الدهانات" },
    "slug": "paints",
    "image": "https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Professional-grade industrial coatings and high-quality water-based paints for a long-lasting finish.",
      "ar": "طلاءات صناعية احترافية ودهانات مائية عالية الجودة لتشطيب طويل الأمد."
    },
    "subcategories": [
      { "_id": "sub131", "parentId": "cat013", "name": { "en": "Interior Paint", "ar": "دهان داخلي" }, "slug": "interior-paint" },
      { "_id": "sub132", "parentId": "cat013", "name": { "en": "Exterior Paint", "ar": "دهان خارجي" }, "slug": "exterior-paint" }
    ]
  },
  {
    "_id": "cat014",
    "name": { "en": "Walls & Floors", "ar": "الجدران والأرضيات" },
    "slug": "walls-floors",
    "image": "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Modern vanities, elegant tiling, and flooring solutions to elevate your interior design.",
      "ar": "خزائن حمام حديثة، بلاط أنيق، وحلول أرضيات لرفع مستوى تصميم داخليتك."
    },
    "subcategories": [
      { "_id": "sub141", "parentId": "cat014", "name": { "en": "Ceramic Tiles", "ar": "بلاط سيراميك" }, "slug": "ceramic-tiles" },
      { "_id": "sub142", "parentId": "cat014", "name": { "en": "Marble", "ar": "رخام" }, "slug": "marble" }
    ]
  },
  {
    "_id": "cat015",
    "name": { "en": "Building Materials", "ar": "مواد البناء" },
    "slug": "building-materials",
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Robust structural components and high-quality safety systems for reliable construction.",
      "ar": "مكونات هيكلية قوية وأنظمة أمان عالية الجودة للبناء الموثوق."
    },
    "subcategories": [
      { "_id": "sub151", "parentId": "cat015", "name": { "en": "Cement", "ar": "أسمنت" }, "slug": "cement" },
      { "_id": "sub152", "parentId": "cat015", "name": { "en": "Steel Bars", "ar": "أسياخ الحديد" }, "slug": "steel-bars" }
    ]
  },
  {
    "_id": "cat016",
    "name": { "en": "Plumbing", "ar": "السباكة" },
    "slug": "plumbing",
    "image": "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Durable piping systems, valves, and water management solutions for every scale.",
      "ar": "أنظمة أنابيب متينة وصمامات وحلول إدارة المياه لجميع المستويات."
    },
    "subcategories": []
  },
  {
    "_id": "cat017",
    "name": { "en": "Hardware & Tools", "ar": "الأجهزة والأدوات" },
    "slug": "hardware-tools",
    "image": "https://images.unsplash.com/photo-1530124560677-bbfda3afaf9e?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "A wide range of hand and power tools for professional contractors and DIY enthusiasts.",
      "ar": "مجموعة واسعة من الأدوات اليدوية والكهربائية للمقاولين المحترفين وعشاق الأعمال اليدوية."
    },
    "subcategories": []
  },
  {
    "_id": "cat018",
    "name": { "en": "Lighting", "ar": "الإضاءة" },
    "slug": "lighting",
    "image": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Energy-efficient LED solutions and decorative fixtures for indoor and outdoor spaces.",
      "ar": "حلول LED موفرة للطاقة وتركيبات ديكورية للمساحات الداخلية والخارجية."
    },
    "subcategories": []
  },
  {
    "_id": "cat019",
    "name": { "en": "HVAC Systems", "ar": "أنظمة التكييف" },
    "slug": "hvac-systems",
    "image": "https://images.unsplash.com/photo-1599700403969-f77b3aa74837?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Advanced heating, ventilation, and air conditioning units for climate control.",
      "ar": "وحدات تدفئة وتهوية وتكييف هواء متقدمة للتحكم في المناخ."
    },
    "subcategories": []
  },
  {
    "_id": "cat020",
    "name": { "en": "Safety & Security", "ar": "الأمن والسلامة" },
    "slug": "safety-security",
    "image": "https://images.unsplash.com/photo-1590483734747-39440751c231?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Fire protection systems, CCTV, and personal protective equipment (PPE).",
      "ar": "أنظمة الحماية من الحريق، والكاميرات، ومعدات الوقاية الشخصية."
    },
    "subcategories": []
  },
  {
    "_id": "cat021",
    "name": { "en": "Kitchen & Bath", "ar": "المطبخ والحمام" },
    "slug": "kitchen-bath",
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "Elegant faucets, sinks, and cabinetry to modernize your functional spaces.",
      "ar": "صنابير وأحواض وخزائن أنيقة لتحديث مساحاتك الوظيفية."
    },
    "subcategories": []
  },
  {
    "_id": "cat022",
    "name": { "en": "Roofing & Insulation", "ar": "العزل والأسقف" },
    "slug": "roofing-insulation",
    "image": "https://images.unsplash.com/photo-1632759145351-1d592939e802?q=80&w=800&auto=format&fit=crop",
    "description": {
      "en": "High-quality thermal insulation and weatherproofing materials for structural integrity.",
      "ar": "مواد عزل حراري وعزل مائي عالية الجودة لسلامة الهيكل."
    },
    "subcategories": []
  }
];

export const foundations = [
  {
    id: "secure",
    title: { en: "Safe & Exemplary", ar: "آمنة و نموذجية" },
    description: {
      en: "A secure technical infrastructure compatible with official standards, ensuring data protection and operational continuity on a national level.",
      ar: "بنية تقنية آمنة ومتوافقة مع المعايير الرسمية، تضمن حماية البيانات واستمرارية العمليات على مستوى وطني."
    },
  },
  {
    id: "supported",
    title: { en: "Supported by Ministry", ar: "مدعومة من وزارة التجارة" },
    description: {
      en: "An integrated digital platform for building materials management, supported by government entities to ensure transparency.",
      ar: "منصة رقمية متكاملة لإدارة وشراء مواد البناء، مدعومة من الجهات الحكومية لضمان الشفافية والموثوقية."
    },
  },
  {
    id: "advanced",
    title: { en: "Advanced System", ar: "نظام متطور" },
    description: {
      en: "An advanced management system allowing control over inventory, prices, orders, and high-efficiency operational reports.",
      ar: "نظام إدارة متطور يتيح التحكم بالمخزون، الأسعار، الطلبات، والتقارير التشغيلية بكفاءة عالية."
    },
  },
  {
    id: "tracking",
    title: { en: "Easy Order Tracking", ar: "تتبع الطلب بسهولة" },
    description: {
      en: "A professional electronic store where customers can browse products, submit orders, and track them easily and safely.",
      ar: "متجر إلكتروني احترافي يمكن العملاء من استعراض المنتجات، تقديم الطلبات، وتتبعها بسهولة وأمان."
    }
  }
];