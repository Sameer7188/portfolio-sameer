export const profile = {
  name: 'Sameer Gediya',
  first: 'Sameer',
  last: 'Gediya',
  email: 'sameergediya1415@gmail.com',
  phone: '+91 98254 17188',
  location: 'Ahmedabad, India',
  timezone: 'IST · UTC+5:30',
  current: {
    company: 'Nanta Tech Ltd.',
    role: 'AI Intern',
    period: 'Aug 2026 — Present',
    mode: 'Ahmedabad · On-site',
    companyLogo: '/logos/nanta-mark.png',
  },
  roles: [
    'AI Intern @ Nanta Tech',
    'Computer Vision — YOLO & OpenCV',
    'LLM Training & Fine-tuning',
    'Full Stack Engineer',
  ],
  socials: {
    github: 'https://github.com/sameer7188',
    linkedin: 'https://linkedin.com/in/sameer-gediya',
    leetcode: 'https://leetcode.com/u/Sameer1415',
    codeforces: 'https://codeforces.com/profile/sameer.g',
    codechef: 'https://codechef.com/users/sameer1415',
  },
}

export const marqueeWords = [
  'Python', 'PyTorch', 'YOLO', 'OpenCV', 'LLM Fine-tuning', 'Computer Vision',
  'Object Detection', 'Model Training', 'React.js', 'Next.js', 'Node.js',
  'Express', 'MongoDB', 'REST APIs', 'Nginx', 'Linux', 'Git',
]

export const metrics = [
  { value: '600', suffix: '+', label: 'DSA problems solved', note: 'LeetCode · Codeforces · CodeChef' },
  { value: '1681', suffix: '', label: 'LeetCode rating', note: 'Top 295 — Weekly Contest 445' },
  { value: '3', suffix: '', label: 'Engineering internships', note: 'Nanta · Adiance · Celebal' },
  { value: '57', suffix: '%', label: 'Faster page loads', note: '4.2s → 1.8s on production sites' },
]

export const experiences = [
  {
    role: 'AI Intern',
    company: 'Nanta Tech Ltd.',
    monogram: 'NT',
    logo: '/logos/nanta-mark.png',
    period: 'Aug 2026 — Present',
    short: '2026',
    location: 'Ahmedabad · On-site',
    current: true,
    accent: 'ember',
    summary:
      'Hands-on machine learning — training and fine-tuning language models, and building computer vision pipelines for real-time detection.',
    highlights: [
      'Training and fine-tuning large language models on domain-specific datasets, then evaluating them against held-out benchmarks',
      'Building computer vision pipelines with YOLO for object detection and OpenCV for frame processing and pre-processing',
      'Preparing, cleaning and annotating training data, and running the augmentation passes that keep models generalising',
      'Tuning hyperparameters and iterating on model architecture to push accuracy and cut inference latency',
      'Serving trained models behind Python APIs so they can be consumed by production applications',
    ],
    tech: ['Python', 'PyTorch', 'YOLO', 'OpenCV', 'LLM Fine-tuning', 'NumPy', 'Model Training'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Adiance Technologies',
    monogram: 'AT',
    logo: '/logos/adiance-mark.png',
    period: 'Jan 2026 — Jul 2026',
    short: '2026',
    location: 'Ahmedabad · On-site',
    current: false,
    accent: 'indigo',
    summary:
      'Owned frontend and backend work across three production websites — performance, SEO, REST APIs and deployment.',
    highlights: [
      'Improved website performance by 30–40% by optimising images and removing unused CSS/JS',
      'Cut page load time from ~4s to under 2.5s, lifting Core Web Vitals across the board',
      'Raised SEO scores and organic visibility through technical SEO and structured-data work',
      'Built and integrated REST APIs, improving data handling efficiency by 25%',
      'Improved uptime and cut response errors via Nginx tuning and backend optimisation',
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'Next.js', 'React.js', 'REST API', 'Nginx', 'PM2'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Celebal Technologies',
    monogram: 'CT',
    logo: '/logos/celebal-mark.png',
    period: 'Jun 2025 — Aug 2025',
    short: '2025',
    location: 'Remote · Jaipur',
    current: false,
    accent: 'teal',
    summary:
      'Built React interfaces and a real-time booking product as part of a distributed frontend team.',
    highlights: [
      'Developed scalable React applications, reducing component redundancy by 20%',
      'Improved UI responsiveness and load performance by 25% through targeted optimisation',
      'Built a ticket booking system handling concurrent users with real-time seat updates',
      'Integrated APIs to speed up data fetching and smooth out the user experience',
    ],
    tech: ['React', 'Node.js', 'Express', 'REST API'],
  },
]

export const projects = [
  {
    index: '01',
    title: 'Vestrioz',
    kind: 'E-commerce Platform',
    role: 'Full Stack Developer',
    period: 'Dec 2025 — Present',
    accent: 'ember',
    description:
      'A production e-commerce platform built end-to-end solo — secure OTP + JWT authentication, Razorpay payments, product and order management, and a responsive storefront deployed on a VPS.',
    highlights: [
      'OTP and JWT authentication hardening account access',
      'End-to-end Razorpay payment integration',
      'Full product, inventory and order management',
      'VPS deployment with PM2 process management',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay', 'VPS', 'PM2'],
    liveUrl: 'https://vestrioz.com',
    githubUrl: 'https://github.com/sameer7188',
  },
  {
    index: '02',
    title: 'Nayvora',
    kind: 'Company Website + CMS',
    role: 'Full Stack Developer',
    period: 'Jan 2026 — Feb 2026',
    accent: 'indigo',
    description:
      'A full-stack company website with multi-region routing, a blog and portfolio system, and an admin panel that makes every piece of content editable without touching code.',
    highlights: [
      'Multi-page architecture across 10+ dynamic routes',
      'Multi-region support — Global, India and Europe',
      'Admin panel for 100% dynamic content management',
      '30–40% faster page loads alongside SEO work',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'JWT', 'Nodemailer', 'Nginx', 'PM2'],
    liveUrl: null,
    githubUrl: 'https://github.com/sameer7188',
  },
  {
    index: '03',
    title: 'Ticket Booking System',
    kind: 'Real-time Booking App',
    role: 'Full Stack Developer · Celebal',
    period: 'Jun 2025 — Aug 2025',
    accent: 'teal',
    description:
      'A movie ticket booking system with authentication, live seat selection, a QR-based manual payment flow, receipt generation and a responsive browsing experience.',
    highlights: [
      'Secure JWT-based session handling',
      'Seat selection with real-time availability',
      'QR payment flow with receipt generation',
      'Full booking management interface',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    liveUrl: null,
    githubUrl: 'https://github.com/sameer7188',
  },
  {
    index: '04',
    title: 'Axiskem Global',
    kind: 'Corporate Website',
    role: 'Frontend Developer',
    period: 'Oct 2025',
    accent: 'amber',
    description:
      'A responsive corporate site for Axiskem Global Pvt. Ltd. with a clean visual system, an email-backed contact form, and lazy loading throughout for fast first paint.',
    highlights: [
      'Responsive layouts with a considered colour system',
      'Lazy loading for faster page load performance',
      'PHP-backed contact form with email delivery',
    ],
    tech: ['React.js', 'CSS', 'PHP'],
    liveUrl: null,
    githubUrl: 'https://github.com/sameer7188',
  },
]

export const skillGroups = [
  {
    num: '01',
    category: 'Frontend',
    accent: 'ember',
    blurb: 'Interfaces that stay fast and feel considered.',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    num: '02',
    category: 'Backend',
    accent: 'indigo',
    blurb: 'APIs and services built to hold up under load.',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 88 },
      { name: 'JWT Auth', level: 80 },
      { name: 'Socket.io', level: 70 },
    ],
  },
  {
    num: '03',
    category: 'AI & Machine Learning',
    accent: 'teal',
    blurb: 'Models trained, tuned and put to work.',
    skills: [
      { name: 'LLM Fine-tuning', level: 78 },
      { name: 'PyTorch', level: 75 },
      { name: 'Model Training', level: 76 },
      { name: 'Data Preprocessing', level: 80 },
    ],
  },
  {
    num: '04',
    category: 'Computer Vision',
    accent: 'indigo',
    blurb: 'Teaching software to read a frame.',
    skills: [
      { name: 'YOLO / Detection', level: 78 },
      { name: 'OpenCV', level: 80 },
      { name: 'Image Annotation', level: 82 },
      { name: 'NumPy', level: 78 },
    ],
  },
  {
    num: '05',
    category: 'Databases',
    accent: 'amber',
    blurb: 'Schemas that match how the product actually reads.',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Mongoose', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'SQL', level: 72 },
    ],
  },
  {
    num: '06',
    category: 'DevOps & Tools',
    accent: 'indigo',
    blurb: 'Shipping, serving and keeping things up.',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Nginx', level: 75 },
      { name: 'Linux / VPS', level: 72 },
      { name: 'PM2', level: 75 },
      { name: 'GitHub Actions', level: 68 },
    ],
  },
  {
    num: '07',
    category: 'Languages',
    accent: 'ember',
    blurb: 'The ones I reach for without thinking.',
    skills: [
      { name: 'Python', level: 82 },
      { name: 'JavaScript', level: 88 },
      { name: 'Java', level: 80 },
      { name: 'C / C++', level: 72 },
    ],
  },
]

