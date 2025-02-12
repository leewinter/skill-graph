import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useDataGridTranslations() {
  const { t, i18n } = useTranslation();

  const localeText = useMemo(() => ({
    toolbarDensity: t("toolbarDensity", "Density"),
    toolbarFilters: t("toolbarFilters", "Filters"),
    toolbarColumns: t("toolbarColumns", "Columns"),
    toolbarExport: t("toolbarExport", "Export"),
    footerRowSelected: (count: number) => t("footerRowSelected", { count }),
    footerTotalRows: t("footerTotalRows", "Total Rows"),
    MuiTablePagination: {
      labelRowsPerPage: t("labelRowsPerPage", "Rows per page"),
    },
  }), [i18n.language]);

  return localeText;
}