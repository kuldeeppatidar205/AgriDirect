/**
 * AgriDirect - Mock Data Layer
 * Structured according to MongoDB Document Schemas, RESTful API Payload standards,
 * and Python ML Service prediction output formats for SIH Problem Statement 26033.
 * Team 29: Code Bullet
 */

export const INITIAL_CROPS_COLLECTION = [
  {
    _id: "crop_65a8e101f31a2b001c",
    farmerId: "fpo_nashik_084",
    fpoName: "Sahyadri Farmers Producer Co. Ltd",
    farmerName: "Rameshwar Patil",
    cropName: "Nashik Red Onion",
    category: "Vegetables",
    variety: "Garwa Special (Export Grade)",
    harvestDate: "2026-08-25T00:00:00.000Z",
    quantityKg: 8500,
    minPriceExpectationPerKg: 28.5,
    mandiPricePerKg: 31.0,
    location: {
      address: "Pimpalgaon Baswant, Niphad Taluka, Nashik, Maharashtra 422209",
      state: "Maharashtra",
      district: "Nashik",
      lat: 20.1754,
      lng: 73.9872
    },
    qualityGrade: "A+",
    qualityMetrics: {
      moisturePercent: 11.2,
      foreignMatterPercent: 0.8,
      avgDiameterMm: 55,
      labCertified: true,
      certifyingAgency: "NABL AgriLab Nashik"
    },
    mlInsights: {
      predictedPricePerKg: 34.8,
      priceTrendDeltaPercent: +12.3,
      demandIndex: "High", // 'High' | 'Medium' | 'Low'
      demandScore: 92,
      confidenceScore: 0.94, // 0-1 scale
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: "Immediate - Optimal price peak in 5 days",
      targetMandiRecommendation: "Vashi APMC / Direct Export Hub JNPT"
    },
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80"
    ],
    status: "active", // 'active' | 'in_transit' | 'escrow_locked' | 'sold'
    isVerifiedFPO: true,
    escrowEnabled: true,
    createdViaOfflineSync: false,
    timestamp: "2026-08-28T09:30:00.000Z"
  },
  {
    _id: "crop_65a8e102f31a2b002d",
    farmerId: "fpo_punjab_102",
    fpoName: "Doaba Progressive Agro Federation",
    farmerName: "Gurpreet Singh Sandhu",
    cropName: "Pusa 1121 Basmati Rice",
    category: "Cereals & Grains",
    variety: "Traditional Long Grain Aged",
    harvestDate: "2026-08-20T00:00:00.000Z",
    quantityKg: 14000,
    minPriceExpectationPerKg: 88.0,
    mandiPricePerKg: 92.5,
    location: {
      address: "Nakodar Road, Jalandhar, Punjab 144001",
      state: "Punjab",
      district: "Jalandhar",
      lat: 31.3260,
      lng: 75.5762
    },
    qualityGrade: "A+",
    qualityMetrics: {
      moisturePercent: 12.0,
      foreignMatterPercent: 0.2,
      grainLengthMm: 8.4,
      labCertified: true,
      certifyingAgency: "PAU Quality Assurance Wing"
    },
    mlInsights: {
      predictedPricePerKg: 97.2,
      priceTrendDeltaPercent: +5.1,
      demandIndex: "High",
      demandScore: 89,
      confidenceScore: 0.91,
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: "Hold batch 7 days for bulk B2B exporter demand",
      targetMandiRecommendation: "Khari Baoli Delhi Hub / Mundra Port"
    },
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    ],
    status: "active",
    isVerifiedFPO: true,
    escrowEnabled: true,
    createdViaOfflineSync: false,
    timestamp: "2026-08-27T14:15:00.000Z"
  },
  {
    _id: "crop_65a8e103f31a2b003e",
    farmerId: "fpo_kolar_047",
    fpoName: "Kolar Gold Organic Producers Union",
    farmerName: "Venkatesh Murthy",
    cropName: "Hydroponic Hybrid Tomatoes",
    category: "Vegetables",
    variety: "Shivaji F1 Hybrid Firm",
    harvestDate: "2026-08-29T00:00:00.000Z",
    quantityKg: 6200,
    minPriceExpectationPerKg: 22.0,
    mandiPricePerKg: 24.5,
    location: {
      address: "Bangarapet Highway, Kolar, Karnataka 563101",
      state: "Karnataka",
      district: "Kolar",
      lat: 13.1367,
      lng: 78.1291
    },
    qualityGrade: "A",
    qualityMetrics: {
      moisturePercent: 94.0,
      foreignMatterPercent: 0.5,
      brixDegree: 4.8,
      labCertified: true,
      certifyingAgency: "UAS Bangalore Farm Lab"
    },
    mlInsights: {
      predictedPricePerKg: 27.5,
      priceTrendDeltaPercent: +14.6,
      demandIndex: "High",
      demandScore: 95,
      confidenceScore: 0.96,
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: "Dispatch in 24 hrs to prevent shelf loss",
      targetMandiRecommendation: "K.R. Market & Retail Chain Warehouses Bengaluru"
    },
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
    ],
    status: "active",
    isVerifiedFPO: true,
    escrowEnabled: true,
    createdViaOfflineSync: false,
    timestamp: "2026-08-29T08:00:00.000Z"
  },
  {
    _id: "crop_65a8e104f31a2b004f",
    farmerId: "fpo_indore_033",
    fpoName: "Malwa Krishi Vikas Sangathan",
    farmerName: "Devendra Singh Rajput",
    cropName: "Sharbati Golden Wheat",
    category: "Cereals & Grains",
    variety: "Sehore Premium Lustrous",
    harvestDate: "2026-08-15T00:00:00.000Z",
    quantityKg: 22000,
    minPriceExpectationPerKg: 38.0,
    mandiPricePerKg: 39.2,
    location: {
      address: "Sanwer Road Industrial Area, Indore, Madhya Pradesh 452015",
      state: "Madhya Pradesh",
      district: "Indore",
      lat: 22.7196,
      lng: 75.8577
    },
    qualityGrade: "A+",
    qualityMetrics: {
      moisturePercent: 10.5,
      foreignMatterPercent: 0.3,
      proteinContent: 13.8,
      labCertified: true,
      certifyingAgency: "MP State Seeds & Quality Corp"
    },
    mlInsights: {
      predictedPricePerKg: 42.0,
      priceTrendDeltaPercent: +7.1,
      demandIndex: "Medium",
      demandScore: 78,
      confidenceScore: 0.88,
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: "Ideal warehouse storage condition for premium bulk trade",
      targetMandiRecommendation: "Indore Chhavani Mandi / ITC Choupal Hub"
    },
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    ],
    status: "active",
    isVerifiedFPO: true,
    escrowEnabled: true,
    createdViaOfflineSync: false,
    timestamp: "2026-08-26T11:20:00.000Z"
  },
  {
    _id: "crop_65a8e105f31a2b005a",
    farmerId: "fpo_ratnagiri_019",
    fpoName: "Konkan Mango Growers Cooperative",
    farmerName: "Subhash Sawant",
    cropName: "Devgad Alphonso Mango (GI Tagged)",
    category: "Fruits",
    variety: "Export Grade Pure Devgad Hapus",
    harvestDate: "2026-08-28T00:00:00.000Z",
    quantityKg: 3500,
    minPriceExpectationPerKg: 180.0,
    mandiPricePerKg: 195.0,
    location: {
      address: "Devgad Coastal Belt, Sindhudurg, Maharashtra 416613",
      state: "Maharashtra",
      district: "Sindhudurg",
      lat: 16.3768,
      lng: 73.3761
    },
    qualityGrade: "A+",
    qualityMetrics: {
      moisturePercent: 82.0,
      foreignMatterPercent: 0.0,
      brixDegree: 21.5,
      labCertified: true,
      certifyingAgency: "Konkan Krishi Vidyapeeth GI Lab"
    },
    mlInsights: {
      predictedPricePerKg: 215.0,
      priceTrendDeltaPercent: +10.2,
      demandIndex: "High",
      demandScore: 98,
      confidenceScore: 0.97,
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: "Premium export peak window open for 48 hours",
      targetMandiRecommendation: "Mumbai Air Cargo / APEDA Packhouse"
    },
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
    ],
    status: "active",
    isVerifiedFPO: true,
    escrowEnabled: true,
    createdViaOfflineSync: false,
    timestamp: "2026-08-29T16:45:00.000Z"
  },
  {
    _id: "crop_65a8e106f31a2b006b",
    farmerId: "fpo_guntur_091",
    fpoName: "Andhra Spices & Chilly Producers Society",
    farmerName: "Koteswara Rao",
    cropName: "Guntur Sannam Red Chilli (Dry)",
    category: "Spices",
    variety: "S4 Sun-Dried Premium Hot",
    harvestDate: "2026-08-18T00:00:00.000Z",
    quantityKg: 7800,
    minPriceExpectationPerKg: 165.0,
    mandiPricePerKg: 172.0,
    location: {
      address: "Chilli Yard Road, Guntur, Andhra Pradesh 522004",
      state: "Andhra Pradesh",
      district: "Guntur",
      lat: 16.3067,
      lng: 80.4365
    },
    qualityGrade: "A",
    qualityMetrics: {
      moisturePercent: 8.5,
      foreignMatterPercent: 0.8,
      capsaicinSHU: 45000,
      labCertified: true,
      certifyingAgency: "Spices Board India Quality Lab"
    },
    mlInsights: {
      predictedPricePerKg: 184.0,
      priceTrendDeltaPercent: +6.9,
      demandIndex: "Medium",
      demandScore: 76,
      confidenceScore: 0.89,
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: "Dry cold storage stable batch",
      targetMandiRecommendation: "Guntur Asia Biggest Chilli Yard / Chennai Port"
    },
    images: [
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80"
    ],
    status: "active",
    isVerifiedFPO: true,
    escrowEnabled: true,
    createdViaOfflineSync: false,
    timestamp: "2026-08-25T13:10:00.000Z"
  }
];

