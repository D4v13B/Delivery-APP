import { useContext } from "react";
import RoutesContext from "../context/RoutesProvider";

export const useRoutes = () => {
   return useContext(RoutesContext)
} 