import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { v4 as uuidv4 } from "uuid";

export type ProfileRow = {
  id: string;
  name: string;
  technologies: TechnologyRow[];
  newRow: boolean;
};

export function getDefaultRow(): ProfileRow {
  return {
    id: uuidv4(),
    name: "",
    technologies: [],
    newRow: true,
  };
}
