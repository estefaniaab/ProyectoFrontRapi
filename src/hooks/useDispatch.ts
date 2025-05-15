import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

// Use throughout your app instead of the plain `useDispatch` hook
export const useAppDispatch = () => useDispatch<AppDispatch>();