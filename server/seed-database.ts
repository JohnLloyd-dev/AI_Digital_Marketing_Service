import { contacts, newsletters, chatMessages, caseStudies, insertContactSchema, insertNewsletterSchema, insertChatMessageSchema, insertCaseStudySchema } from "@shared/schema";
import { db } from "./db";
import { caseStudies as caseStudiesData } from "../client/src/data/caseStudies";

async function seedDatabase() {
  console.log("Seeding database...");

  // Create sample contacts
  const sampleContacts = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      company: "ABC Company",
      message: "I'm interested in AI content generation services",
      newsletter: true
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
      company: "XYZ Inc",
      message: "Please provide more information about social media marketing",
      newsletter: false
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.j@example.com",
      phone: "+1567890123",
      company: "Johnson & Partners",
      message: "We need help with our SEO strategy",
      newsletter: true
    }
  ];

  console.log("Adding sample contacts...");
  for (const contact of sampleContacts) {
    const parsed = insertContactSchema.parse(contact);
    await db.insert(contacts).values(parsed).onConflictDoNothing();
  }

  // Create sample newsletter subscribers
  const sampleNewsletters = [
    { email: "subscriber1@example.com" },
    { email: "subscriber2@example.com" },
    { email: "subscriber3@example.com" },
    { email: "subscriber4@example.com" },
    { email: "subscriber5@example.com" }
  ];

  console.log("Adding sample newsletter subscribers...");
  for (const newsletter of sampleNewsletters) {
    const parsed = insertNewsletterSchema.parse(newsletter);
    await db.insert(newsletters).values(parsed).onConflictDoNothing();
  }

  // Create sample chat messages
  const sampleChatMessages = [
    {
      sessionId: "session-123",
      message: "Hello, I need help with AI marketing",
      isUser: true
    },
    {
      sessionId: "session-123",
      message: "Hi there! I'd be happy to help you with AI marketing. What specific aspect are you interested in?",
      isUser: false
    },
    {
      sessionId: "session-123",
      message: "I want to improve my social media engagement",
      isUser: true
    },
    {
      sessionId: "session-123",
      message: "Great! Our AI-powered social media tools can help analyze your audience, optimize posting schedules, and generate engaging content tailored to your brand voice.",
      isUser: false
    }
  ];

  console.log("Adding sample chat messages...");
  for (const chatMessage of sampleChatMessages) {
    const parsed = insertChatMessageSchema.parse(chatMessage);
    await db.insert(chatMessages).values(parsed).onConflictDoNothing();
  }
  
  // Add case studies from client data
  console.log("Adding case studies...");
  for (const caseStudy of caseStudiesData) {
    try {
      const parsed = insertCaseStudySchema.parse(caseStudy);
      await db.insert(caseStudies).values(parsed).onConflictDoNothing();
      console.log(`Added case study: ${caseStudy.title}`);
    } catch (error) {
      console.error(`Error adding case study ${caseStudy.title}:`, error);
    }
  }

  console.log("Database seeding completed!");
}

seedDatabase().catch(console.error);