import Layout from "../components/Layout/Layout"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ThemeProvider>
  )
}
