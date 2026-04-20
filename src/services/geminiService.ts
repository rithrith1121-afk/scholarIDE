import { GoogleGenAI, Type } from '@google/genai';
import { Problem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const problemSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'The title of the problem.' },
    difficulty: { type: Type.STRING, description: 'Must be "Easy", "Intermediate", or "Hard".' },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Tags for the problem like "Array", "Dynamic Programming", etc.',
    },
    descriptionHtml: {
      type: Type.STRING,
      description: 'The main problem description formatted with basic HTML tags like <p>, <strong>, and <code> where appropriate.',
    },
    examples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          input: { type: Type.STRING, description: 'The input value(s) for the example.' },
          output: { type: Type.STRING, description: 'The expected output for the example.' },
          explanation: { type: Type.STRING, nullable: true, description: 'Explanation for the output, if any.' },
        },
        required: ['input', 'output'],
      },
    },
    constraints: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of constraints for the inputs. Plain text.',
    },
    snippets: {
      type: Type.OBJECT,
      properties: {
        python: { type: Type.STRING, description: 'A short syntax snippet in Python solving parts of the problem.' },
        java: { type: Type.STRING, description: 'A short syntax snippet in Java.' },
        cpp: { type: Type.STRING, description: 'A short syntax snippet in C++.' },
      },
      required: ['python', 'java', 'cpp'],
    },
    starterCode: {
      type: Type.OBJECT,
      properties: {
        python: { type: Type.STRING, description: 'Initial class/function setup for Python.' },
        java: { type: Type.STRING, description: 'Initial class/function setup for Java.' },
        cpp: { type: Type.STRING, description: 'Initial class/function setup for C++.' },
      },
      required: ['python', 'java', 'cpp'],
    },
  },
  required: [
    'title',
    'difficulty',
    'tags',
    'descriptionHtml',
    'examples',
    'constraints',
    'snippets',
    'starterCode',
  ],
};

export async function generateProblem(difficulty: 'Easy' | 'Intermediate' | 'Hard'): Promise<Problem> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `Generate a new, unique data structure or algorithmic coding problem at the "${difficulty}" difficulty level. Ensure the difficulty matches standard software engineering interview levels. Be creative, don't just use standard problems unless requested. Provide a concise, clear problem description, 2-3 examples with explanations, and accurate constraints.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: problemSchema,
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error('Failed to generate problem content.');
  }

  const data = JSON.parse(text) as Problem;
  return data;
}

export async function generateNotes(problem: Problem): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `Generate comprehensive yet concise learning notes for a student solving the coding problem below. Format using clean HTML (use tags like <h3>, <ul>, <li>, <p>, <strong>, <code>. Do not wrap in a markdown code block).
    
    Problem Title: ${problem.title}
    Difficulty: ${problem.difficulty}
    Tags: ${problem.tags.join(', ')}
    
    Description:
    ${problem.descriptionHtml}
    `,
  });

  return response.text?.trim()?.replace(/^```html\s*([\s\S]*)\s*```$/, '$1') || '<p>No notes generated.</p>';
}

export async function generateHelp(problem: Problem, userCode: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `You are an expert coding mentor. Provide a detailed algorithm explanation and hints for the following problem. 
    Review the user's current code to find potential issues or guide them.
    Format your response using clean HTML. Use tags like <h3>, <ul>, <li>, <p>, <strong>, <code>. Do not wrap in a markdown code block.
    
    Problem Title: ${problem.title}
    
    User's Current Code:
    \`\`\`
    ${userCode}
    \`\`\`
    `,
  });

  return response.text?.trim()?.replace(/^```html\s*([\s\S]*)\s*```$/, '$1') || '<p>No help generated.</p>';
}
