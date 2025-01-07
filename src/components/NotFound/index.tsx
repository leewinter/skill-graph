import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t, ready } = useTranslation();

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <div>
      <h2>{t("notFound.title")}</h2>
      <p>
        <Link to="/">{t("notFound.link")}</Link>
      </p>
    </div>
  );
}