export const INITIAL_ORDERS_COLLECTION = [
  {
    _id: "ORD-2026-8891A",
    cropId: "crop_65a8e101f31a2b001c",
    cropName: "Nashik Red Onion",
    category: "Vegetables",
    variety: "Garwa Special Grade-1",
    farmerId: "fpo_nashik_084",
    fpoName: "Sahyadri Farmers Producer Co. Ltd",
    farmerName: "Rameshwar Patil",
    farmerPhone: "+91 98220 11482",
    farmerBankUpi: "sahyadri.fpo@sbi",
    buyerId: "buyer_reliance_fresh_771",
    buyerName: "FreshMart Mega Retailers Pvt Ltd",
    buyerGstin: "27AABCF1234F1ZP",
    quantityKg: 4500,
    pricePerKg: 28.5,
    baseCropCost: 128250,
    freightFee: 10125,
    middlemanSavings: 17100,
    platformFee: 641, // 0.5% minimal sustainable fee per Slide 4
    totalEscrowAmount: 139016,
    escrowStatus: "IN_TRANSIT", // 'ESCROW_LOCKED' | 'IN_TRANSIT' | 'DELIVERED_SETTLED'
    paymentStatus: "HELD_IN_TRUST",
    pickupOtp: "8492",
    deliveryOtp: "3177",
    vehicleRegNo: "MH-15-EG-8821",
    driverName: "Sunil Shinde",
    driverPhone: "+91 98231 44521",
    coldChainTempCelsius: 4.2,
    coldChainHumidityPercent: 88,
    deliveryLocation: "Vashi APMC Central Cold Storage, Navi Mumbai",
    createdAt: "2026-08-29T08:15:00.000Z",
    ledgerHash: "0x8f2d9c1e4b7a33e09841f62cb932a901842e77b4d32a10e8c671b58a2d109f4",
    currentStageIndex: 3, // 0: Created, 1: Escrow Locked, 2: Farm Picked Up, 3: Cold Chain In-Transit, 4: Delivered & Settled
    trackingTimeline: [
      { step: 1, title: "Order Placed & Escrow Locked", status: "completed", timestamp: "Aug 29, 08:15 AM", detail: "₹1,39,016 safely debited to RBI-compliant escrow trust." },
      { step: 2, title: "Farmgate QA & Dispatch OTP", status: "completed", timestamp: "Aug 29, 09:30 AM", detail: "NABL certified Grade A+ quality verified at Pimpalgaon." },
      { step: 3, title: "Multi-Stop Fleet Pickup", status: "completed", timestamp: "Aug 29, 10:45 AM", detail: "Loaded 4.5 MT produce onto 14-Ton EV Reefer truck." },
      { step: 4, title: "Cold Chain Corridor Transit", status: "current", timestamp: "En route", detail: "Live GPS tracking at 54 km/h • Chamber Temp 4.2°C • ETA 02:30 PM." },
      { step: 5, title: "Hub Delivery & Instant Settlement", status: "pending", timestamp: "Est. 02:30 PM", detail: "Direct UPI/RTGS release of ₹1,28,250 to farmer account upon OTP verification." }
    ]
  },
  {
    _id: "ORD-2026-7740B",
    cropId: "crop_65a8e103f31a2b003e",
    cropName: "Hydroponic Hybrid Tomatoes",
    category: "Vegetables",
    variety: "Shivaji F1 Hybrid",
    farmerId: "fpo_kolar_047",
    fpoName: "Kolar Gold Organic Producers Union",
    farmerName: "Venkatesh Murthy",
    farmerPhone: "+91 94480 33912",
    farmerBankUpi: "kolargold.union@hdfcbank",
    buyerId: "buyer_bigbasket_992",
    buyerName: "QuickFresh Wholesale Hypermarkets",
    buyerGstin: "29AAACQ9876K1Z1",
    quantityKg: 3000,
    pricePerKg: 22.0,
    baseCropCost: 66000,
    freightFee: 6750,
    middlemanSavings: 11400,
    platformFee: 330,
    totalEscrowAmount: 73080,
    escrowStatus: "DELIVERED_SETTLED",
    paymentStatus: "RELEASED_TO_FARMER",
    pickupOtp: "5512",
    deliveryOtp: "9041",
    vehicleRegNo: "KA-04-MB-4419",
    driverName: "Manjunath Gowda",
    driverPhone: "+91 94481 99120",
    coldChainTempCelsius: 5.1,
    coldChainHumidityPercent: 86,
    deliveryLocation: "Yeshwanthpur B2B Wholesale Market, Bengaluru",
    createdAt: "2026-08-28T06:00:00.000Z",
    settledAt: "2026-08-28T11:45:00.000Z",
    ledgerHash: "0x4a1e90b83c7d6e520182f45ea8910bc4728d1193fe7842a6b0932c1840e69a1",
    currentStageIndex: 4,
    trackingTimeline: [
      { step: 1, title: "Order Placed & Escrow Locked", status: "completed", timestamp: "Aug 28, 06:00 AM", detail: "₹73,080 locked in escrow trust." },
      { step: 2, title: "Farmgate QA & Dispatch OTP", status: "completed", timestamp: "Aug 28, 07:10 AM", detail: "Moisture 94%, Grade A supermarket verified." },
      { step: 3, title: "Multi-Stop Fleet Pickup", status: "completed", timestamp: "Aug 28, 07:45 AM", detail: "Loaded 3.0 MT at Bangarapet Hwy." },
      { step: 4, title: "Cold Chain Corridor Transit", status: "completed", timestamp: "Aug 28, 09:30 AM", detail: "Zero transit damage across 112 km route." },
      { step: 5, title: "Hub Delivery & Instant Settlement", status: "completed", timestamp: "Aug 28, 11:45 AM", detail: "Instant ₹66,000 UPI settlement cleared (RRN #918237192)." }
    ]
  },
  {
    _id: "ORD-2026-6631C",
    cropId: "crop_65a8e102f31a2b002d",
    cropName: "Pusa 1121 Basmati Rice",
    category: "Cereals & Grains",
    variety: "Traditional Long Grain",
    farmerId: "fpo_punjab_102",
    fpoName: "Doaba Progressive Agro Federation",
    farmerName: "Gurpreet Singh Sandhu",
    farmerPhone: "+91 98141 55621",
    farmerBankUpi: "doaba.agro@pnb",
    buyerId: "buyer_itc_agro_108",
    buyerName: "ITC Agri-Business Division",
    buyerGstin: "03AAACI1122D1ZV",
    quantityKg: 10000,
    pricePerKg: 88.0,
    baseCropCost: 880000,
    freightFee: 22500,
    middlemanSavings: 45000,
    platformFee: 4400,
    totalEscrowAmount: 906900,
    escrowStatus: "ESCROW_LOCKED",
    paymentStatus: "HELD_IN_TRUST",
    pickupOtp: "1923",
    deliveryOtp: "7820",
    vehicleRegNo: "PB-08-CX-9901",
    driverName: "Harbhajan Singh",
    driverPhone: "+91 98722 00192",
    coldChainTempCelsius: 18.0,
    coldChainHumidityPercent: 45,
    deliveryLocation: "Khari Baoli Terminal Hub, Delhi",
    createdAt: "2026-08-29T11:00:00.000Z",
    ledgerHash: "0x33b8a1c97e02df598124cc9123b098471e9842a1bc6389a01f5619283e104b7",
    currentStageIndex: 1,
    trackingTimeline: [
      { step: 1, title: "Order Placed & Escrow Locked", status: "completed", timestamp: "Aug 29, 11:00 AM", detail: "₹9,06,900 secured in enterprise escrow account." },
      { step: 2, title: "Farmgate QA & Dispatch OTP", status: "current", timestamp: "Pending QA Scan", detail: "PAU lab certificate verification scheduled." },
      { step: 3, title: "Multi-Stop Fleet Pickup", status: "pending", timestamp: "Est. Tomorrow 08:00 AM", detail: "10 MT bulk dispatch corridor." },
      { step: 4, title: "Cold Chain Corridor Transit", status: "pending", timestamp: "Est. Tomorrow", detail: "Highway corridor direct to Delhi hub." },
      { step: 5, title: "Hub Delivery & Instant Settlement", status: "pending", timestamp: "Est. In 48 hrs", detail: "₹8,80,000 direct transfer upon delivery." }
    ]
  }
];

