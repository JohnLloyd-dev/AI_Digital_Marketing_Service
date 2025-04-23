import {
  Search,
  Megaphone,
  TrendingUp,
  Mail,
  Bot,
  PieChart
} from "lucide-react";

export const services = [
  {
    id: 1,
    title: "AI-Powered SEO",
    description: "Optimize your website with machine learning algorithms that analyze thousands of ranking factors in real-time.",
    icon: Search,
    iconBgColor: "bg-primary-100",
    iconColor: "text-primary",
    features: [
      "Predictive keyword analysis",
      "Content optimization",
      "Competitor intelligence"
    ],
    price: 899,
    priceColor: "text-primary",
    arrowColor: "text-primary",
    arrowHoverColor: "text-primary-600"
  },
  {
    id: 2,
    title: "Smart Social Media Management",
    description: "Let AI analyze your audience and automatically optimize content posting for maximum engagement.",
    icon: Megaphone,
    iconBgColor: "bg-secondary-100",
    iconColor: "text-secondary",
    features: [
      "AI content generation",
      "Optimal posting schedules",
      "Engagement analytics"
    ],
    price: 749,
    priceColor: "text-secondary",
    arrowColor: "text-secondary",
    arrowHoverColor: "text-secondary-600"
  },
  {
    id: 3,
    title: "Predictive PPC Campaigns",
    description: "Machine learning algorithms that dynamically adjust your ad spend based on predicted conversion rates.",
    icon: TrendingUp,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-500",
    features: [
      "Dynamic bid optimization",
      "A/B testing automation",
      "ROI forecasting"
    ],
    price: 1199,
    priceColor: "text-red-500",
    arrowColor: "text-red-500",
    arrowHoverColor: "text-red-400"
  },
  {
    id: 4,
    title: "AI Email Marketing",
    description: "Personalized email campaigns that learn from recipient behavior to improve open and conversion rates.",
    icon: Mail,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    features: [
      "Smart segmentation",
      "Dynamic content optimization",
      "Behavior-based triggers"
    ],
    price: 649,
    priceColor: "text-purple-600",
    arrowColor: "text-purple-600",
    arrowHoverColor: "text-purple-800"
  },
  {
    id: 5,
    title: "Chatbot & Conversation AI",
    description: "Intelligent chatbots that engage visitors, qualify leads, and provide 24/7 customer support.",
    icon: Bot,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    features: [
      "Natural language processing",
      "Lead qualification",
      "Integration with CRM"
    ],
    price: 549,
    priceColor: "text-blue-600",
    arrowColor: "text-blue-600",
    arrowHoverColor: "text-blue-800"
  },
  {
    id: 6,
    title: "AI Analytics & Insights",
    description: "Advanced analytics that uncover hidden patterns and provide actionable recommendations.",
    icon: PieChart,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    features: [
      "Predictive analytics",
      "Customer journey mapping",
      "Automated reporting"
    ],
    price: 799,
    priceColor: "text-green-600",
    arrowColor: "text-green-600",
    arrowHoverColor: "text-green-800"
  }
];
