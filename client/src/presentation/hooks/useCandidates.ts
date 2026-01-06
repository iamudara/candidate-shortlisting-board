import { useContext } from 'react';
import { CandidateContext } from '../context/CandidateContext';

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  
  if (context === undefined) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  
  return context;
};
