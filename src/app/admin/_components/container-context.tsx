"use client";
import {
  createContext,
  useContext,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

export const ContainerRefContext =
  createContext<MutableRefObject<HTMLDivElement | null> | null>(null);

export const ContainerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <ContainerRefContext.Provider value={containerRef}>
      <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
        {children}
      </div>
    </ContainerRefContext.Provider>
  );
};

export const useContainerRef = () => {
  const ctx = useContext(ContainerRefContext);
  if (!ctx)
    throw new Error("useContainerRef must be used within ContainerProvider");
  return ctx;
};
