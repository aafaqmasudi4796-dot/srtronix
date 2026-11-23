import { NextRequest, NextResponse } from 'next/server';
import { products, productCategories, companyDetails } from '@/data/products';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Build comprehensive grounding system knowledge
function buildSystemKnowledge(): string {
  const productSummaries = products.map((p) => {
    const specs = p.keySpecs.map((s) => `${s.label}: ${s.value}`).join(', ');
    return `• ${p.name} (Category: ${p.category}) [Link: /products/${p.slug}]: ${p.shortDescription} Key Specs: ${specs}`;
  }).join('\n');

  return `You are the official AI Technical Sales & Instrumentation Engineer for SRTRONIX Instruments Private Limited.
Your goal is to assist engineers, researchers, students, and procurement officers with accurate technical information, instrument selection, quotes, and specifications.

ABOUT SRTRONIX:
- Legal Name: ${companyDetails.legalName}
- Headquarters & Facility: ${companyDetails.address}
- Contact Phone: ${companyDetails.phone}
- Email: ${companyDetails.email} / Support: ${companyDetails.supportEmail}
- Working Hours: ${companyDetails.workingHours}
- Quality Promise: Engineered & assembled in India with high precision, calibrated testing, 1–3 years factory warranty, and prompt domestic service.
- WhatsApp Direct Support: https://wa.me/917022429004

AVAILABLE PRODUCT CATALOG:
Categories: ${productCategories.join(', ')}

${productSummaries}

FLAGSHIP PRODUCT - SMART WORK BENCH STATION:
- Complete integrated 5-in-1 laboratory workstation with heavy-duty M.S. powder-coated construction (1500 × 1330 × 800 mm).
- Includes: Digital Oscilloscope, Precision Variable DC Supply, Digital Multimeter, LCR Meter, and Transistor/Component Tester.
- 25mm industrial wooden work surface with 2mm PVC edge, lockable drawers, caster wheels with foot brakes, emergency stop push button, 2-pole MCB, 4 AC outlets, and active exhaust cooling.
- Fully customizable to institutional and R&D requirements. Direct link: /products/electronic-smart-work-station

RESPONSE GUIDELINES:
1. Be technical, helpful, courteous, and authoritative yet approachable.
2. When users ask for a product recommendation, explain why a specific instrument fits their technical requirement (e.g. bandwidth, sample rate, voltage/current, portable vs benchtop).
3. Provide relevant page links using markdown: [Product Name](/products/slug) or [Inquire Now](/contact#inquire).
4. For quotations, institutional bulk orders, and custom workbench builds, invite them to fill the [Inquiry Form](/contact#inquire) or chat directly on [WhatsApp](https://wa.me/917022429004).
5. Keep responses concise, well-structured with bullet points where appropriate.`;
}