export const HISTORICAL_VS_PREDICTED_PRICE_TRENDS = {
  "Nashik Red Onion": [
    { date: "Aug 01", mandiPrice: 24.0, predictedPrice: 24.2, directOfferPrice: 27.5 },
    { date: "Aug 07", mandiPrice: 25.5, predictedPrice: 26.0, directOfferPrice: 29.0 },
    { date: "Aug 14", mandiPrice: 27.0, predictedPrice: 27.8, directOfferPrice: 30.5 },
    { date: "Aug 21", mandiPrice: 29.2, predictedPrice: 30.0, directOfferPrice: 32.5 },
    { date: "Aug 28", mandiPrice: 31.0, predictedPrice: 32.4, directOfferPrice: 34.0 },
    { date: "Sep 04 (Forecast)", mandiPrice: 31.8, predictedPrice: 34.8, directOfferPrice: 36.5 },
    { date: "Sep 11 (Forecast)", mandiPrice: 32.5, predictedPrice: 36.2, directOfferPrice: 38.0 }
  ],
  "Pusa 1121 Basmati Rice": [
    { date: "Aug 01", mandiPrice: 85.0, predictedPrice: 86.0, directOfferPrice: 91.0 },
    { date: "Aug 07", mandiPrice: 87.0, predictedPrice: 88.2, directOfferPrice: 93.0 },
    { date: "Aug 14", mandiPrice: 89.5, predictedPrice: 90.0, directOfferPrice: 95.0 },
    { date: "Aug 21", mandiPrice: 91.0, predictedPrice: 92.5, directOfferPrice: 97.0 },
    { date: "Aug 28", mandiPrice: 92.5, predictedPrice: 94.0, directOfferPrice: 99.0 },
    { date: "Sep 04 (Forecast)", mandiPrice: 93.8, predictedPrice: 97.2, directOfferPrice: 102.5 },
    { date: "Sep 11 (Forecast)", mandiPrice: 94.5, predictedPrice: 99.0, directOfferPrice: 105.0 }
  ],
  "Hydroponic Hybrid Tomatoes": [
    { date: "Aug 01", mandiPrice: 18.0, predictedPrice: 18.5, directOfferPrice: 21.0 },
    { date: "Aug 07", mandiPrice: 19.5, predictedPrice: 20.0, directOfferPrice: 23.0 },
    { date: "Aug 14", mandiPrice: 21.0, predictedPrice: 22.0, directOfferPrice: 24.5 },
    { date: "Aug 21", mandiPrice: 23.0, predictedPrice: 24.0, directOfferPrice: 26.5 },
    { date: "Aug 28", mandiPrice: 24.5, predictedPrice: 25.8, directOfferPrice: 28.0 },
    { date: "Sep 04 (Forecast)", mandiPrice: 25.0, predictedPrice: 27.5, directOfferPrice: 30.0 },
    { date: "Sep 11 (Forecast)", mandiPrice: 24.0, predictedPrice: 26.0, directOfferPrice: 28.5 }
  ],
  "Sharbati Golden Wheat": [
    { date: "Aug 01", mandiPrice: 36.0, predictedPrice: 36.2, directOfferPrice: 39.0 },
    { date: "Aug 07", mandiPrice: 37.0, predictedPrice: 37.5, directOfferPrice: 40.0 },
    { date: "Aug 14", mandiPrice: 37.8, predictedPrice: 38.2, directOfferPrice: 41.0 },
    { date: "Aug 21", mandiPrice: 38.5, predictedPrice: 39.0, directOfferPrice: 42.0 },
    { date: "Aug 28", mandiPrice: 39.2, predictedPrice: 40.5, directOfferPrice: 43.5 },
    { date: "Sep 04 (Forecast)", mandiPrice: 40.0, predictedPrice: 42.0, directOfferPrice: 45.0 },
    { date: "Sep 11 (Forecast)", mandiPrice: 40.8, predictedPrice: 43.0, directOfferPrice: 46.0 }
  ]
};

