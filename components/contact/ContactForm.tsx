'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';

interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  inquiryType: string;
  message: string;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      product: preselectedProduct,
      inquiryType: 'Product Inquiry',
      message: '',
    },
  });

  useEffect(() => {
    if (preselectedProduct) {
      setValue('product', preselectedProduct);
    }
  }, [preselectedProduct, setValue]);

  // Smooth scroll directly to form if landing on or navigating to #inquire
  useEffect(() => {
    const scrollToInquire = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#inquire') {
        const el = document.getElementById('inquire');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    scrollToInquire();
    const t1 = setTimeout(scrollToInquire, 150);
    const t2 = setTimeout(scrollToInquire, 500);

    window.addEventListener('hashchange', scrollToInquire);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('hashchange', scrollToInquire);
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      reset();
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try calling or emailing us directly.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/60">
      {status === 'success' ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Inquiry Successfully Transmitted
          </h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Thank you for reaching out to SRTRONIX. An instrumentation specialist will review your requirements and provide an official quotation or technical response within 24 business hours.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => setStatus('idle')}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Submit Another Request</span>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {preselectedProduct && (
            <div className="p-3.5 rounded-xl bg-[#0f2a4a]/70 border border-[#4A7EB8]/70 flex items-center justify-between text-xs text-[#7bb0ed]">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#4A7EB8]" />
                Selected Instrument: <strong className="font-bold text-white">{preselectedProduct}</strong>
              </span>
              <button
                type="button"
                onClick={() => setValue('product', '')}
                className="text-[#7bb0ed] hover:text-white font-semibold underline text-[11px]"
              >
                Clear
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                placeholder="Dr. Rajesh Sharma"
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700/80'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            {/* Company / Institution */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Company / Institution <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                {...register('company', {
                  required: 'Company or institution is required',
                })}
                placeholder="Indian Institute of Technology / Tech Lab"
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.company ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700/80'
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                placeholder="engineer@institution.edu.in"
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700/80'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required for quote verification',
                  pattern: {
                    value: /^[+0-9\s-]{8,20}$/,
                    message: 'Please enter a valid telephone number',
                  },
                })}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700/80'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Product Interested In */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Interested In
              </label>
              <select
                {...register('product')}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="">General Inquiry / Multiple Products</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Inquiry Type <span className="text-red-400">*</span>
              </label>
              <select
                {...register('inquiryType', { required: true })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Bulk Purchase">Bulk Purchase</option>
                <option value="Educational / Institutional Requirement">
                  Educational / Institutional Requirement
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Message / Lab Requirements <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              {...register('message', {
                required: 'Please describe your laboratory requirements or instrument questions',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
              })}
              placeholder="Please share target test specifications, quantity needed, or workbench customizations required..."
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700/80'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={status === 'loading'}
              size="lg"
              className="w-full font-semibold shadow-md shadow-[#4A7EB8]/30"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Transmitting Inquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Inquiry Request</span>
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
