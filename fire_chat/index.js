

/**
 * Firebase Cloud Function to handle Gemini API calls
 * This function securely processes chat messages and returns AI responses
 */

const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');



// CORS configuration
const cors = require('cors')({ origin: true });


// API Key Configuration:
// - Currently using functions.config() (works until March 2026)
// - Command: firebase functions:config:set gemini.api_key="YOUR_API_KEY"
// - After March 2026, migrate to environment variables (see MIGRATION_GUIDE.md)
// - Alternative: Use secrets on Blaze plan (requires upgrade)

// System prompt - AI speaks as Jwalith in first person
const SYSTEM_PROMPT = `You are Jwalith Kristam. You are speaking directly to visitors of your portfolio website. 
Always speak in first person (use "I", "my", "me") as if you are Jwalith himself.

About yourself (Jwalith):
- Full Name: Shanmukha Jwalith Kristam
- Education: I have a Masters in Data Science from SUNY Stony Brook University (Graduated)
- Experience: I have 3+ years of professional experience
- Expertise: Machine Learning, Data Science, Large Language Models (LLMs), Generative AI
- My Skills: 
  * Generative AI & Agentic: LangChain, LangGraph, AutoGen, CrewAI, LlamaIndex, RAG, Vector DBs
  * Machine Learning & Data Science: Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Matplotlib, Seaborn
  * Programming: Python, R, SQL, JavaScript, Java, C++
  * Cloud & MLOps: AWS, Docker, Kubernetes, MLflow, Weights & Biases
  * LLM APIs: OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Ollama
  * Distributed Systems: Spark, Kafka, Redis, MongoDB

My Projects:
- Gen AI & ML projects (check my portfolio for details)
- Data Science & Analytics projects including:
  * YouTube Comment Analytics
  * R Programming projects
  * COTA Race Story Analytics
  * Podcast Predictor
  * London Bike Dashboard
  * Sentiment Analysis

Resume:
- My resume is available for download on my portfolio website
- Direct link: jk_applies.pdf (or visitors can find it in the contact/resume section of the website)
- When asked about my resume, let them know they can download it from my portfolio

Your role:
- Answer questions about your skills, experience, education, and projects in first person
- Be friendly, professional, and concise
- If asked about your resume, tell them they can download it from your portfolio website (jk_applies.pdf) or find it in the contact/resume section
- If asked about something you don't know, politely say you don't have that information
- Always maintain a professional but personable tone
- Encourage visitors to check out your portfolio projects
- Keep responses under 200 words unless specifically asked for more detail
- Always use "I", "my", "me" - never refer to yourself in third person

Remember: You ARE Jwalith. Speak as yourself, not about yourself. Be helpful and accurate.`;



// Define the function
// Note: This works on Spark (free) plan using config
// For Blaze plan, you can use secrets instead (see alternative code below)
exports.chatWithGemini = functions
    .https.onRequest(async (req, res) => {
    // Handle CORS preflight (OPTIONS request)
    if (req.method === 'OPTIONS') {
        return cors(req, res, () => {
            res.status(204).send('');
        });
    }
    
    // Handle CORS for actual requests
    return cors(req, res, async () => {
        // Only allow POST requests
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        try {
            const { message, conversationHistory = [] } = req.body;

            // Validate input
            if (!message || typeof message !== 'string' || message.trim().length === 0) {
                return res.status(400).json({ error: 'Message is required' });
            }

            // Get API key from config (works on Spark/free tier until March 2026)
            // Falls back to environment variable for future migration
            // Priority: config > environment variable
            // const apiKey = functions.config().gemini?.api_key || process.env.GEMINI_API_KEY;
            const apiKey = process.env.GEMINI_API_KEY;
            
            if (!apiKey) {
                return res.status(500).json({ 
                    error: 'API key not configured. Please set using: firebase functions:config:set gemini.api_key="YOUR_KEY"' 
                });
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            
            // Get the Gemini model (using gemini-1.5-flash for faster responses)
            // You can change to 'gemini-1.5-pro' for more advanced capabilities
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite'});

            // Build conversation context
            let conversationContext = SYSTEM_PROMPT + '\n\n';
            
            // Add conversation history if available
            if (conversationHistory.length > 0) {
                conversationContext += 'Previous conversation:\n';
                conversationHistory.slice(-5).forEach(msg => {
                    conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
                });
                conversationContext += '\n';
            }

            conversationContext += `User: ${message}\nAssistant:`;

            // Generate response
            const result = await model.generateContent(conversationContext);
            const response = await result.response;
            const reply = response.text();

            // Return the response
            return res.status(200).json({
                reply: reply.trim(),
                success: true
            });

        } catch (error) {
            console.error('Error calling Gemini API:', error);
            
            // Handle specific error types
            if (error.message?.includes('API_KEY')) {
                return res.status(500).json({ 
                    error: 'API configuration error. Please check your Gemini API key.' 
                });
            }
            
            if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
                return res.status(429).json({ 
                    error: 'Rate limit exceeded. Please try again later.' 
                });
            }

            return res.status(500).json({ 
                error: 'An error occurred while processing your request. Please try again.' 
            });
        }
    });
});
