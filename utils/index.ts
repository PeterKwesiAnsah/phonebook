export const genPrevNext = (
  queryPage: number,
  url: URL,
  condition: boolean,
  type: "prev" | "next"
) => {
  if (condition) {
    const searchParam = url.searchParams;
    // console.log(queryPage);
    //console.log("add");
    if (type === "next") {
      searchParam.set("page", String(queryPage + 2));
    }
    if (type === "prev") {
      searchParam.set("page", String(queryPage));
    }
    // console.log();
    return url.origin + url.pathname + url.search;
    // console.log(searchParam.toString());
  } else {
    return null;
  }
  // if (queryPage * take > 0) {
  //   prevUrl.searchParams.set("page", String(queryPage - 1));
  // }
};

export const inputStyles = () => ({
  bgcolor: "background.paper",
  border: "1px solid #E9ECEF",
  "& .MuiFilledInput-input": {
    paddingTop: "0",
    paddingBottom: "0",
    height: "100%",
  },
  height: "3.375rem",
  width: "100%",
});
