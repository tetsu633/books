'use client';

import React, { useEffect, useState } from 'react';
import { Tutorial } from './Tutorial';
import { useSession } from 'next-auth/react';

export const TutorialProvider = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  if (!showTutorial || !session) return null;

  return <Tutorial onComplete={handleComplete} />;
};
