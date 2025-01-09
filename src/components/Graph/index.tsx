import { Chart, registerables } from "chart.js";
import { useEffect, useMemo, useState } from "react";

import BarTechnology from "./graph-types/BarTechnology";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FilterListIcon from "@mui/icons-material/FilterList";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import { PROFILES_DATA_KEY } from "@src/constants";
import PieTechnology from "./graph-types/PieTechnology";
import PolarCategories from "./graph-types/PolarCategories";
import { ProfileRow } from "@src/components/Profiles/profile-table-types";
import RadarTechnology from "./graph-types/RadarTechnology";
import SankeyTechnology from "./graph-types/SankeyCategoryTechnology";
import { TechnologyRow } from "@src/components/TechnologyTable/table-types";
import { extractUniqueCatgories } from "./graphHelpers";
import localforage from "localforage";
import { useAvailableCategories } from "@src/hooks/useAvailableCategories";
import { useLocation } from "react-router-dom";

Chart.register(...registerables);

type CategoryCheckbox = {
  checked: boolean;
  category: string;
};

export default function Graph() {
  const [data, setData] = useState<TechnologyRow[]>([]);
  const [categories, setCategories] = useState<CategoryCheckbox[]>([]);
  const [filterVisible, setFilterVisible] = useState(false); // State to manage filter visibility
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get("profile-id");

  const availableCategories = useAvailableCategories();

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <IconButton
              onClick={() => setFilterVisible(!filterVisible)}
              color={filterVisible ? "primary" : "default"} // Highlight when active
            >
              <FilterListIcon />
            </IconButton>
          </Box>
        </Grid>
        {filterVisible && (
          <Grid size={12}>
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
                        label={availableCategories.find(c=> c.value === cat.category)?.label}
                      />
                    );
                  })}
              </FormGroup>
            </FormControl>
          </Grid>
        )}
        <Grid size={{ xs: 12 }} container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <BarTechnology data={datasetsFilteredByCategory} />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <RadarTechnology data={datasetsFilteredByCategory} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }} container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <PieTechnology data={datasetsFilteredByCategory} />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <PolarCategories data={datasetsFilteredByCategory} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }} container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <SankeyTechnology data={datasetsFilteredByCategory} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
