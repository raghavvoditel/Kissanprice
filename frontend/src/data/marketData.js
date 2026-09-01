// Static presentation data for KisanPrice

export const COMMODITIES = [
  { id: 'onion', name: 'Onion', nameMr: 'कांदा', region: 'Nashik / Lasalgaon', unit: 'quintal', localMandi: 'Lasalgaon' },
  { id: 'tomato', name: 'Tomato', nameMr: 'टोमॅटो', region: 'Karnataka', unit: 'quintal', localMandi: 'Kolar' },
  { id: 'apple', name: 'Apple', nameMr: 'सफरचंद', region: 'Himachal Pradesh', unit: 'quintal (box-normalized)', localMandi: 'Shimla (local)' },
  { id: 'banana', name: 'Banana', nameMr: 'केळी', region: 'Tamil Nadu', unit: 'quintal', localMandi: 'Theni' },
  { id: 'turdal', name: 'Tur Dal', nameMr: 'तूर डाळ', region: 'Maharashtra / Karnataka', unit: 'quintal', localMandi: 'Latur' },
];

export const STATES = [
  {
    name: 'Maharashtra',
    nameMr: 'महाराष्ट्र',
    districts: [
      { name: 'Nashik', nameMr: 'नाशिक', towns: ['Lasalgaon', 'Pimpalgaon', 'Nashik City', 'Sinnar'] },
      { name: 'Pune', nameMr: 'पुणे', towns: ['Pune City', 'Junnar', 'Baramati'] },
      { name: 'Solapur', nameMr: 'सोलापूर', towns: ['Solapur City', 'Barshi', 'Pandharpur'] },
      { name: 'Latur', nameMr: 'लातूर', towns: ['Latur City', 'Ausa', 'Udgir'] },
    ],
  },
  {
    name: 'Karnataka',
    nameMr: 'कर्नाटक',
    districts: [
      { name: 'Kolar', nameMr: 'कोलार', towns: ['Kolar Town', 'Malur', 'Bangarpet'] },
      { name: 'Chikkaballapur', nameMr: 'चिक्कबळ्ळापूर', towns: ['Chikkaballapur Town', 'Gauribidanur'] },
      { name: 'Bengaluru Rural', nameMr: 'बंगळूरू ग्रामीण', towns: ['Devanahalli', 'Hoskote'] },
      { name: 'Gulbarga', nameMr: 'गुलबर्गा', towns: ['Kalaburagi', 'Aland'] },
    ],
  },
  {
    name: 'Himachal Pradesh',
    nameMr: 'हिमाचल प्रदेश',
    districts: [
      { name: 'Shimla', nameMr: 'शिमला', towns: ['Shimla City', 'Theog', 'Kotkhai'] },
      { name: 'Solan', nameMr: 'सोलन', towns: ['Parwanoo', 'Solan City'] },
    ],
  },
  {
    name: 'Tamil Nadu',
    nameMr: 'तामिळनाडू',
    districts: [
      { name: 'Theni', nameMr: 'थेनी', towns: ['Theni City', 'Bodinayakanur'] },
      { name: 'Chennai', nameMr: 'चेन्नई', towns: ['Koyambedu'] },
    ],
  },
];

// Returns "Marathi (English)" when a Marathi name exists and mr is selected, else just the English name.
export const localizedName = (item, lang) => {
  if (!item) return '';
  if (lang === 'mr' && item.nameMr) return `${item.nameMr} (${item.name})`;
  return item.name;
};

// Mandi price data per commodity (INR per quintal)
export const MANDI_DATA = {
  onion: [
    { mandi: 'Lasalgaon', distance: 12, min: 1200, modal: 1450, max: 1700, updated: 'Monday' },
    { mandi: 'Pimpalgaon', distance: 28, min: 1150, modal: 1400, max: 1650, updated: 'Monday' },
    { mandi: 'Nashik', distance: 45, min: 1300, modal: 1500, max: 1750, updated: 'Monday' },
    { mandi: 'Pune', distance: 180, min: 1550, modal: 1780, max: 1950, updated: 'Monday' },
    { mandi: 'Solapur', distance: 210, min: 1600, modal: 1850, max: 2050, updated: 'Monday' },
  ],
  tomato: [
    { mandi: 'Kolar', distance: 15, min: 800, modal: 1100, max: 1400, updated: 'Monday' },
    { mandi: 'Chikkaballapur', distance: 40, min: 900, modal: 1200, max: 1500, updated: 'Monday' },
    { mandi: 'Bengaluru (Yeshwanthpur)', distance: 65, min: 1000, modal: 1350, max: 1700, updated: 'Monday' },
  ],
  apple: [
    { mandi: 'Shimla (local)', distance: 20, min: 4500, modal: 5200, max: 6000, updated: 'Monday' },
    { mandi: 'Parwanoo', distance: 90, min: 5000, modal: 5800, max: 6500, updated: 'Monday' },
    { mandi: 'Delhi (Azadpur Mandi)', distance: 340, min: 6200, modal: 7100, max: 7900, updated: 'Monday' },
  ],
  banana: [
    { mandi: 'Theni (production zone)', distance: 10, min: 800, modal: 900, max: 1050, updated: 'Monday' },
    { mandi: 'Chennai', distance: 480, min: 1000, modal: 1150, max: 1300, updated: 'Monday' },
    { mandi: 'Nagpur', distance: 1350, min: 1450, modal: 1600, max: 1750, updated: 'Monday' },
    { mandi: 'Delhi', distance: 2400, min: 1950, modal: 2100, max: 2300, updated: 'Monday' },
  ],
  turdal: [
    { mandi: 'Latur', distance: 8, min: 7000, modal: 7200, max: 7450, updated: 'Monday' },
    { mandi: 'Akola', distance: 210, min: 6850, modal: 7050, max: 7300, updated: 'Monday' },
    { mandi: 'Gulbarga', distance: 180, min: 7100, modal: 7300, max: 7600, updated: 'Monday' },
  ],
};

