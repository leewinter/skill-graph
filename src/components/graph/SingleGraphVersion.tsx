import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { PROFILES_DATA_KEY } from "@src/constants";
import { Chart, registerables } from "chart.js";
import localforage from "localforage";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { ProfileRow } from "../Profiles/profile-table-types";
import BarTechnology from "./graph-types/BarTechnology";
import PieTechnology from "./graph-types/PieTechnology";
import RadarTechnology from "./graph-types/RadarTechnology";
import { extractUniqueCatgories } from "./graphHelpers";

Chart.register(...registerables);

type CategoryCheckbox = {
  checked: boolean;
  category: string;
};

export default function Graph() {
  const [data, setData] = useState<TechnologyRow[]>([]);
  const [categories, setCategories] = useState<CategoryCheckbox[]>([]);
  const [chartType, setChartType] = useState<string>("bar");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get("profile-id");

  useEffect(() => {
    const getProfile = async () => {
      const value = await localforage.getItem<ProfileRow[]>(PROFILES_DATA_KEY);
      const p = value?.find((n) => n.id === profileId);
      if (p) setData(p.technologies as TechnologyRow[]);
    };
    if (profileId) getProfile();
  }, [profileId]);

  useEffect(() => {
    if (data.length) {
      const uniqueCategories = extractUniqueCatgories(data);
      setCategories(
        uniqueCategories.map((cat) => ({
          checked: true,
          category: cat,
        }))
      );
    }
  }, [data]);

  const datasetsFilteredByCategory = useMemo(() => {
    const technologies = data.filter((tech) =>
      categories
        .filter((cat) => cat.checked)
        .map((cat) => cat.category)
        .some(
          (cat) =>
            tech.category.indexOf(cat) >= 0 ||
            (tech.category.length === 0 && cat === "Uncategorised")
        )
    );
    return technologies;
  }, [data, categories]);

  if (!data.length) return null;

  const handleCheckboxChecked = (cat: CategoryCheckbox) => {
    setCategories([
      ...categories.filter((n) => n.category !== cat.category),
      { ...cat, checked: !cat.checked },
    ]);
  };

  const handleChartChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Category Filter
      </Typography>
      <Divider />
      <FormControl fullWidth>
        <FormGroup style={{ flexDirection: "row" }}>
          {categories
            .sort((a, b) => a.category.localeCompare(b.category))
            .map((cat, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={cat.checked}
                      onClick={() => handleCheckboxChecked(cat)}
                    />
                  }
                  label={cat.category}
                />
              );
            })}
        </FormGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chartType}
          label="Chart Type"
          onChange={handleChartChange}
        >
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="pie">Pie</MenuItem>
          <MenuItem value="radar">Radar</MenuItem>
        </Select>
      </FormControl>

      {/* MUI Card Component for Framing */}
      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          {chartType === "bar" && (
            <BarTechnology data={datasetsFilteredByCategory} />
          )}
          {chartType === "pie" && (
            <PieTechnology data={datasetsFilteredByCategory} />
          )}
          {chartType === "radar" && (
            <RadarTechnology data={datasetsFilteredByCategory} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
