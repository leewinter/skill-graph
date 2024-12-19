import { v4 as uuidv4 } from "uuid";

export type TechnologyRow = {
  id: string;
  technology: string;
  ability: number;
  category: string[];
  newRow: boolean;
};

export function getDefaultRow(): TechnologyRow {
  return {
    id: uuidv4(),
    technology: "",
    ability: 1,
    category: [],
    newRow: true,
  };
}
