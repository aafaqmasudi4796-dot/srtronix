'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
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
  Calculator,
  FileText,
  PhoneCall,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  Info,
  GripVertical,
  RotateCcw,
  Move,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

type ActiveTab = 'chat' | 'quotation' | 'enquiry';

// Approved product catalog pricing list for the instant quotation builder
const APPROVED_PRODUCTS = [
  { id: 'electronic-smart-work-station', name: 'Smart Work Bench Station (5-in-1 Flagship)', price: 145000, category: 'Smart Workbench' },
  { id: 'bench-oscilloscope-sds1102', name: 'Bench Oscilloscope SDS1102 (100MHz, 2-CH, 1GS/s)', price: 24900, category: 'Oscilloscopes' },
  { id: 'handheld-oscilloscope-hds272s', name: 'Handheld Oscilloscope HDS272S (70MHz + DMM + Battery)', price: 28500, category: 'Oscilloscopes' },
  { id: 'tablet-oscilloscope-tao3000', name: 'Tablet Oscilloscope TAO3000 (100MHz, 4-CH, Touch)', price: 68000, category: 'Oscilloscopes' },
  { id: 'dc-power-supply-mps-200', name: 'DC Power Supply MPS-200 (30V/6A, Linear Low-Ripple)', price: 18500, category: 'DC Power Supplies' },
  { id: '3-in-1-power-supply-spm3103', name: '3-in-1 Power Supply SPM3103 (30V/10A/300W + 4.5D DMM)', price: 32000, category: 'DC Power Supplies' },
  { id: 'owon-lcr2000-series-lcr-meter', name: 'OWON LCR2000 LCR Meter (0.05% Accuracy, Handler)', price: 54000, category: 'LCR Meters' },
  { id: 'waveform-generator-ag4151', name: 'Waveform Generator AG4151 (150MHz DDS, 400MS/s)', price: 42500, category: 'Waveform Generators' },
  { id: 'clamp-multimeter-cm2100b', name: 'Clamp Multimeter CM2100B (0.1A–100A AC/DC True RMS)', price: 9800, category: 'Multimeters' },
  { id: 'owon-oel85-series-dc-electronic-load', name: 'OWON OEL85 DC Electronic Load (5kHz Dynamic)', price: 48000, category: 'Electronic Loads' },
  { id: 'owon-owh9800-series-power-meter', name: 'OWON OWH9800 Digital Power Meter (63rd Harmonics)', price: 62000, category: 'Power Meters' },
];

