import { 
  users, type User, type InsertUser,
  contacts, type Contact, type InsertContact,
  newsletters, type Newsletter, type InsertNewsletter,
  chatMessages, type ChatMessage, type InsertChatMessage 
} from "@shared/schema";

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
}

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
    const contact: Contact = { ...insertContact, id, createdAt };
    this.contacts.set(id, contact);
    return contact;
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
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}

export const storage = new MemStorage();
