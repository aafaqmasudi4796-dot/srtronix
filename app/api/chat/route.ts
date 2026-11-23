import { NextRequest, NextResponse } from 'next/server';
import { products, productCategories, companyDetails } from '@/data/products';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Approved Product Catalog with Official List Prices (INR, Ex-factory + 18% GST)
const APPROVED_PRICING: Record<string, { name: string; price: number; slug: string; category: string; gstRate: number }> = {
  'electronic-smart-work-station': {
    name: 'Smart Work Bench Station (5-in-1 Modular Flagship)',
    price: 145000,
    slug: 'electronic-smart-work-station',
    category: 'Smart Workbench Systems',
    gstRate: 0.18,
  },
  'handheld-oscilloscope-hds272s': {
    name: 'Handheld Oscilloscope HDS272S (70MHz, 2-CH + DMM)',
    price: 28500,
    slug: 'handheld-oscilloscope-hds272s',
    category: 'Oscilloscopes',
    gstRate: 0.18,
  },
  'bench-oscilloscope-sds1102': {
    name: 'Bench Oscilloscope SDS1102 (100MHz, 2-CH, 1GS/s, 7" LCD)',
    price: 24900,
    slug: 'bench-oscilloscope-sds1102',
    category: 'Oscilloscopes',
    gstRate: 0.18,
  },
  'tablet-oscilloscope-tao3000': {
    name: 'Tablet Oscilloscope TAO3000 (100MHz, 4-CH, 8" Touch, Wi-Fi)',
    price: 68000,
    slug: 'tablet-oscilloscope-tao3000',
    category: 'Oscilloscopes',
    gstRate: 0.18,
  },
  'dc-power-supply-mps-200': {
    name: 'DC Power Supply MPS-200 (0-30V / 0-6A, 180W Linear)',
    price: 18500,
    slug: 'dc-power-supply-mps-200',
    category: 'DC Power Supplies',
    gstRate: 0.18,
  },
  '3-in-1-power-supply-spm3103': {
    name: '3-in-1 Power Supply SPM3103 (30V/10A/300W + 4.5D DMM)',
    price: 32000,
    slug: '3-in-1-power-supply-spm3103',
    category: 'DC Power Supplies',
    gstRate: 0.18,
  },
  'owon-lcr2000-series-lcr-meter': {
    name: 'OWON LCR2000 Series LCR Meter (0.05% Accuracy, 100kHz)',
    price: 54000,
    slug: 'owon-lcr2000-series-lcr-meter',
    category: 'LCR Meters',
    gstRate: 0.18,
  },
  'waveform-generator-ag4151': {
    name: 'Waveform Generator AG4151 (150MHz DDS, 400MS/s, 14-bit)',
    price: 42500,
    slug: 'waveform-generator-ag4151',
    category: 'Waveform Generators',
    gstRate: 0.18,
  },
  'clamp-multimeter-cm2100b': {
    name: 'Clamp Multimeter CM2100B (0.1A-100A AC/DC, True RMS)',
    price: 9800,
    slug: 'clamp-multimeter-cm2100b',
    category: 'Multimeters',
    gstRate: 0.18,
  },
  'owon-oel85-series-dc-electronic-load': {
    name: 'OWON OEL85 Series DC Electronic Load (5kHz Dynamic, CC/CV/CR/CP)',
    price: 48000,
    slug: 'owon-oel85-series-dc-electronic-load',
    category: 'Electronic Loads',
    gstRate: 0.18,
  },
  'owon-owh9800-series-power-meter': {
    name: 'OWON OWH9800 Series Power Meter (2-CH, 63rd Harmonics)',
    price: 62000,
    slug: 'owon-owh9800-series-power-meter',
    category: 'Power Meters',
    gstRate: 0.18,
  },
};