export const DEMAND_FORECAST_CATEGORIES = [
  { name: "Nashik Red Onion", demandIndex: 94, level: "High", trend: "+12.3%", buyersActive: 48, avgB2BQuotePerKg: 33.5, prophetForecastConfidence: 96 },
  { name: "Pusa Basmati Rice", demandIndex: 89, level: "High", trend: "+8.4%", buyersActive: 36, avgB2BQuotePerKg: 96.0, prophetForecastConfidence: 93 },
  { name: "Hybrid Tomatoes", demandIndex: 96, level: "High", trend: "+14.6%", buyersActive: 62, avgB2BQuotePerKg: 27.0, prophetForecastConfidence: 97 },
  { name: "Devgad Alphonso", demandIndex: 98, level: "High", trend: "+10.2%", buyersActive: 54, avgB2BQuotePerKg: 210.0, prophetForecastConfidence: 98 },
  { name: "Sharbati Wheat", demandIndex: 78, level: "Medium", trend: "+4.1%", buyersActive: 28, avgB2BQuotePerKg: 41.5, prophetForecastConfidence: 88 },
  { name: "Guntur Red Chilli", demandIndex: 74, level: "Medium", trend: "+3.8%", buyersActive: 22, avgB2BQuotePerKg: 180.0, prophetForecastConfidence: 89 },
  { name: "Malwa Soyabean", demandIndex: 58, level: "Medium", trend: "-1.2%", buyersActive: 16, avgB2BQuotePerKg: 46.0, prophetForecastConfidence: 82 },
  { name: "Nagpur Oranges", demandIndex: 42, level: "Low", trend: "-5.6%", buyersActive: 9, avgB2BQuotePerKg: 38.0, prophetForecastConfidence: 74 }
];

