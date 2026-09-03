import NotFound from "../pages/NotFound";
import HomePage from "../pages/home/page";
import BookingPage from "../pages/booking/page";
import GalleryPage from "../pages/gallery/page";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/booking",
    element: <BookingPage />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;