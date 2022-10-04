import { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchBar.scss';

const SearchBar = (props) => {

  const [value, setValue] = useState("");

  const useDebounce = (input, ms) => {
    const [debounced, setDebounced] = useState("");
  
    useEffect(() => {
      const timeout = setTimeout(() => setDebounced(input), ms);
      return () => clearTimeout(timeout);
    }, [input, ms]);
  
    return debounced;
  };

  const term = useDebounce(value, 400);

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
          placeholder="Search Users"
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