import { useState } from "react";
import "./styles.css";
import data from "./data/countries.json";
import Country from "./components/Country";

function sortAlpha(countries) {
  return countries.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

function sortAsc(countries) {
  return countries.sort(function (a, b) {
    return a.population - b.population;
  });
}

function sortDesc(countries) {
  return countries.sort(function (a, b) {
    return b.population - a.population;
  });
}

function filter(list, option) {
  return list.filter(function (country) {
    return country.continent.toLowerCase() === option; // evaluates to true or false
  });
}

export default function App() {
  const [populationSizeOption, setPopulationSizeOption] = useState("1"); // Default value
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState(">");

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function handlePopulationSizeChange(e) {
    setPopulationSizeOption(e.target.value);
  }

  function sort(option, countries) {
    if (option === "alpha") {
      return sortAlpha(countries);
    } else if (option === ">") {
      return sortDesc(countries);
    } else if (option === "<") {
      return sortAsc(countries);
    } else {
      return countries;
    }
  }

  function filterByPopulation(countries, populationSizeOption) {
    return countries.filter((country) => {
      const population = country.population;

      if (populationSizeOption === "1" && population < 100000000) {
        return true;
      } else if (populationSizeOption === "100m" && population >= 100000000) {
        return true;
      } else if (populationSizeOption === "200m" && population >= 200000000) {
        return true;
      } else if (populationSizeOption === "500m" && population >= 500000000) {
        return true;
      } else if (populationSizeOption === "1b" && population >= 1000000000) {
        return true;
      } else if (populationSizeOption === "all") {
        return true;
      }
      return false;
    });
  }

  const filteredPopulation = filterByPopulation(
    data.countries,
    populationSizeOption
  );
  const sortedCountries = sort(sortOption, filteredPopulation);
  const filteredCountries = filter(sortedCountries, filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="by continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
          </select>
        </label>
        <label>
          Population Size:
          <select
            value={populationSizeOption}
            onChange={handlePopulationSizeChange}
          >
            <optgroup label="by population size">
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>

      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country key={country.id} details={country} />;
        })}
      </div>
    </div>
  );
}
