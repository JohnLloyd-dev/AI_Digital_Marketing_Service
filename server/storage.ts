import { 
  users, type User, type InsertUser,
  contacts, type Contact, type InsertContact,
  newsletters, type Newsletter, type InsertNewsletter,
<<<<<<< HEAD
  chatMessages, type ChatMessage, type InsertChatMessage,
  caseStudies, type CaseStudy, type InsertCaseStudy
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, desc } from "drizzle-orm";
import postgres from "postgres";
=======
  chatMessages, type ChatMessage, type InsertChatMessage 
} from "@shared/schema";
>>>>>>> cedbdcf0d4ed2d86ab91e4363435dc208190567a

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Newsletter methods
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  
  // Chat methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]>;
<<<<<<< HEAD
  
  // Case Study methods
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyById(id: number): Promise<CaseStudy | undefined>;
}

export class PostgresStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    const client = postgres(process.env.DATABASE_URL, { 
      max: 10,
      ssl: true,
      idle_timeout: 20
    });
    
    this.db = drizzle(client);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contacts).values(insertContact).returning();
    return result[0];
  }
  
  async getContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }
  
  // Newsletter methods
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingResult = await this.db
      .select()
      .from(newsletters)
      .where(eq(newsletters.email, insertNewsletter.email))
      .limit(1);
    
    if (existingResult.length > 0) {
      return existingResult[0];
    }
    
    const result = await this.db.insert(newsletters).values(insertNewsletter).returning();
    return result[0];
  }
  
  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await this.db.select().from(newsletters).orderBy(desc(newsletters.createdAt));
  }
  
  // Chat methods
  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const result = await this.db.insert(chatMessages).values(insertChatMessage).returning();
    return result[0];
  }
  
  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return await this.db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.timestamp);
  }
  
  // Case Study methods
  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const result = await this.db.insert(caseStudies).values(insertCaseStudy).returning();
    return result[0];
  }
  
  async getCaseStudies(): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
  }
  
  async getCaseStudyById(id: number): Promise<CaseStudy | undefined> {
    const result = await this.db.select().from(caseStudies).where(eq(caseStudies.id, id)).limit(1);
    return result[0];
  }
}

// Memory storage for backward compatibility and testing
=======
}

>>>>>>> cedbdcf0d4ed2d86ab91e4363435dc208190567a
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private chatMessages: Map<number, ChatMessage>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private newsletterCurrentId: number;
  private chatMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.chatMessages = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
    this.chatMessageCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
<<<<<<< HEAD
    
    // Ensure all required fields are properly set
    const contactData = {
      ...insertContact,
      id,
      createdAt,
      phone: insertContact.phone || null,
      company: insertContact.company || null,
      newsletter: insertContact.newsletter ?? false
    };
    
    this.contacts.set(id, contactData as Contact);
    return contactData as Contact;
=======
    const contact: Contact = { ...insertContact, id, createdAt };
    this.contacts.set(id, contact);
    return contact;
>>>>>>> cedbdcf0d4ed2d86ab91e4363435dc208190567a
  }
  
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  // Newsletter methods
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === insertNewsletter.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.newsletterCurrentId++;
    const createdAt = new Date();
    const newsletter: Newsletter = { ...insertNewsletter, id, createdAt };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
  
  // Chat methods
  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageCurrentId++;
    const timestamp = new Date();
    const chatMessage: ChatMessage = { ...insertChatMessage, id, timestamp };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
<<<<<<< HEAD
      .sort((a, b) => {
        const aTime = a.timestamp ? a.timestamp.getTime() : 0;
        const bTime = b.timestamp ? b.timestamp.getTime() : 0;
        return aTime - bTime;
      });
  }
  
  // Case study methods (not implemented for memory storage, using default empty responses)
  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    throw new Error("Case study operations not supported in memory storage");
  }
  
  async getCaseStudies(): Promise<CaseStudy[]> {
    return [];
  }
  
  async getCaseStudyById(id: number): Promise<CaseStudy | undefined> {
    return undefined;
  }
}

export const storage = new PostgresStorage();
=======
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}

export const storage = new MemStorage();
>>>>>>> cedbdcf0d4ed2d86ab91e4363435dc208190567a
