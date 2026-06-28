'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClinicalCase, CaseFormData } from '@/app/types';
import { caseService } from '@/app/services/caseService';

export function useCases() {
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setCases(caseService.getAll());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createCase = useCallback((data: CaseFormData): ClinicalCase => {
    const created = caseService.create(data);
    refresh();
    return created;
  }, [refresh]);

  const updateCase = useCallback((id: string, data: CaseFormData): ClinicalCase => {
    const updated = caseService.update(id, data);
    refresh();
    return updated;
  }, [refresh]);

  const deleteCase = useCallback((id: string): void => {
    caseService.delete(id);
    refresh();
  }, [refresh]);

  return { cases, loading, createCase, updateCase, deleteCase, refresh };
}
