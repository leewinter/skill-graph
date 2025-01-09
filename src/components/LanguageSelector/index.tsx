import { FormControl, InputAdornment, MenuItem, Select, useTheme } from "@mui/material";

import TranslateIcon from "@mui/icons-material/Translate";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { t, ready, i18n } = useTranslation();
  const theme = useTheme();

  if (!ready) return <div>{t("shared.loading")}</div>;

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" }
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const isValidLanguage = languages.some((lng) => lng.code === i18n.language);

    if (!isValidLanguage) {
      handleLanguageChange("en");
    }
  }, [i18n.language]);

  return (
    <FormControl variant="standard" >
      <Select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        labelId="select-with-icon-label"
        startAdornment={
          <InputAdornment position="start">
            <TranslateIcon  />
          </InputAdornment>
        }
        label=""
        sx={{
          color: theme.palette.primary.contrastText,
          "& .MuiSvgIcon-root": { color: theme.palette.primary.contrastText },
          "&:before": { borderBottom: `1px solid ${theme.palette.primary.contrastText}` },
          "&:after": { borderBottom: `2px solid ${theme.palette.primary.contrastText}` },
          "&:hover": { borderBottom: `2px solid ${theme.palette.primary.contrastText}` },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              color: "secondary",
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            {language.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSelector;