const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
  constructor({ todoRepository }) {
    this.todoRepository = todoRepository;

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    this.model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });
  }

  async chat(userId, message) {
    if (!message || !message.trim()) {
      const error = new Error("Message is required");
      error.statusCode = 400;
      throw error;
    }

    const todos = await this.todoRepository.findByUserId(userId);

    const todoContext = todos.length
      ? todos
          .map(
            (todo, index) =>
              `${index + 1}. ${todo.title} - ${
                todo.completed ? "completed" : "pending"
              }`
          )
          .join("\n")
      : "No todos yet.";

    const prompt = `
You are TaskFlow AI Assistant.

Help the user manage and understand their personal todo list.

Rules:
- Be concise and practical.
- Only use the provided todo data when discussing the user's todos.
- Never invent todo items.
- You can suggest priorities, organization, and productivity tips.
- Do not claim that you created, updated, or deleted a todo.
- If the user asks to modify a todo, explain that they can do it through the TaskFlow interface.

User's current todos:
${todoContext}

User message:
${message}
`;

    const result = await this.model.generateContent(prompt);

    return {
      message: result.response.text(),
    };
  }
}

module.exports = AIService;
