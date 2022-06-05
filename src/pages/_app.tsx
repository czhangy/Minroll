// Stylesheet
import "@/styles/globals.scss";
// TS
import type { AppProps } from "next/app";
import CurrentUser from "@/models/User";
// Nav components
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Nav/Footer";
// React Context
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
    let user: CurrentUser | null = null;

    return (
        <AuthProvider value={user}>
            <div id="app">
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default MyApp;
