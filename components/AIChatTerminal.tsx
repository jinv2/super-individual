import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, X, Minimize2, Maximize2, Loader2 } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Connection established. I am the digital echo of Shen Si Ting. How may I assist you in this timeline?', timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let fullResponse = '';
    const modelMsgId = Date.now() + 1;
    
    // Add placeholder for streaming
    setMessages(prev => [...prev, { role: 'model', text: '', timestamp: modelMsgId }]);

    await streamChatResponse(userMsg.text, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => prev.map(msg => 
        msg.timestamp === modelMsgId ? { ...msg, text: fullResponse } : msg
      ));
      scrollToBottom();
    });

    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-cyan-900/80 hover:bg-cyan-600 text-cyan-50 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-400/30 transition-all duration-300 hover:scale-110 group z-50 backdrop-blur-sm"
      >
        <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500 opacity-20"></div>
        <Terminal className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-cyan-400 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-cyan-900">
          Access Neural Link
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-[500px] bg-slate-950/95 border border-cyan-900/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-t-xl sm:rounded-xl overflow-hidden flex flex-col z-50 backdrop-blur-xl font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 bg-slate-900/80 border-b border-cyan-900/50">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span className="font-bold tracking-wider text-xs">TIANSUAN_LINK_V2.0</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 terminal-scroll bg-black/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded p-3 ${
              msg.role === 'user' 
                ? 'bg-cyan-900/30 text-cyan-50 border-l-2 border-cyan-500' 
                : 'text-green-400 font-mono'
            }`}>
              {msg.role === 'model' && <span className="text-xs text-green-700 block mb-1">{`> SYSTEM_RESPONSE`}</span>}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              {msg.role === 'model' && msg.text.length === 0 && <span className="animate-pulse">_</span>}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.text.length > 0 && (
           <div className="flex justify-start">
             <div className="text-green-500/50 text-xs animate-pulse pl-3">
               Computing...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900/50 border-t border-cyan-900/50 flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 font-mono">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input command..."
            className="w-full bg-black/50 text-cyan-50 pl-8 pr-4 py-2 rounded border border-cyan-900/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono placeholder:text-slate-600"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="p-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};

export default AIChatTerminal;
