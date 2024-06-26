import { TechnologyRow } from "../Table";

export const extractUniqueCatgories = (data: TechnologyRow[]) => {
  let uniqueCategories: string[] = [];
  if (data.length) {
    uniqueCategories = Array.from(
      new Set([
        ...data.flatMap((techRow) => [
          ...(techRow.category.length ? techRow.category : ["Uncategorised"]),
        ]),
      ])
    );
  }
  return uniqueCategories;
};
