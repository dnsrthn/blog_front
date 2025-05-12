import { Navigate } from 'react-router-dom';
import DashBoardPosts from './pages/posts/DashBoardPosts.jsx';
import DetailPost   from './pages/posts/DetailPost.jsx';

export const routes = [
  {
    path: '/posts/:id',
    element: <DetailPost />
  },
  {
    path: '/posts',
    element: <DashBoardPosts />
  },
  {
    path: '*',
    element: <Navigate to="/posts" replace />
  }
];
