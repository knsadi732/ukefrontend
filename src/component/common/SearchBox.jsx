import { useEffect, useState } from "react";
// import { errorToast } from "../react-toastfiy/toast";

function SearchBox(props) {
  const {
    allData,
    setFilteredData,
    placeholder = "Search...",
    return_array = false,
    className = "",
  } = props;
  const [searchQuery, setSearchQuery] = useState("");

  function debounce(func, delay) {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const handleSearchQueryChanged = (val, data) => {
    try {
      data = structuredClone(data);
      let searchInput = val.toLowerCase();

      if (searchInput.length === 0) {
        setFilteredData(allData);
        return;
      }

      const searchQueries = searchInput
        .split(" ")
        .filter((item) => item !== "");
      let results = Object.entries(data).filter(([key, entry]) => {
        console.log({ entry });
        return searchQueries.some((item) => {
          item = item?.toString().toLowerCase();

          return (
            key?.toString()?.toLowerCase()?.startsWith(item) ||
            entry?.name?.toString()?.toLowerCase()?.startsWith(item) ||
            entry?.role_name?.toString()?.toLowerCase()?.startsWith(item) ||
            entry?.role_shorthand
              ?.toString()
              ?.toLowerCase()
              ?.startsWith(item) ||
            entry?.phone?.toString()?.toLowerCase()?.startsWith(item) ||
            entry?.aadhar_no?.toString()?.toLowerCase()?.startsWith(item)
          );
        });
      });

      results = Object.fromEntries(results);
      console.log({ results });
      if (return_array) {
        results = Object.values(results);
      }
      setFilteredData(results);
    } catch (error) {
      console.error(error);
    //   errorToast(error?.message);
    }
  };


  useEffect(() => {
    handleSearchQueryChanged(searchQuery, allData);
  }, [searchQuery]);

  return (
    <input
      type="search"
      name="search-form"
      id="search-form"
      className={`form-control ${className}`}
      placeholder={placeholder}
      onChange={(e) => {
        console.log(e.target.value);
        setSearchQuery(e.target.value);
      }}
      value={searchQuery}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    />
  );
}

export default SearchBox;
