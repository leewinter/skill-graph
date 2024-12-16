import { TechnologyRow } from "../TechnologyTable/table-types";

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

export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{1,2}/g)!
    .map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