export const AGMARKNET_LIVE_TERMINAL_FEEDS = [
  { mandiName: "Pimpalgaon APMC (Nashik, MH)", crop: "Onion (Red)", dailyArrivalQuintals: 18450, modalPricePerKg: 31.0, trend: "+₹1.80/kg", status: "Heavy Arrival Peak" },
  { mandiName: "Kolar APMC Yard (Karnataka)", crop: "Tomato (Hybrid)", dailyArrivalQuintals: 9200, modalPricePerKg: 24.5, trend: "+₹2.20/kg", status: "High Demand Velocity" },
  { mandiName: "Khari Baoli Terminal (Delhi)", crop: "Basmati Rice 1121", dailyArrivalQuintals: 6400, modalPricePerKg: 92.5, trend: "+₹1.50/kg", status: "Stable Exporter Buying" },
  { mandiName: "Indore Chhavani Mandi (MP)", crop: "Sharbati Wheat", dailyArrivalQuintals: 14800, modalPricePerKg: 39.2, trend: "+₹0.80/kg", status: "Standard Volume" },
  { mandiName: "Guntur Chilli Yard (AP)", crop: "Red Chilli S4", dailyArrivalQuintals: 5100, modalPricePerKg: 172.0, trend: "+₹3.50/kg", status: "Strong Spices Demand" }
];

