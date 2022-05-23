// Stylesheet
import "@/styles/globals.scss";
// TS
import type { AppProps } from "next/app";
// Nav components
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Nav/Footer";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div id="app">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