// Built-in Intelligent Fallback Knowledge Engine (Runs when no external API key is set)
function generateKnowledgeEngineResponse(userPrompt: string): string {
  const p = userPrompt.toLowerCase().trim();

  // 1. Greetings & General Inquiries
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/i.test(p)) {
    return `Hello! Welcome to **SRTRONIX Instruments**. 

I am your AI Engineering Assistant. I can help you with:
• **Instrument Specifications** (Oscilloscopes, DC Supplies, Multimeters, LCR Meters)
• **Smart Work Bench Station** custom configurations & layouts
• **Technical Quotations & Inquiries** for academic or industrial labs
• **Calibration & Warranty details** for Indian manufacturing

What instrument or application are you working on today?`;
  }

  // 2. Smart Work Bench Station
  if (p.includes('smart work') || p.includes('workbench') || p.includes('work station') || p.includes('smart bench') || p.includes('table')) {
    const bench = products.find((x) => x.id === 'electronic-smart-work-station');
    return `### **SRTRONIX Smart Work Bench Station** (Flagship System)

Our **Smart Work Bench Station** is an all-in-one laboratory console engineered and assembled in India, designed to eliminate lab clutter and replace scattered discrete equipment.

**Key Highlights:**
• **Integrated Gear:** Built-in Digital Oscilloscope, Regulated DC Power Supply, Digital Multimeter, LCR Meter, and Transistor Tester.
• **Heavy-Duty Construction:** Mild Steel (M.S.) powder-coated frame (1500 × 1330 × 800 mm) with anti-corrosive finish.
• **Worksurface:** 25 mm thick industrial wooden board with 2 mm impact-resistant PVC edge.
• **Safety & Power:** Front Emergency Push Stop button, 2-Pole MCB circuit protection, 4 multi-format AC sockets, and low-noise active cooling fan.
• **Mobility & Storage:** Fixed smooth-glide drawer unit and lockable heavy-duty caster wheels.
• **Customization:** 100% customizable front panel and instrument loadout for college labs, defense, R&D, and production.

👉 [View Smart Work Bench Details](/products/electronic-smart-work-station)
👉 [Request a Custom Quote](/contact#inquire) or chat on [WhatsApp (+91 70224 29004)](https://wa.me/917022429004)`;
  }

  // 3. Oscilloscopes
  if (p.includes('oscilloscope') || p.includes('scope') || p.includes('dso') || p.includes('waveform') || p.includes('hds272s') || p.includes('sds1102')) {
    return `### **SRTRONIX Digital Oscilloscopes Range**

We offer high-fidelity oscilloscopes for both field testing and benchtop precision:

1. **[HDS272S Handheld Oscilloscope](/products/handheld-oscilloscope-hds272s)** (Portable Field Lab)
   • **Bandwidth:** Dual-Channel 70 MHz (expandable to 200 MHz), 250 MSa/s
   • **3-in-1 Multi-function:** Digital Storage Scope + True RMS Multimeter + DDS Waveform Generator
   • **Portability:** 3.5" high-contrast outdoor screen, USB-C powered, dual 18650 Li-ion battery backup.

2. **Benchtop Digital Storage Oscilloscopes (DSO)**
   • **Bandwidth:** 100 MHz – 200 MHz, 1 GSa/s real-time sampling rate
   • **Display:** 7" – 8" color TFT with deep 10K–10M memory depth and 30+ automated measurements.
   • **Connectivity:** USB Host/Device, PC remote control, and SCPI/LabVIEW compatibility.

👉 [Browse All Oscilloscopes](/products?category=Oscilloscopes)
👉 Need advice choosing between Handheld and Benchtop? Feel free to ask or [Submit an Inquiry](/contact#inquire)!`;
  }

  // 4. DC Power Supplies
  if (p.includes('power supply') || p.includes('dc supply') || p.includes('mps-200') || p.includes('voltage') || p.includes('current') || p.includes('linear dc')) {
    return `### **SRTRONIX Precision Linear DC Power Supplies**

Engineered for ultra-low noise, sensitive analog circuit testing, and mission-critical hardware prototyping:

• **Model:** **[MPS-200 Precision Series](/products/dc-power-supply-mps-200)**
• **Output Range:** Variable 0–30 V DC, 0–5 A continuous current (Multi-channel options available)
• **Ripple & Noise:** Ultra-low ripple ($\le 1\\text{ mV}_{\text{RMS}}$), ideal for RF and sensitive microcontrollers.
• **Protection Suite:** Over-Voltage Protection (OVP), Over-Current Protection (OCP), and thermal cut-off.
• **Display:** Dual high-visibility 4-digit LED displays for concurrent voltage and current monitoring.

👉 [Explore Power Supplies](/products?category=DC%20Power%20Supplies)
👉 [Inquire for Multi-Channel Configurations](/contact#inquire)`;
  }

  // 5. LCR Meters & Component Testers
  if (p.includes('lcr') || p.includes('capacitance') || p.includes('inductance') || p.includes('impedance') || p.includes('esr')) {
    return `### **SRTRONIX Precision LCR Meters & Component Analyzers**

Designed for passive component inspection, transformer testing, and quality control:

• **Parameters:** L, C, R, Z, D, Q, $\\theta$, ESR, and DCR.
• **Test Frequencies:** Multi-frequency test ranges from 100 Hz, 120 Hz, 1 kHz up to high-frequency RF standards.
• **Accuracy:** High basic accuracy down to $\\pm 0.1\\%$.
• **Fixture Support:** 4-terminal Kelvin test probes, SMD tweezers, and automated component sorting modes.

👉 [Browse LCR Meters](/products?category=LCR%20Meters)
👉 [Get Technical Datasheet](/contact#inquire)`;
  }

  // 6. Multimeters & Clamp Meters
  if (p.includes('multimeter') || p.includes('dmm') || p.includes('clamp') || p.includes('meter')) {
    return `### **SRTRONIX Digital Multimeters & Clamp Meters**

High-accuracy measurement instruments for industrial maintenance and benchtop design:

• **Benchtop Digital Multimeters:** 4½ to 6½ digit high-resolution DMMs with True RMS, temperature, frequency, and data logging.
• **Industrial Clamp Meters:** Non-contact AC/DC current measurement up to 1000A with CAT III / CAT IV safety ratings.

👉 [Browse Measurement Tools](/products?category=Multimeters)
👉 [Contact Us for Bulk Pricing](/contact#inquire)`;
  }

  // 7. Electronic Loads & Waveform Generators
  if (p.includes('electronic load') || p.includes('dc load') || p.includes('waveform generator') || p.includes('function generator') || p.includes('signal generator')) {
    return `### **SRTRONIX Signal & Load Testing Instruments**

• **Programmable DC Electronic Loads:** CC, CV, CR, and CP modes with dynamic transient testing for batteries, solar panels, and power converters.
• **Arbitrary Waveform Generators:** Dual-channel DDS signal synthesis up to 60 MHz with built-in modulation (AM, FM, PM, FSK, PWM) and arbitrary curve editing.

👉 [Explore Signal Equipment](/products)
👉 [Request Quotation](/contact#inquire)`;
  }

  // 8. Quotation, Pricing, Bulk & Institutional Orders
  if (p.includes('price') || p.includes('cost') || p.includes('quote') || p.includes('quotation') || p.includes('buy') || p.includes('order') || p.includes('discount') || p.includes('college') || p.includes('university') || p.includes('institutional')) {
    return `### **Requesting a Quotation from SRTRONIX**

We provide official GST invoices, educational discounts for colleges and universities, and custom bulk quotations for labs across India:

1. **Direct Online Inquiry:**
   Fill out our quick [Official Inquiry Form](/contact#inquire) specifying your required items and quantity. Our sales engineers reply within **2–4 business hours**.
2. **Instant WhatsApp Assistance:**
   Chat directly with our instrumentation desk at [WhatsApp: +91 70224 29004](https://wa.me/917022429004).
3. **Official Email:**
   Send your RFQ / Tender document to **sales@srtronix.com**.

We support customized specifications, GEM portal compliance, and PAN-India delivery.`;
  }

  // 9. Location, Address, Warranty & Service
  if (p.includes('where') || p.includes('location') || p.includes('address') || p.includes('contact') || p.includes('phone') || p.includes('warranty') || p.includes('service') || p.includes('india') || p.includes('bengaluru') || p.includes('lucknow')) {
    return `### **SRTRONIX Company & Support Information**

• **Facility & Office:** ${companyDetails.address}
• **Phone:** [${companyDetails.phone}](tel:${companyDetails.phone.replace(/\\s+/g, '')})
• **Email:** [${companyDetails.email}](mailto:${companyDetails.email}) / [${companyDetails.supportEmail}](mailto:${companyDetails.supportEmail})
• **Working Hours:** ${companyDetails.workingHours}
• **Warranty:** 1 to 3 Years comprehensive manufacturer warranty with direct domestic parts and service support.
• **Domestic Assembly:** Proudly engineered & assembled in India.

👉 [Visit our Contact Page](/contact#inquire)
👉 [Chat on WhatsApp](https://wa.me/917022429004)`;
  }

  // 10. Default Contextual Fallback
  return `Thank you for your question regarding **SRTRONIX Test & Measurement Solutions**.

We manufacture and supply:
• **[Smart Work Bench Stations](/products/electronic-smart-work-station)** (Modular 5-in-1 integrated consoles)
• **[Digital Oscilloscopes](/products?category=Oscilloscopes)** (Handheld & Benchtop 70–200MHz)
• **[Linear DC Power Supplies](/products/dc-power-supply-mps-200)** (Ultra-low ripple, regulated 0–30V/5A)
• **[LCR Meters & Power Analyzers](/products)**

Could you please clarify your specific testing requirement or parameter (e.g. required bandwidth, voltage range, or bench setup)? 

You can also speak directly with our engineering team via [WhatsApp (+91 70224 29004)](https://wa.me/917022429004) or submit an [Inquiry Form](/contact#inquire).`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const latestUserMessage = messages.filter((m) => m.role === 'user').pop()?.content || '';

    // Check if Gemini API key is configured
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const systemPrompt = buildSystemKnowledge();
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

        const contents = [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Understood. I am ready to serve as the SRTRONIX AI technical assistant.' }] },
          ...messages.slice(-6).map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
        ];

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 800,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return NextResponse.json({ reply: candidateText });
          }
        }
      } catch (err) {
        console.error('Gemini API call failed, falling back to Knowledge Engine:', err);
      }
    }

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
      try {
        const systemPrompt = buildSystemKnowledge();
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-6),
            ],
            temperature: 0.3,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.error('OpenAI API call failed, falling back to Knowledge Engine:', err);
      }
    }

    // High-performance built-in SRTRONIX Engineering Knowledge Engine
    const smartReply = generateKnowledgeEngineResponse(latestUserMessage);
    return NextResponse.json({ reply: smartReply });
  } catch (error) {
    console.error('Error in AI Chat API route:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating AI response.' },
      { status: 500 }
    );
  }
}
