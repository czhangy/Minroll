// Stylesheet
import "@/styles/globals.scss";
// TS
import type { AppProps } from "next/app";
import CurrentUser from "@/models/CurrentUser";
// Nav components
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Nav/Footer";
// React Context
import { AuthProvider } from "@/contexts/AuthContext";

function App({ Component, pageProps }: AppProps) {
    // Hold current user data => set by hooks
    let user: CurrentUser | null = null;

    // Sync element focus with window focus
    window.onblur = () =>
        (document.activeElement as HTMLInputElement | null)?.blur();

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

export default App;
