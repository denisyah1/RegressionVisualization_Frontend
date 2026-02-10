# Regression Visualization Frontend

React + Vite UI for uploading CSV data, running EDA, configuring regression, and exporting results.

## Features
- CSV upload flow connected to the backend API.
- EDA views: dataset overview, numeric summary stats, correlation heatmap, histograms, scatter plot, head/tail preview table.
- Regression setup: target selection, feature selection, null handling strategy.
- Auto recommendations for target/features.
- Model comparison summary and regression plot (actual vs predicted).
- Export: download model file and PDF report.

## Tech Stack
- React, TypeScript, Vite
- Zustand for state
- Chart/visual UI components

## Setup
1. Install dependencies.
   ```bash
   npm install
   ```
2. Configure API base URL (optional).
   - Default: `VITE_API_BASE_URL=http://localhost:8000` in `.env`.
   - Vite proxy already forwards `/api` to `http://localhost:8000`.
3. Start dev server.
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` - start local dev server.
- `npm run build` - production build.
- `npm run preview` - preview build output.

## Notes
- Make sure the backend is running at `http://localhost:8000` before using the app.
