import { router } from "./routers/AppRouter";
import { RouterProvider } from "react-router-dom";

export const TeleApp = () => {
  return (
    <RouterProvider router={router} />
  )
}