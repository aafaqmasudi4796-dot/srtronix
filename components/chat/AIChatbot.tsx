'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  ExternalLink,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  'Tell me about the Smart Work Bench Station',
  'Which oscilloscope is best for field work?',
  'What are the specs of MPS-200 DC Supply?',
  'How do I request a custom quotation?',
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          role: 'assistant',
          content: `👋 **Welcome to SRTRONIX Instruments!**

I am your **AI Technical Sales & Instrumentation Assistant**. I can help you with:
• Instrument specifications & comparisons
• Custom **Smart Work Bench Station** configurations
• Official RFQ quotations & institutional inquiries
• Warranty, delivery & service support

Select a prompt below or type your technical question!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setHasOpenedBefore(true);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Dismiss tooltip after 8s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      const aiReply = data.reply || 'Thank you for your question. Our engineering desk is available to assist you directly.';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: `I encountered a momentary connection issue. You can reach our technical engineering team directly via [WhatsApp (+91 70224 29004)](https://wa.me/917022429004) or submit an [Official Inquiry](/contact#inquire).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Chat history cleared. How can I assist you with **SRTRONIX** instruments today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to format basic markdown links, bold text, and lists
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Header
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-white text-sm pt-1 border-b border-white/10 pb-1">
                {line.replace('### ', '')}
              </h4>
            );
          }

          // Bullet points
          const isBullet = line.startsWith('• ') || line.startsWith('- ');
          const lineText = isBullet ? line.substring(2) : line;

          // Parse markdown bold and links [text](url)
          const parts = [];
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          let lastIndex = 0;
          let match;

          while ((match = linkRegex.exec(lineText)) !== null) {
            if (match.index > lastIndex) {
              parts.push(lineText.substring(lastIndex, match.index));
            }

            const linkLabel = match[1];
            const linkHref = match[2];
            const isExternal = linkHref.startsWith('http');

            parts.push(
              isExternal ? (
                <a
                  key={match.index}
                  href={linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#7bb0ed] hover:text-white underline decoration-[#4A7EB8] hover:decoration-white transition-colors inline-flex items-center gap-0.5"
                >
                  <span>{linkLabel}</span>
                  <ExternalLink className="w-2.5 h-2.5 inline" />
                </a>
              ) : (
                <Link
                  key={match.index}
                  href={linkHref}
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-[#7bb0ed] hover:text-white underline decoration-[#4A7EB8] hover:decoration-white transition-colors"
                >
                  {linkLabel}
                </Link>
              )
            );

            lastIndex = linkRegex.lastIndex;
          }

          if (lastIndex < lineText.length) {
            parts.push(lineText.substring(lastIndex));
          }

          // Render bold within plain text parts
          const renderedParts = parts.map((part, pIdx) => {
            if (typeof part !== 'string') return part;

            const boldParts = part.split(/\*\*([^*]+)\*\*/g);
            return boldParts.map((bPart, bIdx) =>
              bIdx % 2 === 1 ? (
                <strong key={`${pIdx}-${bIdx}`} className="text-white font-semibold">
                  {bPart}
                </strong>
              ) : (
                bPart
              )
            );
          });

          return (
            <p key={idx} className={isBullet ? 'flex items-start gap-2 pl-1' : ''}>
              {isBullet && <span className="text-[#7bb0ed] font-bold select-none">•</span>}
              <span className="flex-1">{renderedParts}</span>
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* FLOATING ACTION LAUNCHER (Lower Right) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        {/* Teaser Tooltip Bubble */}
        <AnimatePresence>
          {!isOpen && showTooltip && !hasOpenedBefore && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-3 mr-1 bg-gradient-to-r from-slate-900 to-[#0f2a4a] text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl border border-[#4A7EB8]/50 backdrop-blur-md flex items-center gap-2 cursor-pointer max-w-[240px]"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-2 h-2 rounded-full bg-[#7bb0ed] animate-ping shrink-0" />
              <span>Ask SRTRONIX AI about instruments &amp; benches</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-white p-0.5 ml-1"
                aria-label="Dismiss tooltip"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Launch Toggle Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#4A7EB8] via-[#2563eb] to-[#0f2a4a] text-white shadow-2xl shadow-blue-950/70 border-2 border-[#7bb0ed]/60 hover:border-white transition-all cursor-pointer"
        >
          {/* Subtle Outer Radar Ping */}
          <span className="absolute -inset-1 rounded-full bg-[#4A7EB8]/30 blur-xs animate-pulse pointer-events-none" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* CHAT WINDOW (Sliding Drawer / Floating Pane) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[415px] h-[580px] max-h-[82dvh] flex flex-col rounded-2xl overflow-hidden border border-[#4A7EB8]/40 bg-[#090e17]/95 backdrop-blur-2xl shadow-2xl shadow-black/90 text-slate-200"
          >
            {/* CHAT HEADER */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-[#0f2a4a] via-[#16385e] to-[#0f2a4a] border-b border-[#4A7EB8]/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#4A7EB8] to-[#2563eb] border border-white/20 shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-wide">SRTRONIX AI</h3>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-semibold">
                      v2.0
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Technical Support Desk</span>
                  </p>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-1 text-slate-300">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MESSAGE CONTAINER */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700">
              {messages.map((m) => {
                const isUser = m.role === 'user';

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-[#0f2a4a] border border-[#4A7EB8]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-[#7bb0ed]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                        isUser
                          ? 'bg-gradient-to-r from-[#2563eb] to-[#4A7EB8] text-white rounded-br-xs'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-xs'
                      }`}
                    >
                      {renderFormattedContent(m.content)}
                      <div
                        className={`text-[10px] mt-1 text-right select-none ${
                          isUser ? 'text-blue-100/70' : 'text-slate-500'
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>

                    {isUser && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing / Thinking Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-slate-400 pl-8 text-xs"
                >
                  <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7bb0ed] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7bb0ed] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7bb0ed] animate-bounce" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Consulting engineering database...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* SUGGESTION CHIPS (Show on initial state) */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40 flex flex-wrap gap-1.5">
                {INITIAL_SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(s)}
                    className="text-[11px] text-slate-300 hover:text-white bg-slate-900/90 hover:bg-[#0f2a4a] border border-slate-800 hover:border-[#4A7EB8]/60 px-2.5 py-1 rounded-full transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT COMPOSER */}
            <div className="p-3 bg-slate-950 border-t border-slate-800/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about scopes, benches, quotes..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-[#4A7EB8] focus:outline-none focus:ring-1 focus:ring-[#4A7EB8] transition-all disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#4A7EB8] hover:bg-[#3b6ea4] text-white disabled:opacity-40 disabled:hover:bg-[#4A7EB8] transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Direct WhatsApp Human Fallback */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1">
                <span>Direct factory support in India</span>
                <a
                  href="https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20am%20chatting%20with%20your%20website%20assistant%20and%20would%20like%20to%20connect%20with%20a%20sales%20engineer."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <WhatsAppIcon className="w-3 h-3 fill-current" />
                  <span>Talk to human</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatbot;
