import { ClinicalCase, CaseFormData } from '@/app/types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'case_authoring_portal_cases';

function getAll(): ClinicalCase[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClinicalCase[]) : [];
  } catch {
    return [];
  }
}

function save(cases: ClinicalCase[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export const caseService = {
  getAll,

  getById(id: string): ClinicalCase | undefined {
    return getAll().find((c) => c.id === id);
  },

  create(data: CaseFormData): ClinicalCase {
    const now = new Date().toISOString();
    const newCase: ClinicalCase = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      ...data,
      patientInfo: {
        ...data.patientInfo,
        age: Number(data.patientInfo.age),
      },
    };
    const cases = getAll();
    save([...cases, newCase]);
    return newCase;
  },

  update(id: string, data: CaseFormData): ClinicalCase {
    const cases = getAll();
    const now = new Date().toISOString();
    const updated = cases.map((c) =>
      c.id === id
        ? {
            ...c,
            ...data,
            patientInfo: { ...data.patientInfo, age: Number(data.patientInfo.age) },
            updatedAt: now,
          }
        : c
    );
    save(updated);
    return updated.find((c) => c.id === id)!;
  },

  delete(id: string): void {
    const cases = getAll().filter((c) => c.id !== id);
    save(cases);
  },
};
