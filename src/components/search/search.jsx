import { AsyncPaginate } from "react-select-async-paginate"
import { useState } from "react"
import { GEO_API_URL, geoApiOptions } from "../../api"

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null)

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      )

      const jsonResponse = await response.json()

      return {
        options: jsonResponse.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      }
    } catch (error) {
      console.error("Error loading options:", error)
      return { options: [] }
    }
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}

export default Search
