# CryptoWeather Nexus

CryptoWeather Nexus is a modern, multi-page dashboard combining real-time weather data, cryptocurrency information, and news updates. This application provides users with a comprehensive overview of the current weather, live cryptocurrency prices, and the latest news.

## Table of Contents

1. [Features](#features)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [Design Decisions](#design-decisions)
5. [API Integrations](#api-integrations)
6. [Real-Time Data Handling](#real-time-data-handling)
7. [State Management](#state-management)
8. [Responsive UI](#responsive-ui)
9. [Contributing](#contributing)

## Features

- Dashboard Overview:
  - Weather Section: Current temperature, humidity, and conditions for major cities.
  - Cryptocurrency Section: Live prices, 24-hour changes, and market capitalization for selected cryptocurrencies.
  - News Section: Top cryptocurrency-related headlines.
- Detail Pages:
  - City Details: Historical weather data with charts and tables.
  - Cryptocurrency Details: Historical pricing and extended metrics.
- Real-Time Updates:
  - Live cryptocurrency price updates via WebSocket.
  - Simulated real-time weather alerts.
- State Management: Utilizes Redux for global state management, including user preferences and fetched data.
- Responsive Design: Optimized for devices ranging from mobile screens to large desktops using Tailwind CSS.

## Setup and Installation

Install the project with npm:

```bash
git clone https://github.com/Nash0810/CryptoWeather-Nexus.git
cd CryptoWeather-Nexus
npm install
```

Create a `.env.local` file in the root directory and add the following:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_coincap_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

Replace `your_openweathermap_api_key`, `your_coincap_api_key`, and `your_newsdata_api_key` with your respective API keys.

Run the Development Server:

```bash
npm run dev
```

Access the Application:

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- Dashboard: Upon launching the application, the dashboard provides an overview of weather conditions, cryptocurrency prices, and news headlines.
- Navigation: Use the navigation links to access detailed pages for specific cities or cryptocurrencies.
- Real-Time Updates: Stay informed with live cryptocurrency price updates and simulated weather alerts.

## Design Decisions

- Multi-Page Architecture: Enhances user experience by organizing content into dedicated pages for dashboard overview, city details, and cryptocurrency details.
- API Integrations: Selected reputable APIs to ensure accurate and up-to-date information:
  - Weather Data: OpenWeatherMap's One Call API 3.0 provides comprehensive weather data.
  - Cryptocurrency Data: CoinCap API offers real-time cryptocurrency information.
  - News Headlines: NewsData.io supplies the latest news articles.
- Real-Time Data Handling: Implemented WebSocket connections for live cryptocurrency price updates and simulated in-app WebSocket events for weather alerts.
- State Management: Utilized Redux to manage global state, ensuring consistency and facilitating user preference storage.
- Responsive UI: Employed Tailwind CSS to create a responsive design that adapts seamlessly across various devices.

## API Reference

- OpenWeatherMap: Provides current weather data, forecasts, and historical data.
- CoinCap: Offers real-time cryptocurrency prices, market data, and WebSocket support for live updates.
- NewsData.io: Delivers news articles from a wide range of sources, including filtering options for specific topics.

## Contributing

Contributions are welcome! Please follow these steps:
- Fork the Repository: Click the 'Fork' button at the top right of the repository page.
- Create a New Branch: Use `git checkout -b your-branch-name`.
- Make Your Changes: Add your features or fix bugs.
- Commit Your Changes: Use `git commit -m 'Add some feature'`.
- Push to the Branch: Use `git push origin your-branch-name`.
- Open a Pull Request: Compare your branch with the base branch of the original repository.

## Deployment

This application is deployed on Vercel. Visit the live version [here](https://cryptoweather-nexus.vercel.app).

## Summary of Challenges and Resolutions

- **API Rate Limits**: Encountered rate limits with the chosen APIs. Implemented caching and optimized API calls to mitigate the impact.
- **WebSocket Integration**: Faced challenges with WebSocket connections dropping. Implemented reconnection logic to ensure continuous real-time updates.
- **Responsive Design**: Ensured the application is fully responsive across various devices by utilizing Tailwind CSS and thorough testing.

## License

This project is licensed under the MIT License.