// Build comprehensive system knowledge for AI agents
function buildSystemKnowledge(): string {
  const productSummaries = products
    .map((p) => {
      const pricing = APPROVED_PRICING[p.id];
      const priceStr = pricing ? `Approved List Price: ₹${pricing.price.toLocaleString('en-IN')} + 18% GST` : 'Request Quotation';
      const specs = p.keySpecs.map((s) => `${s.label}: ${s.value}`).join(', ');
      return `• ${p.name} (Category: ${p.category}) [Link: /products/${p.slug}] | ${priceStr} | Key Specs: ${specs}. Description: ${p.shortDescription}`;
    })
    .join('\n');

  return `You are the official 24/7 AI Technical Sales & Instrumentation Engineer for SRTRONIX Instruments Private Limited.
Your role is to assist clients by:
1. Answering customer questions 24/7 about products, company, warranty, shipping, and service.
2. Recommending electronic instruments tailored to specific applications (education, R&D, field service, automotive, power electronics).
3. Explaining product specifications (bandwidth, sampling rate, memory depth, ripple/noise, True RMS, dynamic loading, harmonic distortion).
4. Collecting customer enquiries and guiding them to our in-chat enquiry form or contact desk.
5. Generating formal quotations based on approved product pricing (including GST and itemized calculations).
6. Connecting customers to WhatsApp (+91 70224 29004) for immediate order placement or engineering consultation.

ABOUT SRTRONIX INSTRUMENTS:
- Legal Entity: ${companyDetails.legalName}
- Factory & HQ: ${companyDetails.address}
- Official Phone: ${companyDetails.phone}
- Email: ${companyDetails.email} (Sales) | ${companyDetails.supportEmail} (Support)
- Operating Hours: 24/7 AI assistance online; Mon–Sat 9:00 AM – 6:30 PM IST domestic sales office.
- Warranty: 1 to 3 Years comprehensive warranty; 2 years standard on flagship Smart Work Bench Stations.
- Domestic Dispatch: Ships within 2–4 business days across India via insured logistics. Express air delivery available.
- Calibration: Factory calibrated; NABL traceable calibration certificate provided upon request.
- WhatsApp Direct: https://wa.me/917022429004

APPROVED PRODUCT PRICING LIST:
${Object.entries(APPROVED_PRICING)
  .map(([id, info]) => `• ${info.name}: ₹${info.price.toLocaleString('en-IN')} (Ex-factory) + 18% GST (₹${Math.round(info.price * 0.18).toLocaleString('en-IN')}) = Total ₹${Math.round(info.price * 1.18).toLocaleString('en-IN')}`)
  .join('\n')}

PRODUCT DETAILS & SPECS:
${productSummaries}

QUOTATION RULES:
- When the user asks for a price, quote, or quotation, calculate the exact figures based on the approved prices.
- Add 18% GST.
- Offer bulk discount: 5% off on 3+ units, 10% off on 10+ units for academic/institutional orders.
- Provide a clear breakdown: Unit Price, Quantity, Subtotal, GST 18%, and Final Total in ₹ INR.
- Include 30-day quote validity and standard warranty.
- Always include the direct WhatsApp action link: https://wa.me/917022429004

RECOMMENDATION RULES:
- Academic / College Laboratory: Recommend SDS1102 (100MHz 2-CH DSO) + MPS-200 (Linear DC Supply), or the flagship all-in-one Smart Work Bench Station.
- Field Service / Automotive Diagnostics: Recommend HDS272S Handheld Oscilloscope (built-in battery + 20,000 count DMM) and CM2100B Clamp Meter.
- High-Speed Digital / Embedded Systems: Recommend TAO3000 (4-channel tablet with touch and protocol decoding) + AG4151 Waveform Generator.
- Component QC / Incoming Quality: Recommend OWON LCR2000 Series (0.05% basic accuracy, handler interface).
- Power Supply / Inverter / Battery Stress Testing: Recommend OWON OEL85 DC Electronic Load + OWH9800 Power Meter.

SPECIFICATION EXPLANATION RULES:
- Explain what specs mean in practical engineering terms (e.g. Bandwidth rule of 5x fundamental frequency for digital square waves, 1GS/s real-time sample rate for capturing transient glitches without aliasing, linear power supply with ≤2mVrms ripple for noise-sensitive RF and analog circuits).`;
}

