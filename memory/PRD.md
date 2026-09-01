# KisanPrice — Farmer Price Discovery Marketplace

## Problem Statement
A mobile-first farmer decision-support tool that shows nearby mandi prices, transport costs, and storage/export alternatives — so smallholder farmers can see the *net* price, not just the gross, before selling.

## User Personas
- **Smallholder farmer** (primary): views mandi prices on phone, needs large tap targets, English (v1).
- **Farmer cooperative representative**: uses same tool for group decisions across multiple mandis.
- **Judges / demonstrators**: view the tool to evaluate the decision engine.

## Architecture
- **Frontend only**: React 19 + React Router 7 + Tailwind + Recharts + Phosphor icons.
- **Data**: Static JSON in `/app/frontend/src/data/marketData.js` (per user's choice — no backend).
- **State**: React Context (`FarmerContext`) for cross-page farmer selection (location/commodity/quantity/grade/truck).

## Pages Implemented (Feb 2026)
1. **Landing** — hero (Know Your Price. Choose Your Market.), 3-feature row, dual-outcome band.
2. **Farmer Dashboard** — location (state→district→town), commodity (5 crops), quantity, grade A/B/C, truck type.
3. **Mandi Comparison** — sortable cards (net/gross/distance), live Transport Calculator, best-net-price highlight, worked examples (Onion sell-local, Apple transport-pays-off).
4. **Price Trend** — 12-month Recharts line + ±10% shaded band for next 3 months, peak/low/range stats, estimate caveat.
5. **Cold Storage** — filterable facility cards, shelf-life panel, insurance + MIDH/MSAMB subsidy context.
6. **Export & Broker Directory** — 3 associations, region chips, "listed on request" contact.
7. **About / How It Works** — 5 pillars + coverage band.

## Coverage
- Crops: Onion, Tomato, Apple, Banana, Tur Dal.
- States: Maharashtra, Karnataka, Himachal Pradesh, Tamil Nadu.

## Design System
- **Fonts**: DM Serif Display (headings), Manrope (body).
- **Palette**: Emerald-900 primary, amber-600 accent, cream secondary, off-white bg.
- **Components**: Rounded-2xl cards with soft lift, pill buttons h-12+, chips for tags.

## Prioritized Backlog (P0/P1/P2)
- **P1**: Hindi language toggle.
- **P1**: Farmer login + saved crops/mandis (auto-alerts when net > threshold).
- **P1**: SMS/WhatsApp daily price alerts.
- **P2**: Real AGMARKNET API integration.
- **P2**: Map view for mandi/storage locations.
- **P2**: Broker verified-request form + admin review pipeline.
- **P2**: Print / share PDF of "today's best market" recommendation.
