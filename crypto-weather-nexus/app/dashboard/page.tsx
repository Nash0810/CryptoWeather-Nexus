// app/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        CryptoWeather Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Weather Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">🌦️ Weather</h2>
          <div className="space-y-2">
            <div className="border rounded p-2">New York</div>
            <div className="border rounded p-2">London</div>
            <div className="border rounded p-2">Tokyo</div>
          </div>
        </section>

        {/* Crypto Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">🪙 Crypto</h2>
          <div className="space-y-2">
            <div className="border rounded p-2">Bitcoin</div>
            <div className="border rounded p-2">Ethereum</div>
            <div className="border rounded p-2">Solana</div>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">📰 News</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Crypto market sees upward trend</li>
            <li>New Ethereum upgrade launched</li>
            <li>Bitcoin ETF discussions heating up</li>
            <li>Solana adoption increases</li>
            <li>Regulators eye crypto exchanges</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