// Format an itemized quotation in Markdown
function formatQuotation(
  items: Array<{ id: string; name: string; unitPrice: number; qty: number; slug: string }>
): string {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  // Bulk discount
  let discountPercent = 0;
  if (totalQty >= 10) discountPercent = 10;
  else if (totalQty >= 3) discountPercent = 5;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.18);
  const netTotal = taxableAmount + gstAmount;

  const quoteId = `SRT-QT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const lines = items
    .map(
      (it, idx) =>
        `| ${idx + 1} | [${it.name}](/products/${it.slug}) | ₹${it.unitPrice.toLocaleString('en-IN')} | ${it.qty} | ₹${(it.unitPrice * it.qty).toLocaleString('en-IN')} |`
    )
    .join('\n');

  const waText = encodeURIComponent(
    `Hello SRTRONIX Sales Team,\nI would like to place an order / confirm Quotation Ref: ${quoteId}\nTotal Amount: ₹${netTotal.toLocaleString('en-IN')} (incl. 18% GST).\nPlease provide proforma invoice and dispatch timeline.`
  );

  return `### 📄 Official Proforma Quotation (${quoteId})

**Customer Entity:** Institutional / Commercial Buyer  
**Issued By:** SRTRONIX Instruments Private Limited, Bengaluru  
**Validity:** 30 Days from date of issue  
**Warranty:** 1 to 3 Years Comprehensive Domestic Warranty  

| # | Item Description | Unit Price (INR) | Qty | Amount (INR) |
|---|---|---|---|---|
${lines}

---
• **Subtotal (Ex-Factory):** ₹${subtotal.toLocaleString('en-IN')}  
${discountPercent > 0 ? `• **Volume Discount (${discountPercent}%):** -₹${discountAmount.toLocaleString('en-IN')}\n• **Taxable Value:** ₹${taxableAmount.toLocaleString('en-IN')}  \n` : ''}• **GST @ 18% (CGST 9% + SGST 9% / IGST):** ₹${gstAmount.toLocaleString('en-IN')}  
### **Grand Total: ₹${netTotal.toLocaleString('en-IN')} (INR)**

**Inclusions & Commercial Terms:**
1. **Calibration:** Factory testing & NABL traceable test report included.
2. **Accessories:** Standard power cords, oscilloscope probes (10:1 / 1:1), Kelvin clips, and documentation.
3. **Dispatch:** Insured courier delivery across India within 2–4 business days.
4. **Payment Terms:** 100% advance against Proforma Invoice / Net-30 for approved institutional POs.

