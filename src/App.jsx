import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from './components/RootLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
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
          },
        ]
      },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsOfService },
      {
        path: "/",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          { 
            path: "my-bills", 
            Component: MyPayBills,
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
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;