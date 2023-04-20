import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ExpandArrow from "../../assets/images/arrow.svg";
import mobileUnCheckIcon from "../../assets/images/untick-m.svg";
import mobileCheckIcon from "../../assets/images/tick-m.svg";
import desktopUnCheckIcon from "../../assets/images/untick.svg";
import desktopCheckIcon from "../../assets/images/tick.svg";

export default function MultipleSelectCheckmarks({
  labels,
  names,
  selectedValue,
  setSelectedValue,
  isDisabled,
  trigerFilterDatas,
  setTrigerfilterDatas,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  const matches = useMediaQuery("(min-width:1024px)");

  const handleChange = (event) => {
    if (!event.target) return;
    const {
      target: { value },
    } = event;
    setSelectedValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const stopImmediatePropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const filterData = names.filter((data) =>
    data.toUpperCase().includes(searchValue.toUpperCase())
  );

  const resetCheckbox = (e) => {
    e.stopPropagation();
    setSelectedValue([]);
  };

  const handleClick = () => {
    setTrigerfilterDatas(!trigerFilterDatas);
    setShowSelect(false);
  };

  return (
    <>
      {matches ? (
        <>
          <FormControl>
            <InputLabel id="demo-multiple-checkbox-label">{labels}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              open={showSelect}
              onOpen={() => setShowSelect(true)}
              onClose={() => setShowSelect(false)}
              IconComponent={() => (
                <span className="arrow">
                  <img src={ExpandArrow} alt="expand" />
                </span>
              )}
              disabled={isDisabled}
              value={selectedValue}
              onChange={handleChange}
              input={<OutlinedInput label={labels} />}
              renderValue={(selected) =>
                selected.join(", ") === "All" ? selected.join(", ") : ""
              }
            >
              <MenuItem
                dense
                divider
                onClickCapture={(e) => stopImmediatePropagation(e)}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  name="select"
                  style={{ color: "white" }}
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </MenuItem>
              {filterData
                .filter((el) => el !== "All")
                .map((name) => (
                  <MenuItem key={name} value={name} onChange={name}>
                    <Checkbox
                      checked={selectedValue.indexOf(name) > -1}
                      icon={<img src={desktopUnCheckIcon} alt="uncheck" />}
                      checkedIcon={<img src={desktopCheckIcon} alt="check" />}
                    />
                    <ListItemText primary={name} onChange={name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <>
          <FormControl>
            <InputLabel id="demo-multiple-checkbox-label">{labels}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              open={showSelect}
              onOpen={() => setShowSelect(true)}
              onClose={() => setShowSelect(false)}
              IconComponent={() => (
                <span className="arrow">
                  <img src={ExpandArrow} alt="expand" />
                </span>
              )}
              value={selectedValue}
              onChange={handleChange}
              input={<OutlinedInput label={labels} />}
              renderValue={(selected) =>
                selected.join(", ") === "All" ? selected.join(", ") : ""
              }
            >
              <IconButton onClick={() => setShowSelect(false)}>
                <ArrowBackIosIcon />
              </IconButton>
              <Typography>Filter by {labels.replace(":", "")}</Typography>
              <MenuItem onKeyDown={(e) => e.stopPropagation()}>
                <Button onClick={resetCheckbox}>Reset</Button>
              </MenuItem>
              <MenuItem
                dense
                divider
                onClickCapture={(e) => stopImmediatePropagation(e)}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <SearchIcon />
                <input
                  type="text"
                  placeholder={
                    labels === "Community"
                      ? "Search Communities"
                      : "Search Badges"
                  }
                  name="select"
                  style={{ color: "white" }}
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </MenuItem>
              {/* <div className="scroll"> */}
              {filterData
                .filter((el) => el !== "All")
                .map((name) => (
                  <MenuItem key={name} value={name} onChange={name}>
                    <ListItemText primary={name} onChange={name} />
                    <Checkbox
                      checked={selectedValue.indexOf(name) > -1}
                      icon={<img src={mobileUnCheckIcon} alt="uncheck" />}
                      checkedIcon={<img src={mobileCheckIcon} alt="check" />}
                    />
                  </MenuItem>
                ))}
              {/* </div> */}
              <MenuItem onKeyDown={(e) => e.stopPropagation()}>
                <Button
                  sx={{ textTransform: "none" }}
                  onClick={() => handleClick()}
                >
                  Apply Filter
                </Button>
              </MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
}
