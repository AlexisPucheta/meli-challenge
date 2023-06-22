import SearchBar from "./components/search-bar/searchBar";
import "./globals.css";
import { GlobalContextProvider } from "./context/store";

export const metadata = {
  generator: 'Next.js',
  applicationName: 'MELI-CHALLENGE',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'Tailwind', 'Express'],
  authors: [{ name: 'Alexis', url: 'https://linkedin.com/in/alexis-pucheta' }],
  colorScheme: 'dark',
  creator: 'Alexis Pucheta',
  publisher: 'Alexis Pucheta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <GlobalContextProvider>
          <SearchBar></SearchBar>
          <div className="grid grid-cols-12 gap-4 px-4 bg-[#EEEEEE] min-h-screen pb-[46px]">
            <div className="col-start-2 col-span-10">{children}</div>
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
