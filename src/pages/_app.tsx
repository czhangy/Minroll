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

    return (
        // Context wrapper
        <AuthProvider value={user}>
            <div id="app">
                <Navbar />
                {/* Current page */}
                <Component {...pageProps} />
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
