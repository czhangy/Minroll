// Stylesheet
import "@/styles/globals.scss";
// TS
import type { AppProps } from "next/app";
// Nav components
import Navbar from "@/components/Nav/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div id="app">
            <Navbar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
