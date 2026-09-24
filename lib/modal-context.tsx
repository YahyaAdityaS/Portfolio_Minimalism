"use client";

import React, { createContext, useContext, useState } from 'react';

type ModalContextType = {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (isOpen: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isContactModalOpen, setIsContactModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ContactModalProvider');
  }
  return context;
};