export const competitive = [
  { platform: 'LeetCode', handle: 'Sameer1415', rating: '1681', href: 'https://leetcode.com/u/Sameer1415', accent: 'amber' },
  { platform: 'Codeforces', handle: 'sameer.g', rating: '1147', href: 'https://codeforces.com/profile/sameer.g', accent: 'indigo' },
  { platform: 'CodeChef', handle: 'sameer1415', rating: null, href: 'https://codechef.com/users/sameer1415', accent: 'ember' },
]

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Ahmedabad University',
    meta: 'SEAS · Ahmedabad, India',
    period: '2022 — 2026',
    accent: 'ember',
    details: [
      'Coursework: Data Structures, Algorithms, Operating Systems, DBMS',
      'Focus: machine learning, computer vision, backend systems, web performance',
    ],
  },
  {
    degree: 'HSC — Higher Secondary',
    institution: 'Akshar Jyoti High School',
    meta: 'GSEB · Surat, Gujarat',
    period: '2022',
    accent: 'indigo',
    details: [],
  },
  {
    degree: 'SSC — Secondary',
    institution: 'Yogi Pravruti Vidhyalaya',
    meta: 'GSEB · Surat, Gujarat',
    period: '2020',
    accent: 'teal',
    details: [],
  },
]

export const certifications = [
  {
    title: 'Programming Using Java',
    issuer: 'Infosys Springboard',
    period: 'May — Jun 2025',
    description:
      'Core Java, object-oriented design and DSA fundamentals — arrays, recursion, sorting, stacks and linked lists, with hands-on implementation throughout.',
  },
  {
    title: 'Data Structures & Algorithms Using Java',
    issuer: 'Infosys Springboard',
    period: 'Jun 2025',
    description:
      'Linear data structures and their operations, search and sort algorithms, core algorithmic techniques, and the fundamentals of complexity analysis.',
  },
]

export const navLinks = [
  { label: 'Index', href: '#index', id: 'index' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Craft', href: '#craft', id: 'craft' },
  { label: 'Background', href: '#background', id: 'background' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]