// Grade multipliers applied to modal price
export const GRADE_MULTIPLIER = { A: 1.0, B: 0.9, C: 0.8 };

// Truck rates (INR per km per quintal)
export const TRUCK_RATES = {
  small: { label: 'Small truck', rate: 2.5 },
  bulk: { label: 'Bulk truck', rate: 1.8 },
};

// 12-month seasonal price data
export const PRICE_TREND = {
  onion: [
    { month: 'Jan', price: 1900 },
    { month: 'Feb', price: 1750 },
    { month: 'Mar', price: 1500 },
    { month: 'Apr', price: 1200, note: 'harvest glut begins' },
    { month: 'May', price: 1100, note: 'seasonal low' },
    { month: 'Jun', price: 1300 },
    { month: 'Jul', price: 1600 },
    { month: 'Aug', price: 1850 },
    { month: 'Sep', price: 2100 },
    { month: 'Oct', price: 2300, note: 'lean-season peak' },
    { month: 'Nov', price: 2000 },
    { month: 'Dec', price: 1950 },
  ],
  tomato: [
    { month: 'Jan', price: 1300 },
    { month: 'Feb', price: 1050 },
    { month: 'Mar', price: 800 },
    { month: 'Apr', price: 950 },
    { month: 'May', price: 1400 },
    { month: 'Jun', price: 1800, note: 'monsoon spike' },
    { month: 'Jul', price: 2100 },
    { month: 'Aug', price: 1500 },
    { month: 'Sep', price: 900 },
    { month: 'Oct', price: 1150 },
    { month: 'Nov', price: 1400 },
    { month: 'Dec', price: 1250 },
  ],
  apple: [
    { month: 'Jan', price: 6800 },
    { month: 'Feb', price: 6500 },
    { month: 'Mar', price: 6200 },
    { month: 'Apr', price: 6400 },
    { month: 'May', price: 6900 },
    { month: 'Jun', price: 7500, note: 'pre-harvest scarcity' },
    { month: 'Jul', price: 7900 },
    { month: 'Aug', price: 6100, note: 'new harvest arrives' },
    { month: 'Sep', price: 5400 },
    { month: 'Oct', price: 5200 },
    { month: 'Nov', price: 5600 },
    { month: 'Dec', price: 6300 },
  ],
  banana: [
    { month: 'Jan', price: 1050 },
    { month: 'Feb', price: 1000 },
    { month: 'Mar', price: 950 },
    { month: 'Apr', price: 1000 },
    { month: 'May', price: 1100 },
    { month: 'Jun', price: 1150 },
    { month: 'Jul', price: 1100 },
    { month: 'Aug', price: 1050 },
    { month: 'Sep', price: 1000 },
    { month: 'Oct', price: 1000 },
    { month: 'Nov', price: 1050 },
    { month: 'Dec', price: 1100 },
  ],
  turdal: [
    { month: 'Jan', price: 7400 },
    { month: 'Feb', price: 7350 },
    { month: 'Mar', price: 7100 },
    { month: 'Apr', price: 6900 },
    { month: 'May', price: 6800 },
    { month: 'Jun', price: 6950 },
    { month: 'Jul', price: 7050 },
    { month: 'Aug', price: 7200 },
    { month: 'Sep', price: 7300 },
    { month: 'Oct', price: 7400 },
    { month: 'Nov', price: 7500 },
    { month: 'Dec', price: 7450 },
  ],
};

// Cold storage facilities
export const COLD_STORAGE = [
  {
    name: 'Lasalgaon Cooperative Cold Store',
    distance: 10,
    cost: 38,
    maxDuration: 8,
    suited: ['onion'],
    note: 'Onion — specialized ventilated storage',
  },
  {
    name: 'Nashik Cold Chain Pvt Ltd',
    distance: 18,
    cost: 45,
    maxDuration: 6,
    suited: ['onion', 'tomato', 'banana'],
    note: 'Onion, general produce',
  },
  {
    name: 'Shimla CAS Facility',
    distance: 22,
    cost: 60,
    maxDuration: 10,
    suited: ['apple'],
    note: 'Apple — Controlled Atmosphere Storage',
  },
  {
    name: 'Latur Warehousing Corp',
    distance: 15,
    cost: 25,
    maxDuration: 12,
    suited: ['turdal'],
    note: 'Tur Dal, pulses',
  },
];

export const SHELF_LIFE = [
  { commodity: 'Onion', life: '4–6 months in ventilated storage' },
  { commodity: 'Apple', life: 'up to 10 months in Controlled Atmosphere storage' },
  { commodity: 'Tur Dal / pulses', life: '12+ months, low spoilage risk — best storage candidate of the group' },
  { commodity: 'Tomato & Banana', life: 'not recommended for extended cold storage — sell fresh, short shelf life' },
];

// Export & Broker Directory
export const EXPORT_BROKERS = [
  {
    commodity: 'Onion',
    broker: 'Maharashtra Agri Exports Co.',
    regions: ['Gulf countries', 'Bangladesh'],
    contact: 'Listed on request',
  },
  {
    commodity: 'Tur Dal / Pulses',
    broker: 'Latur Pulses Traders Association',
    regions: ['Middle East'],
    contact: 'Listed on request',
  },
  {
    commodity: 'Banana',
    broker: 'South India Fresh Exports',
    regions: ['UAE', 'Oman'],
    contact: 'Listed on request',
  },
];

// Helpers
export const formatINR = (n) => {
  const rounded = Math.round(n);
  return rounded.toLocaleString('en-IN');
};
