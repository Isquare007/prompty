import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "Prompty",
  description: "Discover and Share AI and Human Generated Prompts",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body>
        <Provider session={null}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
