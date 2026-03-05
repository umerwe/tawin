export const products = [
  {
    id: 1,
    title: { en: "Industrial Transformer", ar: "محول صناعي" },
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
    category: { en: "Electricals", ar: "الكهربائيات" },
    price: 85.0,
    rating: 5,
    image: "/468478.png",
    description: {
      en: "Kamstrup Omnipower smart meter for accurate three-phase electricity monitoring with digital LCD display.",
      ar: "عداد ذكي أومني باور من كامستروب لمراقبة دقيقة للكهرباء ثلاثية الأطوار مع شاشة LCD رقمية.",
    },
    isNew: true,
  },
  {
    id: 4,
    title: { en: "Industrial Power Generator", ar: "مولد طاقة صناعي" },
    category: { en: "Solar Energy", ar: "الطاقة الشمسية" },
    price: 4500.0,
    rating: 5,
    image: "/647719.png",
    description: {
      en: "Kohler high-output standby generator for construction sites and commercial buildings.",
      ar: "مولد احتياطي عالي الإنتاج من كوهلر لمواقع البناء والمباني التجارية.",
    },
  },
  {
    id: 5,
    title: { en: "Modern Aluminum Glass Door", ar: "باب زجاجي ألمنيوم حديث" },
    category: { en: "Doors", ar: "الأبواب" },
    price: 550.0,
    rating: 5,
    image: "/126305.png",
    isNew: true,
    description: {
      en: "Sleek modern aluminum-framed glass door ideal for interior and exterior use. Provides both security and contemporary design.",
      ar: "باب زجاجي بإطار ألمنيوم عصري مثالي للاستخدام الداخلي والخارجي. يوفر الأمان والتصميم المعاصر.",
    },
  },
  {
    id: 6,
    title: { en: "Pro Industrial Waterbased Paint", ar: "دهان مائي صناعي احترافي" },
    category: { en: "Paints", ar: "الدهانات" },
    price: 45.0,
    rating: 4,
    image: "/images (2).jpeg",
    description: {
      en: "Waterbased Acrolon 100 high-performance coating for industrial surfaces.",
      ar: "طلاء أكريليك يوريثان مائي أكرولون 100 عالي الأداء للأسطح الصناعية.",
    },
  },
  {
    id: 7,
    title: { en: "Glass Balustrade Railing", ar: "درابزين زجاجي" },
    category: { en: "Building Materials", ar: "مواد البناء" },
    price: 120.0,
    rating: 5,
    image: "/596425.png",
    description: {
      en: "Premium tempered glass balustrade railing, ideal for balconies and staircases. Combines elegance and safety for modern buildings.",
      ar: "درابزين زجاجي مقوى عالي الجودة، مثالي للشرفات والسلالم. يجمع بين الأناقة والأمان للمباني الحديثة.",
    },
  },
];


export const categories = [
    {
        id: 11,
        title: {
            en: "Electricals",
            ar: "الكهربائيات"
        },
        subtitle: {
            en: "High-performance electrical components and smart metering solutions for industrial and residential grids.",
            ar: "مكونات كهربائية عالية الأداء وحلول عدادات ذكية لشبكات صناعية وسكنية."
        },
        image: "/468478.png"
    },
    {
        id: 12,
        title: {
            en: "Doors",
            ar: "الأبواب"
        },
        subtitle: {
            en: "Premium interior and exterior doors designed for modern security, durability, and architectural style.",
            ar: "أبواب داخلية وخارجية فاخرة مصممة للأمان الحديث والمتانة والأسلوب المعماري."
        },
        image: "/126305.png"
    },
    {
        id: 13,
        title: {
            en: "Paints",
            ar: "الدهانات"
        },
        subtitle: {
            en: "Professional-grade industrial coatings and high-quality water-based paints for a long-lasting finish.",
            ar: "طلاءات صناعية احترافية ودهانات مائية عالية الجودة لتشطيب طويل الأمد."
        },
        image: "/images (2).jpeg"
    },
    {
        id: 14,
        title: {
            en: "Walls & Floors",
            ar: "الجدران والأرضيات"
        },
        subtitle: {
            en: "Modern vanities, elegant tiling, and flooring solutions to elevate your interior design.",
            ar: "خزائن حمام حديثة، بلاط أنيق، وحلول أرضيات لرفع مستوى تصميم داخليتك."
        },
        image: "/22018.png"
    },
    {
        id: 15,
        title: {
            en: "Building Materials",
            ar: "مواد البناء"
        },
        subtitle: {
            en: "Robust structural components and high-quality safety systems for reliable construction.",
            ar: "مكونات هيكلية قوية وأنظمة أمان عالية الجودة للبناء الموثوق."
        },
        image: "/596425.png"
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
        icon: "Gavel",
    },
    {
        id: "supported",
        title: { en: "Supported by Ministry", ar: "مدعومة من وزارة التجارة" },
        description: { 
            en: "An integrated digital platform for building materials management, supported by government entities to ensure transparency.", 
            ar: "منصة رقمية متكاملة لإدارة وشراء مواد البناء، مدعومة من الجهات الحكومية لضمان الشفافية والموثوقية." 
        },
        icon: "Award",
    },
    {
        id: "advanced",
        title: { en: "Advanced System", ar: "نظام متطور" },
        description: { 
            en: "An advanced management system allowing control over inventory, prices, orders, and high-efficiency operational reports.", 
            ar: "نظام إدارة متطور يتيح التحكم بالمخزون، الأسعار، الطلبات، والتقارير التشغيلية بكفاءة عالية." 
        },
        icon: "Settings",
    },
    {
        id: "tracking",
        title: { en: "Easy Order Tracking", ar: "تتبع الطلب بسهولة" },
        description: { 
            en: "A professional electronic store where customers can browse products, submit orders, and track them easily and safely.", 
            ar: "متجر إلكتروني احترافي يمكن العملاء من استعراض المنتجات، تقديم الطلبات، وتتبعها بسهولة وأمان." 
        },
        icon: "MapPin",
    }
];