import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Bills from './pages/bills/Bills';
import BillDetails from './pages/bills/BillDetails';
import MyPayBills from './pages/bills/MyPayBills';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { 
        path: "bills", 
        children: [
          { index: true, Component: Bills },
          { 
            path: ":id", 
            Component: BillDetails,
            loader: ({ params }) => {
              return fetch(`/api/bills/${params.id}`);
            }
          },
        ]
      },
      { path: "about", Component: About },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
      {
        path: "dashboard",
        element: <PrivateRoute />,
        children: [
          { 
            path: "my-bills", 
            Component: MyPayBills,
            loader: ({ request }) => {
              // Protected data loading
              const user = JSON.parse(localStorage.getItem('user'));
              if (!user) {
                throw new Response("Unauthorized", { status: 401 });
              }
              return fetch(`/api/my-bills?userId=${user.uid}`);
            }
          },
          { path: "profile", Component: () => <div>Profile Page</div> },
          { path: "settings", Component: () => <div>Settings Page</div> },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
