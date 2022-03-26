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
    return url.protocol + "//" + url.host + "/?" + searchParam.toString();
    // console.log(searchParam.toString());
  } else {
    return null;
  }
  // if (queryPage * take > 0) {
  //   prevUrl.searchParams.set("page", String(queryPage - 1));
  // }
};
