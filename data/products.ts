import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'electronic-smart-work-station',
    slug: 'electronic-smart-work-station',
    name: 'Smart Work Bench Station',
    category: 'Smart Workbench Systems',
    badge: 'Flagship System',
    featured: true,
    inCatalogPreview: true,
    shortDescription:
      'Completely integrated and customizable laboratory workstation with built-in instrumentation.',
    description:
      'Introducing the completely customizable SRTRONIX Smart Work Bench Station, meticulously crafted from durable M.S. with powder coating. Features a 25mm thick wooden board, fixed drawer units, caster wheels, emergency push button, 2-pole MCB, and exhaust fan. Includes an Oscilloscope, DC Power Supply, Digital Multimeter, LCR Meter, and Transistor Tester. Perfect for education, research, and professional testing.',
    image: '/assets/SRTRONIX Smart Workbench Station.png',
    keySpecs: [
      { label: 'Customization', value: 'Completely Customizable' },
      { label: 'Frame & Build', value: 'M.S. Powder-Coated, 1500 × 1330 × 800 mm' },
      { label: 'Worksurface', value: '25 mm Wooden Board with 2 mm PVC Edge' },
      { label: 'Integrated Gear', value: 'Oscilloscope, DC Supply, DMM, LCR, Tester' },
      { label: 'Power & Safety', value: '4 AC Sockets, Emergency Stop, 2-Pole MCB' },
    ],
    fullSpecs: [
      {
        category: 'Physical Construction',
        items: [
          { label: 'Frame Material', value: 'Heavy Duty Mild Steel (M.S.)' },
          { label: 'Finish', value: 'Anti-corrosive Powder Coating' },
          { label: 'Dimensions', value: '1500 mm (W) × 1330 mm (H) × 800 mm (D)' },
          { label: 'Table Top', value: '25 mm thick industrial grade wooden board' },
          { label: 'Edge Banding', value: '2 mm impact-resistant PVC edge' },
          { label: 'Storage', value: 'Fixed smooth-glide drawer unit' },
          { label: 'Mobility', value: 'Heavy-duty caster wheels with foot-operated locks' },
        ],
      },
      {
        category: 'Integrated Instrumentation',
        items: [
          { label: 'Digital Oscilloscope', value: 'Integrated Dual-Channel Benchtop Unit' },
          { label: 'DC Power Supply', value: 'Variable regulated precision linear DC supply' },
          { label: 'Digital Multimeter', value: 'High precision multi-range digital measurement panel' },
          { label: 'LCR Meter', value: 'Component impedance & inductance/capacitance tester' },
          { label: 'Transistor Tester', value: 'Dedicated semiconductor / component check module' },
        ],
      },
      {
        category: 'Safety & Electrical',
        items: [
          { label: 'Protection', value: '2-Pole Miniature Circuit Breaker (MCB)' },
          { label: 'Emergency Controls', value: 'Prominent front emergency push stop button' },
          { label: 'Power Outlets', value: '4 × Multi-format AC power sockets' },
          { label: 'Thermal Management', value: 'Low-noise active exhaust cooling fan' },
        ],
      },
    ],
    features: [
      'Engineered & assembled in India with high-precision fabrication',
      'All-in-one console eliminates lab clutter and individual instrument wiring',
      'Fully modular front panel tailored to institutional or R&D requirements',
      'Industrial-grade ergonomic height and generous depth for complex prototyping',
      'Heavy-duty lockable caster wheels allow easy laboratory layout reconfiguration',
    ],
    applications: [
      'Electronics Engineering Universities & Poly-technical Labs',
      'Embedded Systems & IoT Hardware R&D Facilities',
      'Production QA, Repair, and Precision Calibration Benches',
      'Defense, Aerospace & Industrial Automation Workshops',
    ],
  },
  {
    id: 'handheld-oscilloscope-hds272s',
    slug: 'handheld-oscilloscope-hds272s',
    name: 'Handheld Oscilloscope HDS272S',
    category: 'Oscilloscopes',
    badge: 'Field Ready',
    featured: true,
    inCatalogPreview: true,
    shortDescription:
      'Portable dual-channel oscilloscope and 20,000-count DMM with up to 6 hours battery life.',
    description:
      'Sleek, multi-functional handheld field tool combining a 70MHz dual-channel oscilloscope with a high-accuracy 20,000-count digital multimeter. Engineered with a rechargeable lithium-ion battery for up to 6 hours of testing on location.',
    image: '/assets/images/handheld_oscilloscope.png',
    keySpecs: [
      { label: 'Bandwidth', value: '70 MHz Dual-Channel' },
      { label: 'Multimeter', value: '20,000 Counts True RMS' },
      { label: 'Battery Life', value: 'Up to 6 Hours Lithium-ion' },
      { label: 'Display', value: '3.5-inch Color LCD' },
    ],
    fullSpecs: [
      {
        category: 'Oscilloscope Specifications',
        items: [
          { label: 'Bandwidth', value: '70 MHz' },
          { label: 'Channels', value: '2 Channels' },
          { label: 'Real-time Sample Rate', value: '250 MSa/s (Dual), 125 MSa/s (Single)' },
          { label: 'Record Length', value: '8K points' },
          { label: 'Waveform Refresh Rate', value: '10,000 wfms/s' },
          { label: 'Vertical Resolution', value: '8 bits' },
          { label: 'Input Coupling', value: 'DC, AC, GND' },
        ],
      },
      {
        category: 'Digital Multimeter',
        items: [
          { label: 'Max Display', value: '20,000 Counts' },
          { label: 'Testing Functions', value: 'Voltage, Current, Resistance, Capacitance, Diode, Continuity' },
          { label: 'Max Input Voltage', value: 'AC 750V, DC 1000V' },
          { label: 'Max Input Current', value: 'DC 10A, AC 10A' },
        ],
      },
      {
        category: 'General & Power',
        items: [
          { label: 'Battery', value: 'Dual 18650 standard cells (rechargeable)' },
          { label: 'Interface', value: 'USB Type-C (supports power bank charging & PC communication)' },
          { label: 'Dimensions', value: '198 × 96 × 38 mm' },
          { label: 'Weight', value: 'Approx. 0.6 kg' },
        ],
      },
    ],
    features: [
      'Multifunctional 3-in-1 tool: Dual-channel Scope, 20,000-count DMM, and Signal Generator',
      'Ultra-low power design with convenient USB-C fast charging from any laptop or power bank',
      'Self-calibration function ensures ongoing accuracy in harsh field environments',
      'One-touch automatic cursor measurements and mathematical functions',
    ],
    applications: [
      'Field service maintenance and on-site industrial machinery troubleshooting',
      'Automotive electronics diagnostics and sensor signal verification',
      'Field solar/wind inverter inspections and renewable energy sites',
    ],
  },
  {
    id: 'dc-power-supply-mps-200',
    slug: 'dc-power-supply-mps-200',
    name: 'DC Power Supply MPS-200',
    category: 'DC Power Supplies',
    badge: 'High Precision',
    featured: true,
    inCatalogPreview: true,
    shortDescription:
      'High-accuracy program-controlled linear DC power supply with up to 30V/6A and 180W max output.',
    description:
      'High-accuracy, program-controlled linear DC power supply providing up to 30V/6A with a maximum output of 180W. Built with fine adjustment keys, over-protection circuitry, and a clear multi-line digital LED panel.',
    image: '/assets/images/dc_power_supply.png',
    keySpecs: [
      { label: 'Output Range', value: '0–30V / 0–6A' },
      { label: 'Maximum Power', value: '180W' },
      { label: 'Resolution', value: '1mV / 0.1mA' },
      { label: 'Panel', value: 'Multi-Line Digital LED' },
    ],
    fullSpecs: [
      {
        category: 'Output Parameters',
        items: [
          { label: 'Voltage Range', value: '0 to 30 V continuously adjustable' },
          { label: 'Current Range', value: '0 to 6 A continuously adjustable' },
          { label: 'Output Power', value: '180 W Maximum' },
          { label: 'Line Regulation', value: 'Voltage: ≤ 0.01% + 3mV | Current: ≤ 0.01% + 3mA' },
          { label: 'Load Regulation', value: 'Voltage: ≤ 0.01% + 3mV | Current: ≤ 0.01% + 3mA' },
          { label: 'Ripple & Noise', value: '≤ 2mVrms / ≤ 3mArms' },
        ],
      },
      {
        category: 'Controls & Protection',
        items: [
          { label: 'Programming Resolution', value: '1 mV / 0.1 mA' },
          { label: 'Safety Protections', value: 'OVP (Over Voltage), OCP (Over Current), OTP (Over Temperature)' },
          { label: 'Cooling', value: 'Intelligent temperature-controlled silent cooling fan' },
          { label: 'Memory Storage', value: 'Pre-set memory recall for common testing profiles' },
        ],
      },
    ],
    features: [
      'Linear topology delivering ultra-low noise clean output for sensitive analog designs',
      'Dual-encoder digital coarse and fine rotary controls for effortless millivolt dial-in',
      'High-contrast multi-line LED readout shows simultaneous voltage, current, and wattage',
      'Rugged front binding posts and isolated chassis ground for maximum operator safety',
    ],
    applications: [
      'Precision analog & RF circuit biasing and power integrity analysis',
      'Semiconductor prototyping, LED driver qualification, and sensor evaluation',
      'Educational engineering teaching stations and test bench validation',
    ],
  },
  {
    id: 'bench-oscilloscope-sds1102',
    slug: 'bench-oscilloscope-sds1102',
    name: 'Bench Oscilloscope SDS1102',
    category: 'Oscilloscopes',
    badge: 'Popular Lab Standard',
    inCatalogPreview: true,
    shortDescription:
      'Professional dual-channel digital storage oscilloscope with 100MHz bandwidth and 1GS/s real-time sampling.',
    description:
      'Professional dual-channel digital storage oscilloscope with 100MHz bandwidth and 1GS/s real-time sampling rate. Features a crisp 7-inch LCD screen, high record length, multiple trigger modes, and USB connectivity for easy lab data logging.',
    image: '/assets/images/benchtop_oscilloscope.png',
    keySpecs: [
      { label: 'Bandwidth', value: '100 MHz Dual-Channel' },
      { label: 'Sample Rate', value: '1 GS/s Real-time' },
      { label: 'Record Length', value: '10K points' },
      { label: 'Display', value: '7-inch High-Resolution Color LCD' },
    ],
    fullSpecs: [
      {
        category: 'Horizontal System',
        items: [
          { label: 'Bandwidth', value: '100 MHz' },
          { label: 'Channels', value: '2 Channels' },
          { label: 'Sample Rate', value: '1 GS/s Real-time' },
          { label: 'Record Length', value: '10K points' },
          { label: 'Time Base Range', value: '2 ns/div – 100 s/div, step by 1-2-5' },
        ],
      },
      {
        category: 'Vertical System',
        items: [
          { label: 'A/D Converter', value: '8-bit resolution (2 channels simultaneously)' },
          { label: 'Vertical Sensitivity', value: '5 mV/div – 5 V/div (at input BNC)' },
          { label: 'Trigger Types', value: 'Edge, Video, Pulse, Slope' },
          { label: 'Mathematical Operations', value: '+, -, ×, ÷, Invert, FFT' },
        ],
      },
      {
        category: 'Connectivity & Display',
        items: [
          { label: 'Display', value: '7-inch color TFT LCD (800 × 480 pixels)' },
          { label: 'Interface', value: 'USB Host (Thumb Drive) & USB Device (PC Connection)' },
          { label: 'SCPI Support', value: 'Full standard SCPI protocol command set' },
        ],
      },
    ],
    features: [
      'Ultra-thin slimline body design taking minimal lab workbench depth',
      '30 automated measurement parameters with intuitive single-button execution',
      'Comprehensive FFT frequency domain analysis with multiple window functions',
      'Pass/Fail testing function suitable for factory production inspection',
    ],
    applications: [
      'Electronic circuit debug, microcontroller bus timing, and signal integrity',
      'Higher education physics and electrical engineering student training',
      'Industrial equipment repair and commercial electronics QA',
    ],
  },
  {
    id: 'tablet-oscilloscope-tao3000',
    slug: 'tablet-oscilloscope-tao3000',
    name: 'Tablet Oscilloscope TAO3000',
    category: 'Oscilloscopes',
    badge: 'Touchscreen Lab',
    inCatalogPreview: true,
    shortDescription:
      '4-channel tablet digital storage oscilloscope featuring 8-inch multi-touch display and Wi-Fi.',
    description:
      'Sleek, 4-channel tablet digital storage oscilloscope featuring a large 8-inch multi-touch display. Supports 100MHz bandwidth, 1GS/s sampling rate, and built-in Wi-Fi module for remote mobile control.',
    image: '/assets/about_pin_ultra_hd.jpg',
    keySpecs: [
      { label: 'Bandwidth', value: '100 MHz, 4-Channel' },
      { label: 'Screen', value: '8-inch Multi-touch Capacitive' },
      { label: 'Memory Depth', value: '40M points' },
      { label: 'Sample Rate', value: '1 GS/s' },
    ],
    fullSpecs: [
      {
        category: 'Acquisition & Channels',
        items: [
          { label: 'Bandwidth', value: '100 MHz' },
          { label: 'Channels', value: '4 Analog Channels' },
          { label: 'Sample Rate', value: '1 GS/s' },
          { label: 'Record Depth', value: '40M points' },
          { label: 'Waveform Capture Rate', value: '45,000 wfms/s' },
          { label: 'Vertical Resolution', value: '8-bit / 14-bit hardware options' },
        ],
      },
      {
        category: 'Interactive & Connectivity',
        items: [
          { label: 'Display Screen', value: '8-inch TFT LCD (800 × 600 pixels) Multi-touch' },
          { label: 'Wireless Networking', value: 'Integrated 802.11 b/g/n Wi-Fi module' },
          { label: 'Ports', value: 'USB Host, USB Device, LAN, HDMI output' },
          { label: 'Battery Capacity', value: '8000 mAh rechargeable Li-ion pack (up to 5 hours)' },
        ],
      },
    ],
    features: [
      'Pinch-to-zoom multi-touch gesture control eliminates tedious knob-spinning',
      'Built-in decoding for I2C, SPI, RS232/UART, and CAN serial bus protocols',
      'Remote wireless control via iOS, Android, and Windows companion software',
      'Compact tablet form with foldable kickstand for both bench and field operations',
    ],
    applications: [
      'Complex multi-channel embedded microcontrollers and robotics prototyping',
      'Automotive CAN bus packet sniffing and diagnostics',
      'Cleanroom and isolated research environments requiring remote Wi-Fi viewing',
    ],
  },
  {
    id: 'waveform-generator-ag4151',
    slug: 'waveform-generator-ag4151',
    name: 'Waveform Generator AG4151',
    category: 'Waveform Generators',
    badge: 'DDS Synthesis',
    inCatalogPreview: true,
    shortDescription:
      'Arbitrary waveform generator with direct digital synthesis up to 150MHz and 400MS/s.',
    description:
      'Professional arbitrary waveform generator featuring direct digital synthesis (DDS) technology. Outputs sine, square, ramp, pulse, and noise waves up to 150MHz with high frequency resolution.',
    image: '/assets/images/waveform_generator.png',
    keySpecs: [
      { label: 'Bandwidth', value: '150 MHz Maximum Frequency' },
      { label: 'Sample Rate', value: '400 MS/s' },
      { label: 'Channels', value: '1 Channel Output' },
      { label: 'Vertical Resolution', value: '14 bits' },
    ],
    fullSpecs: [
      {
        category: 'Waveform Characteristics',
        items: [
          { label: 'Max Output Frequency', value: '150 MHz' },
          { label: 'Sample Rate', value: '400 MS/s' },
          { label: 'Vertical Resolution', value: '14 bits' },
          { label: 'Arbitrary Waveform Length', value: 'Up to 1M points' },
          { label: 'Waveform Types', value: 'Sine, Square, Ramp, Pulse, Noise, 45 built-in arb waveforms' },
        ],
      },
      {
        category: 'Modulation & Controls',
        items: [
          { label: 'Modulation Modes', value: 'AM, FM, PM, FSK, PWM, Sweep, Burst' },
          { label: 'Frequency Resolution', value: '1 μHz' },
          { label: 'Harmonic Distortion', value: '≤ -55 dBc (typical)' },
          { label: 'Hardware Counter', value: 'Built-in 200 MHz 6-digit frequency counter' },
        ],
      },
    ],
    features: [
      'Advanced DDS technology yields pristine, low-jitter periodic waveforms',
      'Extensive built-in mathematical, medical, and audio arbitrary waveform libraries',
      'PC arbitrary waveform editing software via USB connection',
      'Full protection against output short-circuits and back-EMF',
    ],
    applications: [
      'Filter and amplifier frequency response testing',
      'Sensor emulation and clock generation in digital system development',
      'Academic research in signal processing and RF communication modules',
    ],
  },
  {
    id: 'clamp-multimeter-cm2100b',
    slug: 'clamp-multimeter-cm2100b',
    name: 'Clamp Multimeter CM2100B',
    category: 'Multimeters',
    badge: 'True RMS',
    shortDescription:
      'Digital clamp meter for non-contact AC/DC current measurements with 20,000-count resolution.',
    description:
      'Sleek, highly reliable digital clamp meter for non-contact AC/DC current measurements. Features a 20,000-count high-resolution display, True RMS calculations, and standard multimeter probes.',
    image: '/assets/images/clamp_meter.png',
    keySpecs: [
      { label: 'Current Range', value: '0.1A to 100A AC/DC' },
      { label: 'Display Count', value: '20,000 Count' },
      { label: 'Safety Rating', value: 'CAT III 300V' },
      { label: 'Measurement', value: 'True RMS' },
    ],
    fullSpecs: [
      {
        category: 'Measurement Capabilities',
        items: [
          { label: 'AC/DC Current', value: '0.1 A to 100 A non-contact clamp' },
          { label: 'Resolution', value: '1 mA on lower ranges' },
          { label: 'AC/DC Voltage', value: '0.1 mV to 600 V via test leads' },
          { label: 'Resistance Range', value: '0.1 Ω to 20 MΩ' },
          { label: 'Capacitance Range', value: '1 pF to 20 mF' },
          { label: 'Frequency Range', value: '10 Hz to 20 MHz' },
        ],
      },
      {
        category: 'Physical & Ergonomics',
        items: [
          { label: 'Jaw Opening', value: '17 mm slim jaw design for tight conduit bundles' },
          { label: 'Display', value: 'Backlit 20,000-count LCD with analog bargraph' },
          { label: 'Safety Standard', value: 'IEC 61010 CAT III 300V / CAT II 600V' },
          { label: 'Features', value: 'Data Hold, Max/Min, Zero Calibration button' },
        ],
      },
    ],
    features: [
      'High-resolution non-contact clamp measurement down to 1 milliamp current draw',
      'True RMS calculation guarantees accurate readings on nonlinear variable-speed drives',
      'Ultra-compact form factor fits easily into tool pouches and crowded breaker panels',
      'Integrated LED worklight illuminates dark junction boxes during night service',
    ],
    applications: [
      'Industrial electrical panel inspection and phase balancing',
      'HVAC motor start-up and compressor draw testing',
      'Automotive parasitic battery drain investigations',
    ],
  },
  {
    id: '3-in-1-power-supply-spm3103',
    slug: '3-in-1-power-supply-spm3103',
    name: '3-in-1 Power Supply SPM3103',
    category: 'DC Power Supplies',
    badge: '3-in-1 Lab',
    shortDescription:
      'Laboratory instrument combining a 30V/10A/300W DC supply, 4.5-digit DMM, and component tester.',
    description:
      'Multi-functional laboratory instrument combining a 30V/10A/300W DC power supply, a high-accuracy 4.5-digit multimeter, and a component tester. Perfect for compact workbench spaces.',
    image: '/assets/images/power_supply_multimeter_spm.jpg',
    keySpecs: [
      { label: 'Output Range', value: '0–30V / 0–10A' },
      { label: 'Power', value: '300W Output' },
      { label: 'Multimeter', value: '4.5-Digit DMM' },
      { label: 'Architecture', value: '3-in-1 Combo Lab' },
    ],
    fullSpecs: [
      {
        category: 'Power Supply Specifications',
        items: [
          { label: 'Output Voltage', value: '0 to 30 V continuously regulated' },
          { label: 'Output Current', value: '0 to 10 A continuously regulated' },
          { label: 'Total Power', value: '300 Watts maximum continuous output' },
          { label: 'Resolution', value: '10 mV / 1 mA' },
        ],
      },
      {
        category: 'Integrated Multimeter & Tester',
        items: [
          { label: 'DMM Digits', value: '4.5 Digits (up to 20,000 counts)' },
          { label: 'Parameters', value: 'DC/AC Voltage, DC/AC Current, Resistance, Capacitance' },
          { label: 'Component Tester', value: 'Diode voltage drop, Continuity buzzer' },
          { label: 'Chassis Form', value: 'Compact benchtop space-saving enclosure' },
        ],
      },
    ],
    features: [
      'Consolidates three essential bench instruments into a single space-saving chassis',
      'Simultaneous power injection and circuit feedback current monitoring',
      'Smart thermal fan speed control ensures quiet lab bench environment',
      'Over-voltage and over-current fast tripping protection safeguards sensitive prototype ICs',
    ],
    applications: [
      'Space-constrained student engineering workstations',
      'Consumer electronics repair, PCB rework, and micro-soldering labs',
      'Rapid prototype validation and sensor powering',
    ],
  },
  {
    id: 'owon-lcr2000-series-lcr-meter',
    slug: 'owon-lcr2000-series-lcr-meter',
    name: 'OWON LCR2000 Series LCR Meter',
    category: 'LCR Meters',
    badge: '0.05% Accuracy',
    shortDescription:
      'High-accuracy LCR meter with 0.05% basic accuracy, 3.5-inch color LCD, and 40 times/sec speed.',
    description:
      'High-accuracy OWON LCR2000 Series LCR Meter with 0.05% basic accuracy and consecutive test frequency. Features a 3.5-inch color LCD, measuring speed up to 40 times per second, 9-range testing with auto/lock/nominal, DCR measurement, internal D.C. bias voltage (±2.5V), and full SCPI/ModbusRTU support via RS-232C and USB.',
    image: '/assets/images/lcr2000_series.png',
    keySpecs: [
      { label: 'Basic Accuracy', value: '0.05%' },
      { label: 'Measuring Speed', value: 'Up to 40 times/sec' },
      { label: 'Interface', value: 'RS-232C, USB, Handler' },
      { label: 'Screen', value: '3.5-inch Color LCD' },
    ],
    fullSpecs: [
      {
        category: 'Measurement Specs',
        items: [
          { label: 'Basic Accuracy', value: '0.05% high-precision reference' },
          { label: 'Test Frequencies', value: 'Consecutively adjustable up to 100 kHz/200 kHz' },
          { label: 'Measurement Speed', value: 'Fast (40 times/sec), Med (10 times/sec), Slow (3 times/sec)' },
          { label: 'Parameters Measured', value: 'L, C, R, |Z|, |Y|, D, Q, θ(deg), θ(rad), ESR, DCR' },
          { label: 'Range Control', value: '9 ranges, Auto / Lock / Nominal' },
          { label: 'Internal DC Bias', value: '-2.5 V to +2.5 V programmable' },
        ],
      },
      {
        category: 'Automation & Interfaces',
        items: [
          { label: 'Display', value: '3.5-inch Color TFT LCD with primary & secondary readouts' },
          { label: 'Sorting / Comparator', value: 'Bin sorting with pass/fail beeper and visual indicators' },
          { label: 'System Interfaces', value: 'RS-232C, USB Device, USB Host, Handler interface for pick-and-place' },
          { label: 'Protocols', value: 'Standard SCPI & Modbus-RTU commands' },
        ],
      },
    ],
    features: [
      'Exceptional 0.05% basic accuracy meets demanding component qualification standards',
      'Comprehensive handler interface enables seamless automated production line sorting',
      'Continuous frequency tuning without stepping restrictions for resonant frequency tracking',
      'Built-in DCR measurement allows comprehensive passive component characterization',
    ],
    applications: [
      'Incoming component inspection and automated reel sorting for assembly lines',
      'Passive component (inductors, high-Q capacitors, ferrite beads) R&D',
      'Material dielectric and magnetic permeability laboratory experiments',
    ],
  },
  {
    id: 'owon-oel85-series-dc-electronic-load',
    slug: 'owon-oel85-series-dc-electronic-load',
    name: 'OWON OEL85 Series DC Electronic Load',
    category: 'Electronic Loads',
    badge: 'Up to 5kHz Dynamic',
    shortDescription:
      'Programmable DC Electronic Load with 3.9-inch TFT LCD, 4 static modes, and multi-unit parallel up to 4kW.',
    description:
      'High-performance DC Electronic Load featuring a 3.9-inch TFT LCD and up to 5kHz dynamic mode. Offers 4 static modes (CC, CV, CR, CP), comprehensive protection (OVP, OCP, OPP, OTP, Reverse Voltage), and supports multi-unit parallel operation up to 4kW via RS485. Built-in RS232 and USB interfaces with full SCPI protocol support.',
    image: '/assets/images/oel85_series.png',
    keySpecs: [
      { label: 'Resolution', value: '1 mV / 0.1 mA' },
      { label: 'Dynamic Mode', value: 'Up to 5 kHz' },
      { label: 'Protection', value: 'OVP, OCP, OPP, OTP, RV' },
      { label: 'Form Factor', value: '1/2 2U Rack Mount' },
    ],
    fullSpecs: [
      {
        category: 'Loading Capabilities',
        items: [
          { label: 'Operating Modes', value: 'CC (Constant Current), CV (Constant Voltage), CR (Resistance), CP (Power)' },
          { label: 'Dynamic Testing', value: 'Continuous, pulse, and toggle modes up to 5 kHz' },
          { label: 'Resolution', value: '1 mV programming / 0.1 mA readback' },
          { label: 'Parallel Scalability', value: 'Master-slave parallel operation up to 4 kW via RS485' },
        ],
      },
      {
        category: 'Protection & Mechanics',
        items: [
          { label: 'Protections', value: 'Over-Voltage (OVP), Over-Current (OCP), Over-Power (OPP), Over-Temp (OTP), Reverse Voltage' },
          { label: 'Form Factor', value: 'Compact 1/2 2U standard rack-mountable chassis' },
          { label: 'Display Screen', value: '3.9-inch high-clarity color TFT LCD' },
          { label: 'Remote Control', value: 'USB, RS232, RS485 with SCPI command parser' },
        ],
      },
    ],
    features: [
      'High-speed transient dynamic response reveals power supply loop stability issues',
      'Battery discharge test mode logs amp-hour capacity with automatic cut-off thresholds',
      'Short-circuit simulation mode tests power converter foldback recovery without damage',
      'Half-rack 2U dimension allows dual units mounted side-by-side in standard 19" racks',
    ],
    applications: [
      'DC-DC converters, server power supplies, and solar inverter stress testing',
      'Lithium battery pack capacity, cycle life, and thermal characterization',
      'EV onboard charging subsystems and aerospace electrical load simulation',
    ],
  },
  {
    id: 'owon-owh9800-series-power-meter',
    slug: 'owon-owh9800-series-power-meter',
    name: 'OWON OWH9800 Series Power Meter',
    category: 'Power Meters',
    badge: '63rd Harmonic Analysis',
    shortDescription:
      'Two-channel digital power meter (CH1 AC, CH2 AC/DC) with 3.95-inch TFT LCD and dynamic trend displays.',
    description:
      'Advanced Two-channel Digital Power Meter (CH1 AC, CH2 AC/DC) with a clear 3.95-inch TFT LCD. Supports single/three-phase measurements, harmonic analysis up to the 63rd order, and trend waveform display for dynamic parameters. Features RS232 interface with full SCPI and Modbus protocol support.',
    image: '/assets/images/owh9800_series.png',
    keySpecs: [
      { label: 'Inputs', value: 'CH1 AC / CH2 AC/DC' },
      { label: 'Accuracy', value: '±0.5% Basic Accuracy' },
      { label: 'Analytics', value: '63rd Harmonics, 16 Parameters' },
      { label: 'Display', value: '3.95-inch TFT LCD' },
    ],
    fullSpecs: [
      {
        category: 'Channels & Range',
        items: [
          { label: 'Input Channels', value: 'CH1: AC Dedicated | CH2: Universal AC/DC' },
          { label: 'Basic Accuracy', value: '±0.5% of reading + 0.1% of range' },
          { label: 'Voltage Range', value: '15 V to 600 V RMS' },
          { label: 'Current Range', value: '5 mA to 50 A direct input RMS' },
          { label: 'Bandwidth', value: 'DC, 45 Hz to 10 kHz' },
        ],
      },
      {
        category: 'Analytics & Features',
        items: [
          { label: 'Harmonic Analysis', value: 'FFT breakdown up to the 63rd harmonic order' },
          { label: 'Parameters Computed', value: 'V, I, P, Q, S, PF, Frequency, Phase Angle, Peak Values, THD' },
          { label: 'Trend Display', value: 'Dynamic parameter trend waveform logging over time' },
          { label: 'Data Output', value: 'RS232 interface with SCPI and Modbus protocol compatibility' },
        ],
      },
    ],
    features: [
      'Two independent measurement channels enable simultaneous input-to-output efficiency analysis',
      'In-depth 63rd harmonic evaluation for IEC energy efficiency and power quality compliance',
      'Real-time graphical trending reveals standby power fluctuations and inrush spikes',
      'Integrator function measures Watt-hours (Wh) and Amp-hours (Ah) for consumption audits',
    ],
    applications: [
      'Energy efficiency auditing of household appliances, motors, and lighting drivers',
      'Switch-mode power supply (SMPS) conversion efficiency and PF characterization',
      'Industrial electrical panel power factor correction benchmarking',
    ],
  },
];

export const productCategories: string[] = [
  'All',
  'Smart Workbench Systems',
  'Oscilloscopes',
  'DC Power Supplies',
  'Multimeters',
  'LCR Meters',
  'Electronic Loads',
  'Waveform Generators',
  'Power Meters',
];

export const companyDetails = {
  name: 'SRTRONIX',
  legalName: 'SRTRONIX Instruments Private Limited',
  tagline: 'Lab Instruments & Bench Test Gear',
  shortAbout:
    'Every SRTRONIX instrument is designed, engineered, and assembled in India with meticulous attention to detail, using high-quality components and modern craftsmanship.',
  address: 'Swati Building, 72/2 Main Road, Opp. Singapura Garden, Lakshmipura, Bengaluru, Karnataka - 560013',
  phone: '+91 70224 29004',
  email: 'sales@srtronix.com',
  supportEmail: 'support@srtronix.com',
  workingHours: 'Monday – Saturday: 9:00 AM – 6:30 PM IST',
  country: 'India',
  trustBadge: 'Trusted by 12,000+ Engineers & Labs Worldwide • Rated 4.9/5',
};

