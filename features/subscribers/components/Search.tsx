import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { FilledInput } from "@mui/material";
import { useRouter } from "next/router";

export const Search = () => {
  const searchCount = React.useRef(0);
  const { query, push, pathname } = useRouter();
  //const { search, pathname } = useLocation();
  const searchQuery = query["search"] || "";
  const [value, setValue] = React.useState(searchQuery);
  // const { search, pathname } = useLocation();
  // const navigate = useNavigate();
  //TODO: refactor this hook
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchCount.current > 0) {
        // const params = new URLSearchParams(search);
        // params.set("page", "1");
        query["page"] = "1";

        if (value.length === 0) {
          //params.delete("search");
          delete query["search"];
        } else {
          query["search"] = value;
          // params.set("search", value);
        }

        //const newQuery = "?" + params.toString();
        push({
          pathname,
          query,
        });
        //navigate(pathname + newQuery);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value]);

  // ////console.log(searchCount.current);
  return (
    <FilledInput
      id="search"
      name="search"
      placeholder="Search a Name"
      type="text"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      sx={{
        bgcolor: "background.bin",
        border: "1px solid #E9ECEF",
        "& .MuiFilledInput-input": {
          paddingTop: "0",
          paddingBottom: "0",
        },
        height: "2rem",
      }}
      value={value}
      onChange={({ target: { value } }) => {
        searchCount.current = searchCount.current + 1;
        setValue(value);
      }}
    ></FilledInput>
  );
};
