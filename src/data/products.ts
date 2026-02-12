import type { StaticImageData } from "next/image";
import machineImage from "@/assets/machine1.png";
import thermometerImage from "@/assets/termometer.png";
import cardioImage from "@/assets/cardio.png";
import machineImageAlt from "@/assets/machine.png";
import vitaminsImage from "@/assets/vitamins.png";
import matImage from "@/assets/mat.png";
import dumbelImage from "@/assets/dumbel.png";

export type Product = {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: string;
  image: StaticImageData;
  gallery: StaticImageData[];
  rating: number;
  reviews: number;
  badge: string | null;
  stock: "In Stock" | "Low Stock";
  category: string;
  highlights: string[];
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    name: "Pro BP Monitor",
    slug: "pro-bp-monitor",
    description: "Digital Upper Arm Cuff",
    longDescription:
      "Track your blood pressure with clinical-grade accuracy and a clear backlit display. Designed for daily monitoring with easy-to-store readings.",
    price: "GHS 650.00",
    image: machineImage,
    gallery: [machineImage, machineImageAlt, cardioImage],
    rating: 4.9,
    reviews: 128,
    badge: null,
    stock: "In Stock",
    category: "Blood Pressure",
    highlights: [
      "Upper arm accuracy with quick inflation",
      "Stores 120 readings for two users",
      "Irregular heartbeat detection",
      "Large, easy-to-read screen",
    ],
    specs: [
      { label: "Cuff Size", value: "22-42 cm" },
      { label: "Power", value: "4x AA batteries" },
      { label: "Memory", value: "2 users" },
    ],
  },
  {
    name: "Smart Temp",
    slug: "smart-temp",
    description: "Instant Read Thermometer",
    longDescription:
      "Fast, accurate temperature checks with a gentle tip and ergonomic grip. Ideal for busy households and quick readings.",
    price: "GHS 260.00",
    image: thermometerImage,
    gallery: [thermometerImage, machineImageAlt, vitaminsImage],
    rating: 4.8,
    reviews: 45,
    badge: "Sale",
    stock: "Low Stock",
    category: "Thermometers",
    highlights: [
      "1-second reading speed",
      "Gentle, easy-clean tip",
      "Fever alert with color indicator",
      "Automatic power-off",
    ],
    specs: [
      { label: "Reading Time", value: "1 sec" },
      { label: "Display", value: "Backlit LCD" },
      { label: "Battery", value: "CR2032" },
    ],
  },
  {
    name: "Home Safety Kit",
    slug: "home-safety-kit",
    description: "120-Piece First Aid Set",
    longDescription:
      "A complete first aid solution for everyday emergencies. Packed with essentials for cuts, burns, and minor injuries.",
    price: "GHS 450.00",
    image: machineImageAlt,
    gallery: [machineImageAlt, machineImage, vitaminsImage],
    rating: 4.7,
    reviews: 89,
    badge: null,
    stock: "In Stock",
    category: "First Aid Kits",
    highlights: [
      "120 pieces for home or travel",
      "Organized compartments",
      "Durable, portable case",
      "Includes burn and wound care",
    ],
    specs: [
      { label: "Pieces", value: "120" },
      { label: "Case", value: "Water-resistant" },
      { label: "Weight", value: "0.9 kg" },
    ],
  },
  {
    name: "Pulse Check",
    slug: "pulse-check",
    description: "Fingertip Oximeter",
    longDescription:
      "Measure your oxygen saturation and pulse rate in seconds. Lightweight and portable for home or travel use.",
    price: "GHS 325.00",
    image: cardioImage,
    gallery: [cardioImage, machineImageAlt, thermometerImage],
    rating: 5.0,
    reviews: 210,
    badge: null,
    stock: "In Stock",
    category: "Monitoring Devices",
    highlights: [
      "Instant SpO2 and pulse readings",
      "Auto shutoff for battery savings",
      "Bright OLED display",
      "Fits most finger sizes",
    ],
    specs: [
      { label: "Display", value: "OLED" },
      { label: "Battery", value: "2x AAA" },
      { label: "Weight", value: "0.06 kg" },
    ],
  },
  {
    name: "Daily Vitamins",
    slug: "daily-vitamins",
    description: "Immune Support 60ct",
    longDescription:
      "A balanced daily multivitamin blend crafted to support energy, immunity, and overall wellness.",
    price: "GHS 120.00",
    image: vitaminsImage,
    gallery: [vitaminsImage, machineImageAlt, matImage],
    rating: 4.5,
    reviews: 52,
    badge: null,
    stock: "In Stock",
    category: "Wellness",
    highlights: [
      "Complete daily nutrient blend",
      "Formulated for immune support",
      "Easy-to-swallow capsules",
      "60-day supply",
    ],
    specs: [
      { label: "Count", value: "60 capsules" },
      { label: "Serving", value: "1/day" },
      { label: "Diet", value: "Gluten-free" },
    ],
  },
  {
    name: "Yoga Mat Pro",
    slug: "yoga-mat-pro",
    description: "Non-slip Exercise Mat",
    longDescription:
      "Cushioned support with a non-slip grip, designed for yoga, Pilates, and stretching sessions.",
    price: "GHS 380.00",
    image: matImage,
    gallery: [matImage, dumbelImage, cardioImage],
    rating: 4.9,
    reviews: 18,
    badge: null,
    stock: "In Stock",
    category: "Fitness",
    highlights: [
      "Non-slip textured surface",
      "Cushioned for joint support",
      "Easy to roll and carry",
      "Sweat-resistant finish",
    ],
    specs: [
      { label: "Thickness", value: "6 mm" },
      { label: "Length", value: "183 cm" },
      { label: "Material", value: "TPE" },
    ],
  },
  {
    name: "Power Dumbbells",
    slug: "power-dumbbells",
    description: "Adjustable Strength Set",
    longDescription:
      "Build strength efficiently with adjustable dumbbells that save space and grow with your routine.",
    price: "GHS 720.00",
    image: dumbelImage,
    gallery: [dumbelImage, matImage, cardioImage],
    rating: 4.6,
    reviews: 64,
    badge: null,
    stock: "In Stock",
    category: "Fitness",
    highlights: [
      "Adjustable weight increments",
      "Compact storage tray",
      "Ergonomic grip",
      "Durable steel core",
    ],
    specs: [
      { label: "Weight Range", value: "5-25 kg" },
      { label: "Material", value: "Steel + TPU" },
      { label: "Set", value: "2 dumbbells" },
    ],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
