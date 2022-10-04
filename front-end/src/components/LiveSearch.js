import { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import SearchBar from './SearchBar';
import './LiveSearch.scss';
import { useNavigate } from 'react-router-dom';

const LiveSearch = () => {

  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Axios call to query results in the database
  useEffect(() => {
    if (term) {
      console.log("SEARCH TERM :", term)
      axios.get('/search', {params: {name: term}})
        .then(res => {
          console.log("SEARCH RESULTS :", res.data);
          setResults([...res.data]);
        })
        .catch(err => console.log(err));
    } else if (!term) {
      setResults([]);
      setShowResults(false);
    }
  }, [term]);

  // Set ShowResults state to only show results container if there are existing results
  useEffect(() => {
    if (results.length > 0 && !showResults) {
      setShowResults(true);
    } else if (results.length === 0) {
      setShowResults(false);
    }
  }, [results]);

  // When clicking on a result, redirect to the friend's profile
  const navigateToProfile = (friend_id) => {
    console.log("FRIEND ID :", friend_id);

    navigate(`/users/${friend_id}`);
  };

  
  return (
    <main>
      <div className='livesearch'>
        <SearchBar onSearch={term => setTerm(term)}/>
        {showResults && 
          (<div className='results-dropdown'>
            {results.map((result) => (
              <div className="dropdown-row" key={result.id} onMouseDown={() => navigateToProfile(result.id)}>
                <img className="result-picture" src={result.image_url} />
                <span>{result.first_name} {result.last_name}</span>
              </div>
            ))}
          </div>)}
      </div>
    </main>
  );
}
 
export default LiveSearch;