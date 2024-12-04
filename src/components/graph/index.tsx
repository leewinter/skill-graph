import { DATA_KEY } from "@src/constants";
import { useEffect, useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import localforage from "localforage";
import { TechnologyRow } from "@src/components/Table";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { extractUniqueCatgories } from "./graphHelpers";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BarTechnology from "./graph-types/BarTechnology";
import PieTechnology from "./graph-types/PieTechnology";
import RadarTechnology from "./graph-types/RadarTechnology";

Chart.register(...registerables);

type CategoryCheckbox = {
  checked: boolean;
  category: string;
};

export default function Graph() {
  const [data, setData] = useState<TechnologyRow[]>([]);
  const [categories, setCategories] = useState<CategoryCheckbox[]>([]);
  const [chartType, setChartType] = useState<string>("bar");

  useEffect(() => {
    localforage.getItem(DATA_KEY, function (err, value) {
      if (err) throw err;

      if (value) setData(value as TechnologyRow[]);
    });
  }, []);

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

  // Datasets will filter based on selected categories. If a technology has no category it will always show instead.
  const datasetsFilteredByCategory = useMemo(() => {
    const technologies = data.filter((tech) =>
      categories
        .filter((cat) => cat.checked)
        .map((cat) => cat.category)
        .some(
          (cat) =>
            tech.category.indexOf(cat) >= 0 ||
            (tech.category.length == 0 && cat == "Uncategorised")
        )
    );
    return technologies;
  }, [data, categories]);

  const handleCheckboxChecked = (cat: CategoryCheckbox) => {
    setCategories([
      ...categories.filter((n) => n.category != cat.category),
      { ...cat, checked: !cat.checked },
    ]);
  };

  const handleCahrtChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  return (
    <div>
      <div style={{ flexDirection: "row" }}>
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
            onChange={handleCahrtChange}
          >
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="pie">Pie</MenuItem>
            <MenuItem value="radar">Radar</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ display: "flex" }}>
        {chartType === "bar" ? (
          <BarTechnology data={datasetsFilteredByCategory} />
        ) : null}
        {chartType === "pie" ? (
          <PieTechnology data={datasetsFilteredByCategory} />
        ) : null}
        {chartType === "radar" ? (
          <RadarTechnology data={datasetsFilteredByCategory} />
        ) : null}
      </div>
    </div>
  );
}
