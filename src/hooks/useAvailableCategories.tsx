import { useTranslation } from "react-i18next";

export function useAvailableCategories(){
  const { t, ready } = useTranslation();

  if (!ready) return [];

  const categories = [
    { value: "Infrastructure" },
    { value: "UI" },
    { value: "Cloud" },
    { value: "Backend" },
    { value: "Data" },
  ];

  return categories.map((category) => ({
    label: t(`shared.categories.${category.value}`), // Translate based on the value
    value: category.value,
  }));
}