👉 [**Confirm this Quotation on WhatsApp (+91 70224 29004)**](https://wa.me/917022429004?text=${waText})  
👉 [**Submit Official Institutional Inquiry / RFQ**](/contact#inquire)`;
}

// Built-in Intelligent Fallback Knowledge Engine (Runs when no external API key is set)
function generateKnowledgeEngineResponse(userPrompt: string): string {
  const p = userPrompt.toLowerCase().trim();

  // 1. Quotation Request Detection
  if (
    p.includes('quote') ||
    p.includes('quotation') ||
    p.includes('price') ||
    p.includes('cost') ||
    p.includes('rate') ||
    p.includes('how much') ||
    p.includes('proforma')
  ) {
    const matchedItems: Array<{ id: string; name: string; unitPrice: number; qty: number; slug: string }> = [];

    // Parse specific product matches
    if (p.includes('bench') || p.includes('workbench') || p.includes('work station') || p.includes('station')) {
      const pr = APPROVED_PRICING['electronic-smart-work-station'];
      matchedItems.push({ id: 'electronic-smart-work-station', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('hds272s') || p.includes('handheld') || p.includes('portable scope')) {
      const pr = APPROVED_PRICING['handheld-oscilloscope-hds272s'];
      matchedItems.push({ id: 'handheld-oscilloscope-hds272s', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('sds1102') || p.includes('100mhz') || (p.includes('oscilloscope') && !p.includes('handheld') && !p.includes('tablet') && matchedItems.length === 0)) {
      const pr = APPROVED_PRICING['bench-oscilloscope-sds1102'];
      matchedItems.push({ id: 'bench-oscilloscope-sds1102', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('tao3000') || p.includes('tablet') || p.includes('touch') || p.includes('4-channel')) {
      const pr = APPROVED_PRICING['tablet-oscilloscope-tao3000'];
      matchedItems.push({ id: 'tablet-oscilloscope-tao3000', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('mps-200') || p.includes('mps200') || (p.includes('power supply') && !p.includes('3-in-1') && !p.includes('spm'))) {
      const pr = APPROVED_PRICING['dc-power-supply-mps-200'];
      matchedItems.push({ id: 'dc-power-supply-mps-200', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('spm3103') || p.includes('3-in-1') || p.includes('combo')) {
      const pr = APPROVED_PRICING['3-in-1-power-supply-spm3103'];
      matchedItems.push({ id: '3-in-1-power-supply-spm3103', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('lcr') || p.includes('lcr2000') || p.includes('inductance')) {
      const pr = APPROVED_PRICING['owon-lcr2000-series-lcr-meter'];
      matchedItems.push({ id: 'owon-lcr2000-series-lcr-meter', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('generator') || p.includes('ag4151') || p.includes('waveform') || p.includes('dds')) {
      const pr = APPROVED_PRICING['waveform-generator-ag4151'];
      matchedItems.push({ id: 'waveform-generator-ag4151', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('clamp') || p.includes('cm2100b')) {
      const pr = APPROVED_PRICING['clamp-multimeter-cm2100b'];
      matchedItems.push({ id: 'clamp-multimeter-cm2100b', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('load') || p.includes('oel85') || p.includes('electronic load')) {
      const pr = APPROVED_PRICING['owon-oel85-series-dc-electronic-load'];
      matchedItems.push({ id: 'owon-oel85-series-dc-electronic-load', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }
    if (p.includes('power meter') || p.includes('owh9800') || p.includes('harmonic')) {
      const pr = APPROVED_PRICING['owon-owh9800-series-power-meter'];
      matchedItems.push({ id: 'owon-owh9800-series-power-meter', name: pr.name, unitPrice: pr.price, qty: 1, slug: pr.slug });
    }

    // Default sample if no specific product was parsed
    if (matchedItems.length === 0) {
      return `### 💰 SRTRONIX Approved Product Pricing Overview

Here is our official ex-factory price list for standard test instruments:

| Product Model | Approved Price (INR) | GST @ 18% | Total (INR) |
|---|---|---|---|
| **[Smart Work Bench Station](/products/electronic-smart-work-station)** | ₹1,45,000 | ₹26,100 | **₹1,71,100** |
| **[Handheld Oscilloscope HDS272S](/products/handheld-oscilloscope-hds272s)** | ₹28,500 | ₹5,130 | **₹33,630** |
| **[Bench Oscilloscope SDS1102](/products/bench-oscilloscope-sds1102)** | ₹24,900 | ₹4,482 | **₹29,382** |
| **[Tablet Oscilloscope TAO3000](/products/tablet-oscilloscope-tao3000)** | ₹68,000 | ₹12,240 | **₹80,240** |
| **[DC Power Supply MPS-200](/products/dc-power-supply-mps-200)** | ₹18,500 | ₹3,330 | **₹21,830** |
| **[3-in-1 Power Supply SPM3103](/products/3-in-1-power-supply-spm3103)** | ₹32,000 | ₹5,760 | **₹37,760** |
| **[OWON LCR2000 Series LCR Meter](/products/owon-lcr2000-series-lcr-meter)** | ₹54,000 | ₹9,720 | **₹63,720** |
| **[Waveform Generator AG4151](/products/waveform-generator-ag4151)** | ₹42,500 | ₹7,650 | **₹50,150** |
| **[Clamp Multimeter CM2100B](/products/clamp-multimeter-cm2100b)** | ₹9,800 | ₹1,764 | **₹11,564** |
| **[OWON OEL85 DC Electronic Load](/products/owon-oel85-series-dc-electronic-load)** | ₹48,000 | ₹8,640 | **₹56,640** |
| **[OWON OWH9800 Power Meter](/products/owon-owh9800-series-power-meter)** | ₹62,000 | ₹11,160 | **₹73,160** |

*Tip: You can use our in-chat **Quick Quotation** tool tab or tell me: "Generate quote for 5x SDS1102 and 2x MPS-200" to generate an itemized proforma quote with institutional volume discounts!*

👉 [Chat on WhatsApp (+91 70224 29004)](https://wa.me/917022429004?text=Hello%20SRTRONIX,%20please%20send%20me%20a%20formal%20quotation%20with%20institutional%20pricing.)  
👉 [Submit Official RFQ Enquiry](/contact#inquire)`;
    }

    return formatQuotation(matchedItems);
  }

  // 2. Recommend Electronic Instruments
  if (
    p.includes('recommend') ||
    p.includes('which instrument') ||
    p.includes('which one') ||
    p.includes('suggest') ||
    p.includes('best for') ||
    p.includes('advice') ||
    p.includes('selection')
  ) {
    if (p.includes('field') || p.includes('outdoor') || p.includes('service') || p.includes('repair') || p.includes('portable')) {
      return `### 🎯 Instrument Recommendations for Field Service & On-Site Repair

For engineers working on-site, in industrial plants, or doing field maintenance, we recommend:

1. **[Handheld Oscilloscope HDS272S](/products/handheld-oscilloscope-hds272s)** (⭐ Top Pick)
   • **Why:** Combines a 70MHz dual-channel oscilloscope, a True RMS 20,000-count DMM, and a DDS generator into a single 0.6kg unit.
   • **Key Advantage:** Built-in rechargeable Li-ion battery (up to 6 hours continuous operation); charges via standard USB-C from laptops or power banks.
   • **Price:** ₹28,500 + 18% GST.

2. **[Clamp Multimeter CM2100B](/products/clamp-multimeter-cm2100b)**
   • **Why:** Non-contact AC/DC current measurement from 0.1A up to 100A with high 1mA resolution, True RMS accuracy, and CAT III safety rating.
   • **Price:** ₹9,800 + 18% GST.

👉 [Order on WhatsApp (+91 70224 29004)](https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20am%20interested%20in%20field%20instruments%20(HDS272S%20/%20CM2100B).)`;
    }

    if (p.includes('college') || p.includes('university') || p.includes('student') || p.includes('education') || p.includes('academic') || p.includes('teaching')) {
      return `### 🎓 Instrument Recommendations for Engineering Colleges & Universities

For academic teaching labs, diploma institutes, and student training benches, durability, ease of use, and budget are essential:

1. **[Flagship Smart Work Bench Station](/products/electronic-smart-work-station)** (⭐ Recommended for Modern Labs)
   • **Why:** A centralized 5-in-1 modular workstation engineered from heavy-duty mild steel (M.S.). Integrates oscilloscope, DC power supply, DMM, LCR meter, and transistor tester into a tamper-resistant console.
   • **Benefits:** Eliminates cable tangle, prevents theft or damage to discrete units, and includes 2-pole MCB + front Emergency Stop safety.
   • **Price:** ₹1,45,000 + 18% GST (Customizable).

2. **Discrete Bench Setup:**
   • **[Bench Oscilloscope SDS1102](/products/bench-oscilloscope-sds1102):** 100MHz 2-CH, 1GS/s, 7" color display, 30 auto measurements (₹24,900 + 18% GST).
   • **[DC Power Supply MPS-200](/products/dc-power-supply-mps-200):** Regulated linear 0–30V/6A with dual rotary encoders and OVP/OCP protection (₹18,500 + 18% GST).

*We offer institutional discounts (up to 10%) on batch procurement for university labs!*

👉 [Request Institutional Proposal on WhatsApp](https://wa.me/917022429004?text=Hello%20SRTRONIX,%20we%20require%20an%20institutional%20lab%20proposal%20for%20our%20engineering%20college.)  
👉 [Submit University RFQ](/contact#inquire)`;
    }

    if (p.includes('embedded') || p.includes('iot') || p.includes('can') || p.includes('serial') || p.includes('automotive') || p.includes('microcontroller')) {
      return `### ⚡ Recommendations for Embedded Systems & Automotive R&D

For microcontroller firmware debugging, CAN/SPI/I2C packet analysis, and hardware prototyping:

1. **[Tablet Oscilloscope TAO3000](/products/tablet-oscilloscope-tao3000)** (⭐ Top Choice)
   • **Features:** 4 analog channels, 100MHz bandwidth, 1GS/s sampling, deep 40M memory depth, 8-inch capacitive multi-touch screen, and built-in Wi-Fi.
   • **Decoding:** Hardware decoding for I2C, SPI, RS232, and automotive CAN buses.
   • **Price:** ₹68,000 + 18% GST.

2. **[Waveform Generator AG4151](/products/waveform-generator-ag4151)**
   • **Features:** 150MHz DDS arbitrary waveform generator with 400MS/s, 14-bit vertical resolution, and 45 built-in arb waveforms to simulate sensors.
   • **Price:** ₹42,500 + 18% GST.

👉 [Consult with an Application Engineer on WhatsApp](https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20would%20like%20to%20discuss%20TAO3000%20for%20embedded%20diagnostics.)`;
    }

    return `### 🎯 SRTRONIX Instrument Selection Guide

Please choose the category that fits your technical requirement:

1. **Field Service & Portable Testing:**
   • **[HDS272S Handheld Oscilloscope](/products/handheld-oscilloscope-hds272s)** (70MHz 2-CH + DMM + Battery) — ₹28,500
   • **[CM2100B Clamp Multimeter](/products/clamp-multimeter-cm2100b)** (0.1A–100A AC/DC True RMS) — ₹9,800

2. **Laboratory & Electronics Benchtop:**
   • **[SDS1102 Bench Oscilloscope](/products/bench-oscilloscope-sds1102)** (100MHz, 1GS/s, 7" LCD) — ₹24,900
   • **[MPS-200 Linear DC Power Supply](/products/dc-power-supply-mps-200)** (0–30V, 0–6A, 180W) — ₹18,500
   • **[SPM3103 3-in-1 Power Supply + DMM](/products/3-in-1-power-supply-spm3103)** (30V/10A/300W) — ₹32,000

3. **Advanced R&D & Production QC:**
   • **[TAO3000 4-CH Touch Tablet Scope](/products/tablet-oscilloscope-tao3000)** (40M Memory, CAN/SPI) — ₹68,000
   • **[OWON LCR2000 LCR Meter](/products/owon-lcr2000-series-lcr-meter)** (0.05% Accuracy, Handler) — ₹54,000
   • **[OEL85 DC Electronic Load](/products/owon-oel85-series-dc-electronic-load)** (5kHz Dynamic, CC/CV/CR/CP) — ₹48,000

4. **All-in-One Turnkey Workstation:**
   • **[Smart Work Bench Station](/products/electronic-smart-work-station)** (Complete 5-in-1 console) — ₹1,45,000

Tell me what you are testing, and I will recommend the exact model! Or chat on [WhatsApp (+91 70224 29004)](https://wa.me/917022429004).`;
  }

  // 3. Explain Product Specifications
  if (
    p.includes('explain') ||
    p.includes('specification') ||
    p.includes('specs') ||
    p.includes('what is') ||
    p.includes('difference between') ||
    p.includes('bandwidth') ||
    p.includes('sample rate') ||
    p.includes('memory depth') ||
    p.includes('linear') ||
    p.includes('true rms') ||
    p.includes('ripple')
  ) {
    if (p.includes('bandwidth')) {
      return `### 🔍 Specification Deep Dive: Oscilloscope Bandwidth

**What is Bandwidth?**
Bandwidth is the frequency at which an input sine wave signal is attenuated by **-3 dB** (approx. 70.7% of its actual amplitude).

**Rule of Thumb for Digital Signals:**
For digital square waves (clocks, serial signals, PWM), always choose an oscilloscope with bandwidth at least **5 times** the fundamental clock frequency.
• If inspecting a 20 MHz microcontroller clock, you need at least a **100 MHz oscilloscope** like the **[SDS1102](/products/bench-oscilloscope-sds1102)** or **[TAO3000](/products/tablet-oscilloscope-tao3000)** to accurately capture the 5th harmonic and measure signal rise times without waveform distortion.

👉 [Browse SRTRONIX Oscilloscopes](/products?category=Oscilloscopes)`;
    }

    if (p.includes('sample rate') || p.includes('sampling')) {
      return `### 🔍 Specification Deep Dive: Real-Time Sampling Rate (GS/s)

**What is Real-Time Sampling Rate?**
Sampling rate is the number of times per second the internal Analog-to-Digital Converter (ADC) samples the incoming analog waveform. It is measured in **MSa/s (Mega Samples/sec)** or **GSa/s (Giga Samples/sec)**.

**Why 1 GS/s Matters:**
According to the Nyquist theorem, you need at least 2× the highest frequency component, but for accurate visual reconstruction of transient glitches and edges in test gear, **4× to 10× oversampling** is recommended.
• On the **[Bench Oscilloscope SDS1102](/products/bench-oscilloscope-sds1102)**, the 1 GS/s real-time engine ensures that single-shot anomalies, ringing, and glitch spikes are captured faithfully without aliasing.`;
    }

    if (p.includes('linear') || p.includes('ripple')) {
      return `### 🔍 Specification Deep Dive: Linear DC Supply vs Switching Supply (SMPS)

**Why Choose Linear Power Supplies like the [MPS-200](/products/dc-power-supply-mps-200)?**
• **Ultra-Low Ripple & Noise:** Linear regulation produces clean DC with ripple voltage **≤ 2 mVrms**. In contrast, standard switching power supplies generate hundreds of millivolts of high-frequency switching hash.
• **Fast Transient Recovery:** Recovers within microseconds when load current steps suddenly.
• **No High-Frequency EMI:** Critical when powering sensitive RF modules, pre-amplifiers, audio circuits, and high-resolution ADC/DAC converters.

👉 [View DC Power Supply MPS-200](/products/dc-power-supply-mps-200)`;
    }

    if (p.includes('true rms') || p.includes('rms')) {
      return `### 🔍 Specification Deep Dive: True RMS vs Average-Responding Meters

**What is True RMS?**
True RMS (Root Mean Square) measures the actual heating value of an electrical waveform, accurately calculating the power dissipation in non-sinusoidal AC circuits.

**Why True RMS is Critical:**
Standard low-cost meters only assume pure sine waves. In modern environments with LED drivers, variable speed motors, inverter ACs, and switched-mode supplies, the current waveform is heavily distorted.
• The **[Clamp Multimeter CM2100B](/products/clamp-multimeter-cm2100b)** and **[Handheld HDS272S](/products/handheld-oscilloscope-hds272s)** use dedicated True RMS converter chips to give exact, error-free readings on chopped and non-sinusoidal signals up to 20,000 counts.`;
    }

    return `### 🔍 SRTRONIX Technical Specifications Reference

Here is a summary of key instrument parameters:

1. **Oscilloscope Bandwidth & Sample Rate:**
   • Handheld HDS272S: 70 MHz, 250 MSa/s, 8K memory, 10,000 wfms/s
   • Bench SDS1102: 100 MHz, 1 GSa/s, 10K memory, 7-inch color display
   • Tablet TAO3000: 100 MHz, 4 Channels, 1 GSa/s, 40M points deep memory

2. **Linear DC Power Supply Purity:**
   • MPS-200: 0–30V, 0–6A, 180W, Ripple ≤ 2mVrms / ≤ 3mArms, 1mV resolution

3. **LCR Component Characterization:**
   • LCR2000: 0.05% basic accuracy, 100 kHz test frequency, 40 measurements/sec, Handler interface

Have a question about a specific specification? Ask me anytime or chat on [WhatsApp (+91 70224 29004)](https://wa.me/917022429004)!`;
  }

  // 4. Collect Customer Enquiries
  if (
    p.includes('enquiry') ||
    p.includes('inquiry') ||
    p.includes('contact me') ||
    p.includes('call me') ||
    p.includes('callback') ||
    p.includes('sales rep') ||
    p.includes('rfq')
  ) {
    return `### 📝 Submit Your Customer Enquiry / Request Callback

Our technical sales team is ready to assist you with formal quotes, institutional orders, and technical consultations.

**How to connect right now:**
1. **Quick In-Chat Form:** Switch to the **"📝 Send Enquiry"** tab at the top of this chat window to submit your name, phone, institution, and requirement. You will receive an immediate confirmation and reference number.
2. **Instant WhatsApp Assistance:** Message an SRTRONIX sales engineer directly on [WhatsApp (+91 70224 29004)](https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20would%20like%20to%20submit%20an%20instrument%20enquiry.).
3. **Official Website Form:** Fill the [Official Contact & RFQ Form](/contact#inquire).

*We respond to all institutional enquiries within 2 hours during business hours!*`;
  }

  // 5. Connect Customers to WhatsApp
  if (
    p.includes('whatsapp') ||
    p.includes('chat') ||
    p.includes('talk to human') ||
    p.includes('speak with agent') ||
    p.includes('phone') ||
    p.includes('mobile')
  ) {
    return `### 💬 Connect Directly to SRTRONIX on WhatsApp

You can connect directly with our Technical Sales & Support Desk in Bengaluru:

• **WhatsApp Number:** **+91 70224 29004**  
• **Support Availability:** Monday – Saturday, 9:00 AM – 6:30 PM IST  
• **Direct Link:** 👉 [**Click here to chat on WhatsApp**](https://wa.me/917022429004?text=Hello%20SRTRONIX%20Instruments,%20I%20am%20chatting%20from%20your%20website%20and%20would%20like%20technical%20assistance.)

You can share circuit photos, RFQ documents, or purchase orders directly over WhatsApp for an instant response!`;
  }

  // 6. Smart Work Bench Station
  if (p.includes('smart work') || p.includes('workbench') || p.includes('work station') || p.includes('smart bench') || p.includes('table')) {
    const pr = APPROVED_PRICING['electronic-smart-work-station'];
    return `### **SRTRONIX Smart Work Bench Station** (Flagship Modular Console)

Our **Smart Work Bench Station** is an all-in-one laboratory console engineered and assembled in India, designed to eliminate lab clutter and replace scattered discrete equipment.

**Approved Base Price:** ₹${pr.price.toLocaleString('en-IN')} (Ex-factory) + 18% GST = **₹${Math.round(pr.price * 1.18).toLocaleString('en-IN')} Total**

**Key Highlights:**
• **Integrated Gear:** Built-in Digital Oscilloscope, Regulated DC Power Supply, Digital Multimeter, LCR Meter, and Transistor Tester.
• **Heavy-Duty Construction:** Mild Steel (M.S.) powder-coated frame (1500 × 1330 × 800 mm) with anti-corrosive finish.
• **Worksurface:** 25 mm thick industrial wooden board with 2 mm impact-resistant PVC edge.
• **Safety & Power:** Front Emergency Push Stop button, 2-Pole MCB circuit protection, 4 multi-format AC sockets, and low-noise active cooling fan.
• **Mobility & Storage:** Fixed smooth-glide drawer unit and lockable heavy-duty caster wheels.
• **Customization:** 100% customizable front panel and instrument loadout for college labs, defense, R&D, and production.

👉 [View Smart Work Bench Details](/products/electronic-smart-work-station)  
👉 [Generate Official Quote on WhatsApp](https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20need%20a%20formal%20quotation%20for%20the%20Smart%20Work%20Bench%20Station.)`;
  }

  // 7. General Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/i.test(p)) {
    return `Hello! Welcome to **SRTRONIX Instruments** 24/7 AI Assistance.

I can help you right now with:
• **Answer Customer Questions 24/7:** Company details, warranty, delivery, and service.
• **Recommend Electronic Instruments:** Tailored for colleges, field maintenance, or R&D.
• **Explain Product Specifications:** Bandwidth, sample rate, True RMS, ripple/noise.
• **Generate Instant Quotations:** Based on approved list pricing with 18% GST.
• **Collect Customer Enquiries:** Send your RFQ directly to our sales team.
• **Connect to WhatsApp:** Fast 1-click contact with our engineering desk (+91 70224 29004).

How may I assist you today?`;
  }

  // Default Fallback
  return `Thank you for contacting **SRTRONIX Instruments**.

We are happy to assist you 24/7. Here are quick ways I can help:
1. **Instrument Recommendations:** Tell me your application (education, field work, R&D) and budget.
2. **Generate Proforma Quotation:** Ask me for a quotation on any of our 11 catalog instruments.
3. **Product Specifications:** Ask for clarification on bandwidth, sample rate, or linear supply ripple.
4. **Collect Enquiry:** Switch to the **"📝 Send Enquiry"** tab above to request a formal call.
5. **Direct WhatsApp Support:** [Connect on WhatsApp (+91 70224 29004)](https://wa.me/917022429004).

What product or measurement parameter would you like to explore?`;
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
              temperature: 0.2,
              maxOutputTokens: 900,
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
            temperature: 0.2,
            max_tokens: 900,
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

    // High-performance built-in SRTRONIX Engineering Knowledge & Quotation Engine
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
