"use client";
import { Provider } from "react-redux";
import { useRef } from "react";
import makestore from "@/Redux/Store";
export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makestore(); // Create the Redux store if it doesn't exist
  }

  return <Provider store={storeRef.current}>{children}</Provider>; // Wrap the children with the Redux Provider
}