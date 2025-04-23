import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertChatMessageSchema, insertCaseStudySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from 'zod-validation-error';
import { WebSocketServer } from 'ws';

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Setup WebSocket server with a specific path to avoid conflicts with Vite's HMR
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Validate the chat message
        const validatedMessage = insertChatMessageSchema.parse(data);
        
        // Store the message
        const savedMessage = await storage.createChatMessage(validatedMessage);
        
        // If it's a user message, generate an AI response
        if (validatedMessage.isUser) {
          const aiResponse = generateAiResponse(validatedMessage.message);
          
          // Store the AI response
          const aiMessage = await storage.createChatMessage({
            sessionId: validatedMessage.sessionId,
            message: aiResponse,
            isUser: false
          });
          
          // Send the AI response back
          ws.send(JSON.stringify(aiMessage));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        if (error instanceof ZodError) {
          ws.send(JSON.stringify({ error: fromZodError(error).message }));
        } else {
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      }
    });
    
    // Send welcome message
    ws.send(JSON.stringify({
      id: 0,
      sessionId: "system",
      message: "Hi there! 👋 I'm your AI marketing assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }));
  });
  
  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  // Contact form submission
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      console.error('Contact submission error:', error);
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: fromZodError(error).message });
      } else {
        res.status(500).json({ success: false, error: 'Server error' });
      }
    }
  });
  
  // Newsletter subscription
  app.post('/api/newsletter', async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeToNewsletter(validatedData);
      res.status(201).json({ success: true, data: newsletter });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: fromZodError(error).message });
      } else {
        res.status(500).json({ success: false, error: 'Server error' });
      }
    }
  });
  
  // Get chat history
  app.get('/api/chat/:sessionId', async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessagesBySession(sessionId);
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error('Chat history retrieval error:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
  
  // Get all case studies
  app.get('/api/case-studies', async (req: Request, res: Response) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json({ success: true, data: caseStudies });
    } catch (error) {
      console.error('Case studies retrieval error:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
  
  // Get a specific case study by ID
  app.get('/api/case-studies/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }
      
      const caseStudy = await storage.getCaseStudyById(id);
      if (!caseStudy) {
        return res.status(404).json({ success: false, error: 'Case study not found' });
      }
      
      res.json({ success: true, data: caseStudy });
    } catch (error) {
      console.error('Case study retrieval error:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
  
  // Create a case study
  app.post('/api/case-studies', async (req: Request, res: Response) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const caseStudy = await storage.createCaseStudy(validatedData);
      res.status(201).json({ success: true, data: caseStudy });
    } catch (error) {
      console.error('Case study creation error:', error);
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: fromZodError(error).message });
      } else {
        res.status(500).json({ success: false, error: 'Server error' });
      }
    }
  });

  return httpServer;
}

// Simple AI response generator (in a real app, this would be connected to an AI service)
function generateAiResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return "Our pricing plans start at $899/month for the Starter package. For more detailed pricing information, please check our pricing section or I can explain our different plans in detail. Would you like to know more about a specific plan?";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('talk') || lowerMessage.includes('representative')) {
    return "I'd be happy to connect you with one of our marketing specialists. Could you please provide your name, email, and a brief description of what you're looking for? Alternatively, you can fill out our contact form and someone will get back to you within 24 hours.";
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    return "We offer a range of AI-powered marketing services including SEO optimization, social media management, predictive PPC campaigns, email marketing, chatbot integration, and analytics. Is there a specific service you'd like to learn more about?";
  }
  
  if (lowerMessage.includes('how') && (lowerMessage.includes('work') || lowerMessage.includes('process'))) {
    return "Our process involves four key steps: 1) Data collection and analysis, 2) AI strategy development, 3) Implementation and automation, and 4) Continuous learning and optimization. Would you like me to explain any of these steps in more detail?";
  }
  
  return "That's a great question! I'd be happy to help with that. Could you provide a bit more information so I can give you the most relevant answer? Alternatively, you can speak directly with one of our marketing specialists who can provide personalized assistance.";
}
