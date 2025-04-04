import "./globals.css";
import ReduxProvider from "../store/provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "CryptoWeather Nexus",
  description: "Weather + Crypto Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
