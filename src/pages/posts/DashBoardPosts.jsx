import React from "react";
import Navbar from "../../components/nav/Navbar.jsx"
import DashboardPosts from "../../components/posts/DashboardPosts.jsx";
import '../../assets/style.css';

export const DashBoardPosts = () => {
    return (
      <div className="dashboard-container">
        <Navbar />
        <main className="dashboard-content">
          <DashboardPosts />
        </main>
      </div>
    )
}
  export default DashBoardPosts

