import React from "react";
import GetPosts from "../../components/posts/getPosts.jsx";
import "../../assets/style.css";

export const GetPostsPage = () => {
    return (
      <div className="get-post-container">
        <main className="get-post-content">
          <GetPosts />
        </main>
      </div>
    );
}
export default GetPostsPage;