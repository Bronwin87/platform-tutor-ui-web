import { Unit } from './unit.model';

export interface Course {
  id?: number;
  code: string;
  name: string;
  description: string;
  knowledgeUnits?: Unit[];
}