const INITIAL_SUGGESTIONS = [
  '🎯 Recommend an instrument for my lab',
  '💰 Generate an instant proforma quotation',
  '🔍 Explain oscilloscope bandwidth vs sample rate',
  '⚡ Tell me about Smart Work Bench Station',
  '📝 Submit an institutional RFQ enquiry',
  '💬 Connect with sales on WhatsApp',
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Instant Quotation Builder State
  const [selectedProduct, setSelectedProduct] = useState(APPROVED_PRODUCTS[0].id);
  const [quoteQty, setQuoteQty] = useState(1);
  const [quoteItems, setQuoteItems] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([
    { id: APPROVED_PRODUCTS[1].id, name: APPROVED_PRODUCTS[1].name, price: APPROVED_PRODUCTS[1].price, qty: 2 },
    { id: APPROVED_PRODUCTS[4].id, name: APPROVED_PRODUCTS[4].name, price: APPROVED_PRODUCTS[4].price, qty: 1 },
  ]);
  const [quoteCopied, setQuoteCopied] = useState(false);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    product: 'General Instrument Requirement',
    message: '',
  });
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquirySuccessRef, setEnquirySuccessRef] = useState<string | null>(null);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragBoundaryRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [dragResetKey, setDragResetKey] = useState(0);

  const handleResetPosition = () => {
    setDragResetKey((k) => k + 1);
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          role: 'assistant',
          content: `👋 **Welcome to SRTRONIX Instruments 24/7 AI Sales & Engineering Desk!**

I am ready to assist you anytime:
• **Answer Customer Questions 24/7:** Instrument details, warranty, delivery & support
• **Recommend Instruments:** For academic universities, field repair, or R&D labs
• **Explain Product Specifications:** Bandwidth, sample rate, True RMS & low ripple
• **Generate Instant Quotations:** Based on approved catalog prices with 18% GST
• **Collect Enquiries:** Direct RFQ submissions for official sales callback
• **Connect to WhatsApp:** 1-click direct link to our Bengaluru engineering team

How can I help you today? Choose an option below or type your technical query!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, activeTab]);

  // Focus input when opened in chat tab
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setHasOpenedBefore(true);
      if (activeTab === 'chat') {
        setTimeout(() => inputRef.current?.focus(), 250);
      }
    }
  }, [isOpen, activeTab]);

  // Dismiss tooltip after 8s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    // Check if user clicked quick shortcut for quote or enquiry tabs
    if (text.includes('Generate an instant proforma quotation') || text.toLowerCase() === 'quotation' || text.toLowerCase() === 'quote') {
      setActiveTab('quotation');
      return;
    }
    if (text.includes('Submit an institutional RFQ enquiry') || text.toLowerCase() === 'enquiry') {
      setActiveTab('enquiry');
      return;
    }
    if (text.includes('Connect with sales on WhatsApp')) {
      window.open('https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20am%20chatting%20from%20your%20website%20and%20need%20assistance.', '_blank');
      return;
    }

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

  // Add Item to Quotation Calculator
  const handleAddQuoteItem = () => {
    const prod = APPROVED_PRODUCTS.find((p) => p.id === selectedProduct);
    if (!prod) return;

    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, qty: item.qty + quoteQty } : item
        );
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, qty: quoteQty }];
    });
  };

  // Remove Item from Quotation Calculator
  const handleRemoveQuoteItem = (id: string) => {
    setQuoteItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Quotation Calculations
  const quoteSubtotal = quoteItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalUnits = quoteItems.reduce((sum, item) => sum + item.qty, 0);
  const quoteDiscountPercent = totalUnits >= 10 ? 10 : totalUnits >= 3 ? 5 : 0;
  const quoteDiscountAmount = Math.round((quoteSubtotal * quoteDiscountPercent) / 100);
  const quoteTaxable = quoteSubtotal - quoteDiscountAmount;
  const quoteGst = Math.round(quoteTaxable * 0.18);
  const quoteTotal = quoteTaxable + quoteGst;
  const currentQuoteRef = `SRT-QT-${Date.now().toString().slice(-6)}`;

  // Copy Quotation to Clipboard
  const handleCopyQuote = () => {
    const textSummary = `SRTRONIX INSTRUMENTS - OFFICIAL QUOTATION (${currentQuoteRef})
Date: ${new Date().toLocaleDateString('en-IN')}
Validity: 30 Days

ITEMS:
${quoteItems.map((it, i) => `${i + 1}. ${it.name} | Unit: ₹${it.price.toLocaleString('en-IN')} | Qty: ${it.qty} | Amt: ₹${(it.price * it.qty).toLocaleString('en-IN')}`).join('\n')}

Subtotal (Ex-Factory): ₹${quoteSubtotal.toLocaleString('en-IN')}
${quoteDiscountPercent > 0 ? `Volume Discount (${quoteDiscountPercent}%): -₹${quoteDiscountAmount.toLocaleString('en-IN')}\nTaxable Amount: ₹${quoteTaxable.toLocaleString('en-IN')}\n` : ''}GST @ 18%: ₹${quoteGst.toLocaleString('en-IN')}
GRAND TOTAL: ₹${quoteTotal.toLocaleString('en-IN')} (INR)

Includes: Standard Manufacturer Warranty & NABL Traceable Calibration Report.
Contact: +91 70224 29004 | sales@srtronix.com`;

    navigator.clipboard.writeText(textSummary);
    setQuoteCopied(true);
    setTimeout(() => setQuoteCopied(false), 2500);
  };

  // WhatsApp link for quotation
  const quoteWhatsAppUrl = `https://wa.me/917022429004?text=${encodeURIComponent(
    `Hello SRTRONIX Sales Team,\nI have generated Quotation Reference: ${currentQuoteRef} on your website for ₹${quoteTotal.toLocaleString('en-IN')} (incl. 18% GST).\nPlease provide official proforma invoice and dispatch confirmation.`
  )}`;

  // Submit Enquiry
  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.fullName || !enquiryForm.phone || !enquiryForm.email || !enquiryForm.company) {
      setEnquiryError('Please fill in all required fields.');
      return;
    }

    setIsSubmittingEnquiry(true);
    setEnquiryError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: enquiryForm.fullName,
          company: enquiryForm.company,
          email: enquiryForm.email,
          phone: enquiryForm.phone,
          product: enquiryForm.product,
          inquiryType: 'Chatbot RFQ Lead',
          message: enquiryForm.message || 'Customer requested callback & quote via 24/7 AI Chatbot.',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setEnquirySuccessRef(data.reference || `SRT-${Date.now().toString(36).toUpperCase()}`);
    } catch (err: unknown) {
      setEnquiryError(err instanceof Error ? err.message : 'Submission failed. Please try again or message on WhatsApp.');
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  // Helper to format basic markdown, tables, links, bold text, and lists
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

          // Markdown Table row
          if (line.startsWith('|') && line.endsWith('|')) {
            const cells = line.split('|').filter((c) => c.trim().length > 0);
            if (line.includes('---')) return null; // Skip table header separator line

            return (
              <div key={idx} className="grid grid-cols-3 gap-1 bg-slate-950/60 p-1.5 rounded text-[11px] border border-white/5 font-mono">
                {cells.map((cell, cIdx) => (
                  <span key={cIdx} className={`${cIdx === 0 ? 'col-span-1 text-slate-300' : 'text-right text-slate-200 font-semibold'}`}>
                    {cell.trim()}
                  </span>
                ))}
              </div>
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
      {/* VIEWPORT BOUNDARY REFERENCE FOR DRAG CONSTRAINTS */}
      <div ref={dragBoundaryRef} className="fixed inset-3 sm:inset-5 pointer-events-none z-30" aria-hidden="true" />

      {/* FLOATING ACTION LAUNCHER (Movable Anywhere via Drag) */}
      <motion.div
        key={`launcher-${dragResetKey}`}
        drag
        dragConstraints={dragBoundaryRef}
        dragElastic={0.12}
        dragMomentum={false}
        whileDrag={{ scale: 1.08 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end cursor-grab active:cursor-grabbing select-none"
      >
        {/* Teaser Tooltip Bubble */}
        <AnimatePresence>
          {!isOpen && showTooltip && !hasOpenedBefore && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-3 mr-1 bg-gradient-to-r from-slate-900 via-[#0f2a4a] to-slate-900 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-2xl border border-[#4A7EB8]/50 backdrop-blur-md flex items-center gap-2 cursor-pointer max-w-[270px]"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-2 h-2 rounded-full bg-[#7bb0ed] animate-ping shrink-0" />
              <div className="flex-1">
                <span className="font-semibold block text-[11px] text-cyan-300">24/7 AI Technical Assistant</span>
                <span className="text-[10px] text-slate-300">Drag to move anywhere • Click to open</span>
              </div>
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
          {/* Drag Indicator Tooltip on Hover */}
          <div className="absolute -top-7 bg-slate-900/90 text-slate-300 text-[10px] px-2 py-0.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none whitespace-nowrap shadow-md">
            <Move className="w-2.5 h-2.5 text-[#7bb0ed]" />
            <span>Drag to move</span>
          </div>

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
      </motion.div>

      {/* CHAT WINDOW (Movable Floating Pane with Header Drag) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`window-${dragResetKey}`}
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={dragBoundaryRef}
            dragElastic={0.08}
            dragMomentum={false}
            whileDrag={{ scale: 1.01, boxShadow: '0 30px 60px -12px rgba(0,0,0,0.95), 0 0 25px rgba(74,126,184,0.4)' }}
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[610px] max-h-[85dvh] flex flex-col rounded-2xl overflow-hidden border border-[#4A7EB8]/40 bg-[#090e17]/95 backdrop-blur-2xl shadow-2xl shadow-black/90 text-slate-200"
          >
            {/* CHAT HEADER - DRAGGABLE BAR */}
            <div
              onPointerDown={(e) => {
                // Ignore drag if clicking on buttons or links
                if ((e.target as HTMLElement).closest('button, a, select, input, textarea')) return;
                dragControls.start(e);
              }}
              className="px-4 py-3 bg-gradient-to-r from-[#0f2a4a] via-[#16385e] to-[#0f2a4a] border-b border-[#4A7EB8]/40 flex items-center justify-between shrink-0 cursor-grab active:cursor-grabbing select-none"
              title="Click and drag anywhere on this header to reposition the window"
            >
              <div className="flex items-center gap-2.5">
                {/* Grip Handle */}
                <div className="flex items-center justify-center p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-grab" title="Drag to move window anywhere">
                  <GripVertical className="w-4 h-4 text-slate-400/80" />
                </div>

                <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#4A7EB8] to-[#2563eb] border border-white/20 shadow-md">
                  <Bot className="w-4.5 h-4.5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-wide">SRTRONIX AI</h3>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-semibold">
                      24/7 Active
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Movable Window • Drag header</span>
                  </p>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-1.5 text-slate-300">
                {/* Reset Position Button */}
                <button
                  type="button"
                  onClick={handleResetPosition}
                  title="Reset window position"
                  aria-label="Reset window position"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-slate-300"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/917022429004?text=Hello%20SRTRONIX%20Team,%20I%20am%20chatting%20from%20your%20website%20and%20would%20like%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect on WhatsApp"
                  className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>

                {activeTab === 'chat' && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    title="Clear conversation"
                    aria-label="Clear conversation"
                    className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

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

            {/* TAB SELECTOR BAR */}
            <div className="flex border-b border-slate-800 bg-slate-950/80 px-2 py-1.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'chat'
                    ? 'bg-[#4A7EB8] text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quotation')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'quotation'
                    ? 'bg-[#4A7EB8] text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Quote</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enquiry')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'enquiry'
                    ? 'bg-[#4A7EB8] text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Send Enquiry</span>
              </button>
            </div>

            {/* TAB 1: AI CHAT VIEW */}
            {activeTab === 'chat' && (
              <>
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
                          className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-md ${
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

                  {/* Typing Indicator */}
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
                      <span className="text-[11px] font-mono text-slate-400">SRTRONIX AI is typing...</span>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* QUICK SHORTCUT CHIPS */}
                {messages.length <= 3 && !isLoading && (
                  <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/60 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
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

                {/* CHAT INPUT FORM */}
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
                      placeholder="Ask about scopes, benches, quotes, specs..."
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

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1">
                    <span>Engineered &amp; calibrated in India</span>
                    <a
                      href="https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20am%20chatting%20with%20your%20website%20assistant%20and%20would%20like%20to%20connect%20with%20a%20sales%20engineer."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      <WhatsAppIcon className="w-3 h-3 fill-current" />
                      <span>WhatsApp Sales Desk</span>
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: INSTANT QUOTATION BUILDER */}
            {activeTab === 'quotation' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between text-xs space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Calculator className="w-4 h-4 text-[#7bb0ed]" />
                        <span>Instant Quotation Generator</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">Approved factory pricing with 18% GST calculation</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50">
                      {currentQuoteRef}
                    </span>
                  </div>

                  {/* Add Product Controls */}
                  <div className="mt-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl space-y-2">
                    <label className="text-[11px] font-semibold text-slate-300 block">Select Instrument Model</label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                    >
                      {APPROVED_PRODUCTS.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} — ₹{prod.price.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Quantity:</span>
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setQuoteQty((q) => Math.max(1, q - 1))}
                            className="px-2 py-1 text-slate-300 hover:bg-slate-800"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 font-mono text-white text-[11px]">{quoteQty}</span>
                          <button
                            type="button"
                            onClick={() => setQuoteQty((q) => q + 1)}
                            className="px-2 py-1 text-slate-300 hover:bg-slate-800"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddQuoteItem}
                        className="px-3 py-1.5 bg-[#4A7EB8] hover:bg-[#3b6ea4] text-white font-medium rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        + Add to Quote
                      </button>
                    </div>
                  </div>

                  {/* Line Items List */}
                  <div className="mt-3 space-y-1.5 max-h-40 overflow-y-auto">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                      Line Items ({quoteItems.length})
                    </div>
                    {quoteItems.length === 0 ? (
                      <div className="text-slate-500 text-center py-4 italic">No instruments selected yet. Add one above!</div>
                    ) : (
                      quoteItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 px-2.5 py-2 rounded-lg text-xs"
                        >
                          <div className="flex-1 pr-2">
                            <span className="text-white font-medium block truncate max-w-[210px]">{item.name}</span>
                            <span className="text-slate-400 text-[10px]">
                              ₹{item.price.toLocaleString('en-IN')} × {item.qty} ={' '}
                              <strong className="text-slate-200">₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveQuoteItem(item.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quotation Summary Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between text-slate-300 text-xs">
                    <span>Ex-Factory Subtotal:</span>
                    <span>₹{quoteSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {quoteDiscountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 text-xs">
                      <span>Volume Discount ({quoteDiscountPercent}%):</span>
                      <span>-₹{quoteDiscountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300 text-xs">
                    <span>GST @ 18% (CGST + SGST / IGST):</span>
                    <span>₹{quoteGst.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-1.5 flex justify-between items-center text-sm font-bold text-white">
                    <span>Grand Total (INR):</span>
                    <span className="text-cyan-300 font-mono text-base">₹{quoteTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                    <Info className="w-3 h-3 text-[#7bb0ed] shrink-0" />
                    <span>Includes 1–3 yr warranty &amp; NABL calibration. Valid for 30 days.</span>
                  </div>

                  {/* Actions: Copy & WhatsApp */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyQuote}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors cursor-pointer"
                    >
                      {quoteCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{quoteCopied ? 'Quote Copied!' : 'Copy Quote'}</span>
                    </button>

                    <a
                      href={quoteWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-sm"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COLLECT CUSTOMER ENQUIRIES */}
            {activeTab === 'enquiry' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between text-xs space-y-4">
                {enquirySuccessRef ? (
                  <div className="my-auto text-center space-y-3 p-4 bg-slate-900/90 border border-emerald-500/30 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-white">Enquiry Received Successfully!</h4>
                    <p className="text-xs text-slate-300">
                      Your reference number is:{' '}
                      <strong className="text-cyan-300 font-mono text-sm block mt-1">{enquirySuccessRef}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Our technical engineering sales desk will contact you via email &amp; phone within 2 business hours.
                    </p>

                    <div className="pt-2 flex flex-col gap-2">
                      <a
                        href={`https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20have%20submitted%20an%20enquiry%20Ref:%20${enquirySuccessRef}.%20Please%20provide%20callback.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>Follow Up on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setEnquirySuccessRef(null);
                          setActiveTab('chat');
                        }}
                        className="text-slate-400 hover:text-white text-xs underline pt-1"
                      >
                        Return to AI Chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-3">
                    <div className="border-b border-slate-800 pb-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#7bb0ed]" />
                        <span>Submit Official Customer Enquiry</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">Request formal proposal, institutional RFQ, or site demo</p>
                    </div>

                    {enquiryError && (
                      <div className="p-2.5 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200 text-xs">
                        {enquiryError}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={enquiryForm.fullName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                        placeholder="e.g. Dr. Rajesh Kumar"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-300">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-300">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          placeholder="name@institution.edu"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-300">Company / University / Lab *</label>
                      <input
                        type="text"
                        required
                        value={enquiryForm.company}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                        placeholder="e.g. IIT Bombay / Embedded Labs India"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-300">Product Interested In</label>
                      <select
                        value={enquiryForm.product}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, product: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                      >
                        <option value="Smart Work Bench Station">Smart Work Bench Station (Modular Console)</option>
                        <option value="Digital Oscilloscopes (SDS1102 / HDS272S / TAO3000)">Digital Oscilloscopes Range</option>
                        <option value="DC Power Supplies (MPS-200 / SPM3103)">DC Power Supplies</option>
                        <option value="LCR Meters & Component Testers">LCR Meters &amp; Testers</option>
                        <option value="Complete Turnkey Laboratory Setup">Complete Turnkey Laboratory Setup</option>
                        <option value="Other Custom Instrumentation">Other Custom Instrumentation</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-300">Requirement / Message</label>
                      <textarea
                        rows={2}
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        placeholder="Specify quantities, target specs, or tender requirements..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4A7EB8]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingEnquiry}
                      className="w-full py-2.5 bg-gradient-to-r from-[#4A7EB8] to-[#2563eb] hover:from-[#3b6ea4] hover:to-[#1d4ed8] text-white font-semibold rounded-xl text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmittingEnquiry ? 'Submitting Enquiry...' : 'Submit Enquiry & Request Callback'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatbot;