export const DISTANCE_TIME_MATRIX_CACHE = [
  { from: "Pimpalgaon Farm (Stop 1)", to: "Niphad Grape Yard (Stop 2)", distanceKm: 18.4, travelTimeMins: 28, cachedInMongo: true },
  { from: "Niphad Grape Yard (Stop 2)", to: "Sinnar Agro Hub (Stop 3)", distanceKm: 34.2, travelTimeMins: 46, cachedInMongo: true },
  { from: "Sinnar Agro Hub (Stop 3)", to: "Bhiwandi Hub (Depot)", distanceKm: 89.6, travelTimeMins: 112, cachedInMongo: true },
  { from: "Bhiwandi Hub (Depot)", to: "Vashi APMC (Terminal)", distanceKm: 41.8, travelTimeMins: 54, cachedInMongo: true }
];

export const OPTIMIZED_LOGISTICS_ROUTES = [
  {
    _id: "route_opt_8892a",
    clusterName: "Western Maharashtra Farm Aggregate Corridor #4",
    status: "dispatched",
    vehicleType: "14-Ton Multi-Axle EV Reefer Truck",
    vehicleRegNo: "MH-15-EG-8821",
    driverName: "Sunil Shinde",
    driverPhone: "+91 98231 44521",
    totalPayloadKg: 11200,
    totalDistanceKm: 184,
    traditionalDistanceKm: 262,
    distanceSavedKm: 78,
    distanceSavedPercent: 29.8,
    estimatedTransitHours: 4.5,
    co2SavedKg: 142.6,
    freightCostOriginal: 16400,
    freightCostOptimized: 11500,
    freightSavingsRupees: 4900,
    savingsPercentage: 29.8,
    vrpSolverAlgorithm: "Google OR-Tools CVRP / Dijkstra Time-Window Solver",
    matrixCached: true,
    depotHub: {
      name: "Bhiwandi Central Agro Fulfillment Hub",
      lat: 19.2969,
      lng: 73.0631,
      address: "Warehouse Complex 12, Mankoli Naka, Bhiwandi"
    },
    destinationHub: {
      name: "Vashi APMC Central Terminal & Cold Storage",
      lat: 19.0759,
      lng: 72.9989,
      address: "Sector 19, Turbhe Vashi, Navi Mumbai"
    },
    pickupWaypoints: [
      {
        stopNumber: 1,
        farmerId: "fpo_nashik_084",
        farmerName: "Rameshwar Patil (Sahyadri FPO)",
        crop: "Nashik Red Onion",
        quantityKg: 4500,
        address: "Pimpalgaon Baswant, Nashik",
        lat: 20.1754,
        lng: 73.9872,
        status: "completed",
        deliveryWindow: "06:00 AM - 08:00 AM",
        etaTime: "07:30 AM",
        actualTime: "07:22 AM",
        otpVerified: true
      },
      {
        stopNumber: 2,
        farmerId: "fpo_niphad_012",
        farmerName: "Dnyaneshwar Shinde",
        crop: "Thompson Seedless Grapes",
        quantityKg: 3200,
        address: "Ozar Airport Road, Niphad",
        lat: 20.0984,
        lng: 73.9142,
        status: "in_progress",
        deliveryWindow: "08:30 AM - 10:00 AM",
        etaTime: "09:15 AM",
        actualTime: "En route",
        otpVerified: false
      },
      {
        stopNumber: 3,
        farmerId: "fpo_sinnar_044",
        farmerName: "Kavita Thorat",
        crop: "Green Capsicum & Tomatoes",
        quantityKg: 3500,
        address: "Musalgaon MIDC, Sinnar",
        lat: 19.8456,
        lng: 73.9967,
        status: "pending",
        deliveryWindow: "10:30 AM - 12:00 PM",
        etaTime: "11:00 AM",
        actualTime: "Scheduled",
        otpVerified: false
      }
    ],
    recommendedRoutePolyline: [
      [20.1754, 73.9872],
      [20.0984, 73.9142],
      [19.8456, 73.9967],
      [19.2969, 73.0631],
      [19.0759, 72.9989]
    ]
  },
  {
    _id: "route_opt_8893b",
    clusterName: "Bengaluru Rural - Kolar Fresh Express Corridor",
    status: "optimizing",
    vehicleType: "7.5-Ton Tata Ultra Reefer",
    vehicleRegNo: "KA-04-MB-4419",
    driverName: "Manjunath Gowda",
    driverPhone: "+91 94481 99120",
    totalPayloadKg: 6800,
    totalDistanceKm: 112,
    traditionalDistanceKm: 158,
    distanceSavedKm: 46,
    distanceSavedPercent: 29.1,
    estimatedTransitHours: 3.2,
    co2SavedKg: 84.2,
    freightCostOriginal: 9800,
    freightCostOptimized: 6950,
    freightSavingsRupees: 2850,
    savingsPercentage: 29.1,
    vrpSolverAlgorithm: "Google OR-Tools CVRP / Dijkstra Time-Window Solver",
    matrixCached: true,
    depotHub: {
      name: "Hoskote Agro Logistics Hub",
      lat: 13.0712,
      lng: 77.7981,
      address: "KIADB Industrial Area, Hoskote"
    },
    destinationHub: {
      name: "Yeshwanthpur B2B Wholesale Market",
      lat: 13.0280,
      lng: 77.5407,
      address: "APMC Yard, Yeshwanthpur, Bengaluru"
    },
    pickupWaypoints: [
      {
        stopNumber: 1,
        farmerId: "fpo_kolar_047",
        farmerName: "Venkatesh Murthy (Kolar Gold FPO)",
        crop: "Hybrid Tomatoes",
        quantityKg: 3800,
        address: "Bangarapet Rd, Kolar",
        lat: 13.1367,
        lng: 78.1291,
        status: "completed",
        deliveryWindow: "05:30 AM - 07:00 AM",
        etaTime: "06:00 AM",
        actualTime: "06:04 AM",
        otpVerified: true
      },
      {
        stopNumber: 2,
        farmerId: "fpo_malur_021",
        farmerName: "Anand Kumar",
        crop: "Baby Corn & French Beans",
        quantityKg: 3000,
        address: "Malur Town Agri Yard",
        lat: 13.0034,
        lng: 77.9421,
        status: "completed",
        deliveryWindow: "07:15 AM - 08:30 AM",
        etaTime: "07:45 AM",
        actualTime: "07:48 AM",
        otpVerified: true
      }
    ],
    recommendedRoutePolyline: [
      [13.1367, 78.1291],
      [13.0034, 77.9421],
      [13.0712, 77.7981],
      [13.0280, 77.5407]
    ]
  }
];

