// import "../styles/globals.css";
import Navbar from "../components/main/Navbar";
import Header from "../components/main/Header";
// import Footer from "../components/main/Footer";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
