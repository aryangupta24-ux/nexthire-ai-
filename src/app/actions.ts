import { GoogleGenAI } from "@google/genai";

export async function enhanceTextWithAI(text: string, type: string) {
  // Check if API key exists, otherwise mock
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("NEXT_PUBLIC_GEMINI_API_KEY not found. Returning mock data.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    if (type === "summary") {
      return "Experienced professional with a proven track record of delivering high-quality solutions. " + text;
    }
    return text.split('\n').filter(line => line.trim()).map(line => `- Enhanced: ${line}`).join('\n');
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    
    let prompt = "";
    if (type === "summary") {
      prompt = `Rewrite the following professional summary to be more impactful, ATS-friendly, and concise. Do not use bullet points.\n\nText: ${text}`;
    } else if (type === "experience" || type === "project") {
      prompt = `Rewrite the following description into professional, action-oriented bullet points suitable for an ATS-friendly resume. Use strong action verbs. Return ONLY the bullet points, starting each with a hyphen.\n\nText: ${text}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("AI Enhancement failed:", error);
    throw new Error("Failed to enhance text.");
  }
}

export async function chatWithCoach(message: string, history: { role: 'user' | 'model', content: string }[] = []) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "I am your AI Coach! However, my API key is not configured, so I can only send this mock response right now. Please add your NEXT_PUBLIC_GEMINI_API_KEY to the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    
    // Format history for Gemini
    const contents: any[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Add the current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Add a system prompt conceptually as the first message or let Gemini know its persona
    const systemPrompt = "You are a professional AI Career Coach and Interview Trainer for NextHire AI. Your goal is to help candidates improve their resumes, prepare for interviews, and land their dream jobs. Keep your answers concise, actionable, and encouraging.";
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: 'user', parts: [{ text: `System Instruction: ${systemPrompt}` }] },
        { role: 'model', parts: [{ text: "Understood. I am ready to coach." }] },
        ...contents
      ],
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Coach failed:", error);
    throw new Error("Failed to communicate with AI Coach.");
  }
}
