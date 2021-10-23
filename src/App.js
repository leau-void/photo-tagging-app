import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Game from "./components/Game";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, db } from "./firebase-setup";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <Game />
      <Footer />
    </>
  );
}

export default App;
