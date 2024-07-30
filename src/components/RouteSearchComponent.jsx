import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { OutsideClickHandler } from "./OutsideClickHandler";
import { LuSearch } from "react-icons/lu";

const filterTitles = (routes, term) => {
  const filteredTitles = routes.filter((route) => {
    let matches = route.title.toLowerCase().includes(term.toLowerCase());
    if (route.childrens && route.childrens.length > 0) {
      const childrenMatches = filterTitles(route.childrens, term);
      matches = matches || childrenMatches.length > 0;
    }
    return route?.show && matches;
  });
  return filteredTitles;
};

const RouteSearchComponent = ({ routs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setSearchTerm("");
    setIsSuggestionOpen(false);
  }, [location.pathname]);

  // Function to handle input change
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setIsSuggestionOpen(true);
    }
    const filteredSuggestions = filterTitles(routs, term).map((route) => route);
    setSuggestions(filteredSuggestions);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setSearchTerm("");
        setIsSuggestionOpen(false);
      }}
      className={`relative`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className={`bg-base-100 focus:outline-none text-primary focus:border-2 rounded-xl py-2 px-8  border-primary w-[300px]`}
        placeholder="Quick Search..."
        onFocus={() => {
          if (searchTerm) {
            setIsSuggestionOpen(true);
          }
        }}
      />
      <LuSearch
        className={`absolute top-1/2 -translate-y-1/2 left-2  text-primary text-xl`}
      />
      {isSuggestionOpen ? (
        <ul
          className={`absolute top-[120%] right-0 bg-base-100 rounded-xl  shadow-xl max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar min-w-[300px] max-w-[400px]`}
        >
          {suggestions.map((suggestion, index) => (
            <NavLink
              onClick={() => {
                setSearchTerm("");
                setIsSuggestionOpen(false);
              }}
              to={suggestion?.link}
              className={`py-2 px-2 flex items-center hover:bg-primary-content  gap-2`}
              key={index}
            >
              <suggestion.Icon className={`text-xl`} />
              {suggestion?.title}
            </NavLink>
          ))}
        </ul>
      ) : (
        ""
      )}
    </OutsideClickHandler>
  );
};

export default RouteSearchComponent;
