import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  ListTodo,
  Clock3,
  Target,
} from "lucide-react";
import { sendAIMessage } from "../../api/ai.api";
import { useTodos } from "../../hooks/useTodos";

export default function AIAssistant() {
  const { todos } = useTodos();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your TaskFlow AI Assistant. I can help you organize tasks, set priorities, and improve your productivity.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    {
      label: "Prioritize my tasks",
      icon: Target,
      prompt: "Which of my tasks should I prioritize?",
    },
    {
      label: "What's due today?",
      icon: Clock3,
      prompt: "What tasks should I focus on today?",
    },
    {
      label: "Help organize",
      icon: ListTodo,
      prompt: "Help me organize my tasks efficiently.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await sendAIMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            result?.message ||
            "I couldn't generate a response right now. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error?.response?.data?.message ||
            "Sorry, I couldn't process your request right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    if (loading) return;
    setMessage(prompt);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200">
              <Bot size={21} strokeWidth={2.2} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-950">
                  TaskFlow AI
                </h2>

                <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-600">
                  <Sparkles size={10} />
                  AI
                </span>
              </div>

              <p className="mt-0.5 text-xs text-slate-400">
                Your personal productivity assistant
              </p>
            </div>
          </div>

          <div className="hidden rounded-xl bg-white/80 px-3 py-2 text-right shadow-sm sm:block">
            <p className="text-lg font-bold text-slate-900">
              {todos?.length || 0}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Tasks
            </p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="p-5">
        <div className="mb-4 h-72 space-y-4 overflow-y-auto rounded-2xl bg-slate-50 p-4">
          {messages.map((item, index) => {
            const isUser = item.role === "user";

            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                    <Bot size={14} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? "rounded-br-md bg-slate-950 text-white"
                      : "rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {item.content}
                </div>

                {isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                    <User size={14} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading */}
          {loading && (
            <div className="flex items-end gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                <Bot size={14} />
              </div>

              <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompts */}
        <div className="mb-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Quick actions
          </p>

          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickPrompt(item.prompt)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your AI assistant..."
              disabled={loading}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-200 transition hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send message"
            >
              <Send size={17} strokeWidth={2.2} />
            </button>
          </div>
        </form>

        <p className="mt-3 text-center text-[10px] text-slate-400">
          AI suggestions are based on your current TaskFlow workspace.
        </p>
      </div>
    </div>
  );
}