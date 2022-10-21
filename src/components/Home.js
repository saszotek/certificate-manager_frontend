import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>Homeee</div>
      <Link to="/login">Login pageee</Link>
    </div>
  );
}

export default Home;