export const PROJECTED_IMPACT_METRICS = [
  { metric: "Farmer Income Boost", value: 20.0, baseline: "15-25% Gain", description: "Boosts net farmer realizations by eliminating middleman markups", color: "#0F5132" },
  { metric: "Consumer Retail Savings", value: 13.0, baseline: "10-15% Drop", description: "Reduces end-consumer prices by trimming multi-tier middleman cuts", color: "#16a34a" },
  { metric: "Logistics Spoilage Cut", value: 20.0, baseline: "Up to 20% Saved", description: "Cuts post-harvest spoilage and transit delays via dynamic routing", color: "#2563eb" }
];

export const MOCK_B2B_BUYER_PROFILE = {
  buyerId: "buyer_reliance_fresh_771",
  companyName: "FreshMart Mega Retailers Pvt Ltd",
  buyerCategory: "Organized Retail Chain / Exporter",
  gstin: "27AABCF1234F1ZP",
  verifiedBuyer: true,
  escrowBalanceRupees: 1540000,
  activePurchaseOrders: 14,
  totalProduceSourcedTons: 420.5
};

export const CROP_CATEGORIES = [
  "All Categories",
  "Vegetables",
  "Cereals & Grains",
  "Fruits",
  "Spices",
  "Pulses & Oilseeds"
];

