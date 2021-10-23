import "./App.css";
import Footer from "./components/Footer";
import Game from "./components/Game";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, db } from "./firebase-setup";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <Game />
      <Footer />
    </>
  );
}

export default App;
