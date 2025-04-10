import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  Wallet,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    name: "Managed Transactions",
    description: "Track every rupee moving in and out of your accounts.",
    value: "₹2B+",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
    linkUrl: "/features/account-setup"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
    linkUrl: "/features/tracking"
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
    linkUrl: "/features/insights"
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Rajesh Sharma",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    quote:
      "Paisa has transformed how I manage my business finances in Delhi. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Priya Patel",
    role: "Freelance Designer",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my creative work instead of manual data entry and tracking GST expenses.",
  },
  {
    name: "Vikram Malhotra",
    role: "IT Professional",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote:
      "I recommend Paisa to all my colleagues in Bangalore. The multiple account support and detailed analytics help me track my investments and expenses seamlessly.",
  },
  {
    name: "Ananya Reddy",
    role: "Medical Professional",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    quote:
      "As a doctor with a busy schedule, Paisa has been a lifesaver. The monthly reports help me understand my spending patterns, and I love how it automatically categorizes my hospital expenses.",
  },
  {
    name: "Ravi Kapoor",
    role: "Financial Analyst",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Being in finance myself, I'm quite particular about financial tools. Paisa exceeds expectations with its robust budgeting features and accurate transaction tracking. The multi-currency support is perfect for my international investments.",
  },
  {
    name: "Meera Iyer",
    role: "Digital Nomad",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    quote:
      "Traveling across India while working remotely means I need to track expenses from multiple cities. Paisa's mobile interface and location tagging for transactions have made expense management incredibly simple.",
  }
];