export const VERNACULAR_TRANSLATIONS = {
  en: {
    fpoDashboard: "FPO / Farmer Portal",
    marketplace: "B2B Marketplace",
    logistics: "Route Optimization",
    ordersLedger: "Digital Ledger & Orders",
    impact: "Impact & Benefits",
    logHarvest: "Log Harvest Batch",
    saveOffline: "Save to Offline Queue",
    registerProduce: "Register Produce Batch & Broadcast",
    smartEscrow: "Smart Escrow",
    liveCloud: "Live Cloud",
    offlineSim: "Offline Sim",
    activeBatches: "Active Batches",
    disintermediationGain: "Disintermediation Gain",
    verifiedFpo: "Verified FPO",
    produceCategory: "Produce Category",
    cropName: "Crop Name & Spec",
    totalWeight: "Total Harvest Weight",
    minPrice: "Min Expected Price (₹/kg)",
    mandiBaseline: "Current Mandi Avg",
    aiForecast: "AI 7-Day Forecast",
    viewReceipt: "View Digital Receipt",
    downloadReceipt: "Download Digital Receipt",
    trackOrder: "Track Live Order",
    settled: "Settled",
    inTransit: "In Transit",
    escrowLocked: "Escrow Locked",
    autoReroute: "Simulate Auto Re-Route",
    matrixCache: "Route Matrix Cache: ACTIVE"
  },
  hi: {
    fpoDashboard: "किसान / एफपीओ पोर्टल",
    marketplace: "थोक खरीदार बाज़ार",
    logistics: "स्मार्ट मार्ग अनुकूलन",
    ordersLedger: "डिजिटल बहीखाता और ऑर्डर",
    impact: "सकारात्मक प्रभाव और लाभ",
    logHarvest: "फसल लॉट दर्ज करें",
    saveOffline: "ऑफ़लाइन कतार में सहेजें",
    registerProduce: "फसल पंजीकृत करें और प्रसारित करें",
    smartEscrow: "स्मार्ट एस्क्रो (सुरक्षित भुगतान)",
    liveCloud: "लाइव क्लाउड",
    offlineSim: "ऑफ़लाइन मोड",
    activeBatches: "सक्रिय फसल लॉट",
    disintermediationGain: "बिचौलिया बचत लाभ",
    verifiedFpo: "सत्यापित एफपीओ",
    produceCategory: "फसल श्रेणी",
    cropName: "फसल का नाम और विवरण",
    totalWeight: "कुल फसल वजन",
    minPrice: "न्यूनतम अपेक्षित मूल्य (₹/किग्रा)",
    mandiBaseline: "वर्तमान मंडी औसत",
    aiForecast: "एआई 7-दिवसीय पूर्वानुमान",
    viewReceipt: "डिजिटल रसीद देखें",
    downloadReceipt: "डिजिटल रसीद डाउनलोड करें",
    trackOrder: "लाइव ऑर्डर ट्रैक करें",
    settled: "भुगतान पूर्ण",
    inTransit: "मार्ग में",
    escrowLocked: "एस्क्रो सुरक्षित",
    autoReroute: "ऑटो री-रूट सिमुलेशन",
    matrixCache: "रूट मैट्रिक्स कैश: सक्रिय"
  },
  mr: {
    fpoDashboard: "शेतकरी / एफपीओ पोर्टल",
    marketplace: "थोक व्यापारी बाजारपेठ",
    logistics: "वाहतूक मार्ग ऑप्टिमायझेशन",
    ordersLedger: "डिजिटल लेजर आणि ऑर्डर्स",
    impact: "शेतकरी नफा आणि प्रभाव",
    logHarvest: "शेतमालाची नोंद करा",
    saveOffline: "ऑफलाइन रांगेत जतन करा",
    registerProduce: "माल नोंदवून थेट बाजारात आणा",
    smartEscrow: "स्मार्ट एस्क्रो (सुरक्षित हमी)",
    liveCloud: "थेट क्लाउड",
    offlineSim: "ऑफलाइन पद्धत",
    activeBatches: "सक्रिय माल साठा",
    disintermediationGain: "दलाली बचत फायदा",
    verifiedFpo: "प्रमाणित एफपीओ",
    produceCategory: "मालाचा प्रकार",
    cropName: "पिकाचे नाव व प्रतवारी",
    totalWeight: "एकूण वजन",
    minPrice: "अपेक्षित दर (₹/किलो)",
    mandiBaseline: "सध्याचा बाजारभाव",
    aiForecast: "एआय ७-दिवसीय अंदाज",
    viewReceipt: "डिजिटल पावती पहा",
    downloadReceipt: "पावती डाऊनलोड करा",
    trackOrder: "थेट वाहतूक ट्रॅक करा",
    settled: "खात्यात जमा",
    inTransit: "वाटेवर",
    escrowLocked: "एस्क्रो सुरक्षित",
    autoReroute: "मार्ग री-कॅल्क्युलेशन",
    matrixCache: "रूट मॅट्रिक्स कॅश: सक्रिय"
  },
  pa: {
    fpoDashboard: "ਕਿਸਾਨ / ਐਫਪੀਓ ਪੋਰਟਲ",
    marketplace: "ਥੋਕ ਖਰੀਦਦਾਰ ਮੰਡੀ",
    logistics: "ਰੂਟ ਓਪਟੀਮਾਈਜ਼ੇਸ਼ਨ",
    ordersLedger: "ਡਿਜੀਟਲ ਲੇਜ਼ਰ ਅਤੇ ਆਰਡਰ",
    impact: "ਪ੍ਰਭਾਵ ਅਤੇ ਮੁਨਾਫਾ",
    logHarvest: "ਫਸਲ ਬੈਚ ਦਰਜ ਕਰੋ",
    saveOffline: "ਆਫਲਾਈਨ ਸੰਭਾਲੋ",
    registerProduce: "ਫਸਲ ਰਜਿਸਟਰ ਕਰੋ ਅਤੇ ਵੇਚੋ",
    smartEscrow: "ਸਮਾਰਟ ਐਸਕਰੋ",
    liveCloud: "ਲਾਈਵ ਕਲਾਉਡ",
    offlineSim: "ਆਫਲਾਈਨ ਮੋਡ",
    activeBatches: "ਸਰਗਰਮ ਫਸਲ ਲਾਟ",
    disintermediationGain: "ਵਿਚੋਲਿਆਂ ਤੋਂ ਬੱਚਤ",
    verifiedFpo: "ਤਸਦੀਕਸ਼ੁਦਾ ਐਫਪੀਓ",
    produceCategory: "ਫਸਲ ਦੀ ਸ਼੍ਰੇਣੀ",
    cropName: "ਫਸਲ ਦਾ ਨਾਮ",
    totalWeight: "ਕੁੱਲ ਵਜ਼ਨ",
    minPrice: "ਘੱਟੋ-ਘੱਟ ਮੁੱਲ (₹/ਕਿਲੋ)",
    mandiBaseline: "ਮੰਡੀ ਔਸਤ ਰੇਟ",
    aiForecast: "ਏਆਈ 7-ਦਿਨਾਂ ਭਵਿੱਖਬਾਣੀ",
    viewReceipt: "ਡਿਜੀਟਲ ਰਸੀਦ ਦੇਖੋ",
    downloadReceipt: "ਰਸੀਦ ਡਾਊਨਲੋਡ ਕਰੋ",
    trackOrder: "ਆਰਡਰ ਟਰੈਕ ਕਰੋ",
    settled: "ਭੁਗਤਾਨ ਮੁਕੰਮਲ",
    inTransit: "ਰਸਤੇ ਵਿੱਚ",
    escrowLocked: "ਐਸਕਰੋ ਸੁਰੱਖਿਅਤ",
    autoReroute: "ਰੀ-ਰੂਟਿੰਗ",
    matrixCache: "ਰੂਟ ਮੈਟ੍ਰਿਕਸ ਕੈਸ਼: ਸਰਗਰਮ"
  }
};
