import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { useAuth } from './useAuth';
import { useStatus } from './useStatus';
import { useDataset } from '../context/DatasetContext';

describe('hooks de contexto', () => {
  describe('useAuth', () => {
    it('lanza un error fuera de AuthProvider', () => {
      const Broken: React.FC = () => {
        useAuth();
        return null;
      };
      expect(() => render(<Broken />)).toThrow('useAuth must be used within AuthProvider');
    });
  });

  describe('useStatus', () => {
    it('lanza un error fuera de StatusProvider', () => {
      const Broken: React.FC = () => {
        useStatus();
        return null;
      };
      expect(() => render(<Broken />)).toThrow('useStatus must be used within StatusProvider');
    });
  });

  describe('useDataset', () => {
    it('lanza un error fuera de DatasetProvider', () => {
      const Broken: React.FC = () => {
        useDataset();
        return null;
      };
      expect(() => render(<Broken />)).toThrow('useDataset must be used within DatasetProvider');
    });
  });
});