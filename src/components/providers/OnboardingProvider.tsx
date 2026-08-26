"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingContextType {
  isOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const openOnboarding = () => {
    setStep(1);
    setIsOpen(true);
  };
  
  const closeOnboarding = () => setIsOpen(false);
  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <OnboardingContext.Provider value={{ isOpen, openOnboarding, closeOnboarding, step, nextStep, prevStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
