import type { StaticImageData } from "next/image";
import blogImage from "@/assets/blogImage.png";
import cardioImage from "@/assets/cardio.png";
import drugsImage from "@/assets/drugs1.png";
import foodImage from "@/assets/food.png";
import matImage from "@/assets/mat.png";
import vitaminsImage from "@/assets/vitamins.png";
import dumbelImage from "@/assets/dumbel.png";

export type BlogAuthor = {
  name: string;
  role: string;
  avatarLabel: string;
};

export type BlogSection = {
  title: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: StaticImageData;
  author: BlogAuthor;
  sections: BlogSection[];
  quote: string;
  gallery: StaticImageData[];
  topics: string[];
};

export const blogs: BlogPost[] = [
  {
    slug: "future-of-home-health-monitoring",
    tag: "Editors Pick",
    title: "The Future of Home Health Monitoring: What You Need to Know",
    date: "Nov 12, 2023",
    readTime: "8 min read",
    excerpt:
      "From smart blood pressure monitors to wearable ECGs, technology is revolutionizing how we track our vitals at home.",
    coverImage: blogImage,
    author: {
      name: "Dr. Sarah Jenkins",
      role: "Chief Medical Officer",
      avatarLabel: "SJ",
    },
    sections: [
      {
        title: "The Rise of Wearable Tech",
        body:
          "Smartwatches were just the beginning. Today, we have rings that track sleep quality, patches that monitor glucose levels continuously, and even clothing with embedded sensors. These devices provide a wealth of data that, when interpreted correctly, can offer profound insights into one’s health.",
      },
      {
        title: "Integration into Daily Life",
        body:
          "Integrating these tools safely means establishing a baseline. Measure when you are healthy so you know what “normal” looks like for you. Consistency is key. Taking your blood pressure at the same time each day provides more reliable trend data than sporadic checks.",
      },
      {
        title: "Data Privacy Concerns",
        body:
          "All this data comes with risk. Privacy concerns persist. Ensure that the apps and devices you use comply with health data regulations and offer transparent privacy policies. Your health data is some of the most sensitive information you possess; protect it accordingly.",
      },
      {
        title: "The Future Outlook",
        body:
          "Looking ahead, AI will play a massive role in interpreting this data. Imagine an app that not only tells you your heart rate is high but correlates it with your sleep the night before and your extra cup of coffee, offering personalized advice to get back on track.",
      },
    ],
    quote:
      "The goal isn’t to replace doctors, but to give them better data so they can provide better care. Continuous monitoring captures the full picture that a single clinic visit might miss.",
    gallery: [cardioImage, drugsImage, foodImage],
    topics: ["#HealthTech", "#Wearables", "#HomeHealth", "#Wellness"],
  },
  {
    slug: "understanding-blood-pressure-readings",
    tag: "Heart Health",
    title: "Understanding Your Blood Pressure Readings",
    date: "Oct 24, 2023",
    readTime: "5 min read",
    excerpt:
      "Learn what the numbers mean and how to maintain a healthy range through diet and lifestyle.",
    coverImage: cardioImage,
    author: { name: "Dr. Sarah Jenkins", role: "Cardiologist", avatarLabel: "SJ" },
    sections: [
      {
        title: "What the Numbers Mean",
        body:
          "Blood pressure is written as systolic over diastolic. The first number measures pressure during a heartbeat, the second measures pressure between beats. Understanding both helps you spot trends early.",
      },
    ],
    quote:
      "Small changes in daily habits can lead to big improvements in blood pressure over time.",
    gallery: [cardioImage, matImage],
    topics: ["#HeartHealth", "#BP", "#Monitoring"],
  },
  {
    slug: "essential-first-aid-items",
    tag: "Preparedness",
    title: "Essential First Aid Items for Every Home",
    date: "Oct 20, 2023",
    readTime: "3 min read",
    excerpt:
      "A comprehensive checklist of what you need to keep your family safe in case of minor emergencies.",
    coverImage: drugsImage,
    author: { name: "Elena Morris", role: "Emergency Nurse", avatarLabel: "EM" },
    sections: [
      {
        title: "Build the Basics",
        body:
          "Start with essentials: bandages, antiseptic wipes, sterile gauze, and adhesive tape. Add gloves, tweezers, and a digital thermometer to cover the most common needs.",
      },
    ],
    quote:
      "A prepared home isn’t about fear—it’s about confidence and care.",
    gallery: [drugsImage, foodImage],
    topics: ["#Preparedness", "#FirstAid", "#FamilySafety"],
  },
];

export const getBlogBySlug = (slug: string) =>
  blogs.find((post) => post.slug === slug);
