import { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import SearchBar from './SearchBar';

const LiveSearch = () => {
    // Search Bar
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
      if (term) {
        console.log("SEARCH TERM :", term)
        axios.get('/search', {params: {name: term}})
          .then(res => {
            console.log("SEARCH RESULTS :", res.data);
            setResults([...res.data]);
          })
          .catch(err => console.log(err));
      };
    }, [term]);

  return (
    <main>
      <div>
        <SearchBar onSearch={term => setTerm(term)} />
      </div>
      <div className='results-dropdown'>
        {results.map((result) => (
          <div className="dropdown-row">{result.first_name} {result.last_name}</div>
        ))}
      </div>
    </main>
  );
}
 
export default LiveSearch;