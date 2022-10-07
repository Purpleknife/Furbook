import { useEffect, useState, useCallback } from 'react'
import './SearchBar.scss';

const SearchBar = (props) => {
  // user input
  const [value, setValue] = useState("");

  // Prevent server overload by creating a 400ms timeout 
  // when user input changes.
  const useDebounce = (input, ms) => {
    const [debounced, setDebounced] = useState("");
  
    useEffect(() => {
      const timeout = setTimeout(() => setDebounced(input), ms);
      return () => clearTimeout(timeout);
    }, [input, ms]);
  
    return debounced;
  };

  // term = user input after being debounced
  const term = useDebounce(value, 400);

  // When term is changed, call onSearch, 
  // which then triggers the Axios call in the LiveSearch component.
  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);


  return (
    <section className="search">
      <form className="search-form" onSubmit={event => event.preventDefault()}>
        <input
          className="search-field"
          spellCheck="false"
          placeholder="Search for new friends..."
          name="search"
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button type="submit" className="search-button">
          <img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png?ezimgfmt=ng:webp/ngcb5" />
        </button>
      </form>
    </section>
  );

};

export default SearchBar;