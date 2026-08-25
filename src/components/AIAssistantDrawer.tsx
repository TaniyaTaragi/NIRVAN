import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, User, HelpCircle } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackCode: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  'What is the total prize pool and how are awards split?',
  'Can I participate if I do not have a team yet?',
  'What are the submission rules and GitHub requirements?',
  'Are travel and food provided on campus?',
];

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Namaste & Welcome to NIRVAN 2026 AI Assistant! Ask me anything about registration, tracks, eligibility, rules, or schedule.',
      timestamp: 'NOW',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = text.toLowerCase();

      if (q.includes('prize') || q.includes('pool') || q.includes('money') || q.includes('award')) {
        reply = '🏆 NIRVAN 2026 features a total prize pool exceeding ₹5,00,000+ ($10,000+) across Track Winners, Overall Champions, Best Beginner Hack, and sponsor bounties from Google Cloud, Polygon, and Intel.';
      } else if (q.includes('team') || q.includes('solo') || q.includes('matchmak')) {
        reply = '👥 Teams must consist of 2 to 4 members. If you are registering solo, you can join the NIRVAN Discord Matchmaking Lounge where our automated team builder will pair you with developers and designers.';
      } else if (q.includes('fee') || q.includes('cost') || q.includes('free') || q.includes('price')) {
        reply = '✅ Participation in NIRVAN is 100% FREE (₹0). Shortlisted participants also receive complimentary cloud credits, meals, snacks, red bull, and exclusive swag kits.';
      } else if (q.includes('rule') || q.includes('github') || q.includes('submit')) {
        reply = '📜 All code must be authored during the 48-hour sprint. Repositories must be public on GitHub with clear README documentation and a working demo link.';
      } else if (q.includes('track') || q.includes('web3') || q.includes('ai') || q.includes('robot')) {
        reply = '🪐 We have 12 exciting tracks including Web3 Protocols, Generative AI Agents, Autonomous Robotics, Cyber Defense, FinTech, and Spatial Computing. Check the 360° orbital gallery or Newspaper broadsheet view for detailed prompts!';
      } else {
        reply = `NIRVAN 2026 is scheduled for October 2026. All tracks are open for free registration. You can explore the 12 tracks on the Newspaper page or submit your squad right now!`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#09090b] border-l border-white/20 h-full flex flex-col justify-between shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-black">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">NIRVAN AI ASSISTANT</h3>
                  <span className="text-[10px] font-mono-code text-zinc-400">ACTIVE TELEMETRY &bull; 24/7</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Message List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-zinc-800 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div
                    className={`p-4 max-w-[80%] rounded-lg text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-zinc-800 text-white font-mono-code'
                        : 'bg-[#121214] border border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="text-[9px] font-mono-code text-zinc-500 mt-2 text-right">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-500 pl-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce delay-200" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="p-4 border-t border-zinc-800 bg-[#0c0c0e]">
              <div className="text-[10px] font-mono-code text-zinc-500 uppercase mb-2 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>FREQUENT QUESTIONS:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-mono-code px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 rounded text-left transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                onClick={() => onSelectTrack('ALL')}
                className="w-full mt-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-mono-code uppercase rounded transition-colors"
              >
                Explore All 12 Crucible Tracks ↗
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-zinc-800 bg-black flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about rules, tracks, prizes..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white font-mono-code"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-white text-black rounded hover:bg-zinc-200 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
