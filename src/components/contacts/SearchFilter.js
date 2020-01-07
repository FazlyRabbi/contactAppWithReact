import React, { useContext, useState, useEffect } from 'react';
import { ContactContext } from '../../contexts/Contact.context';
const SearchFilter = () => {
  const context = useContext(ContactContext);
  const [searchText, setSearchText] = useState('');
  const { dispatch } = context;
  const handleChange = e => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    dispatch({
      type: 'SEARCH_FILTER',
      payload: searchText
    });
  }, [searchText, dispatch]);
  return (
    <nav>
      <div className='nav-wrapper white'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              value={searchText}
              onChange={handleChange}
              placeholder='Search...'
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};
export default SearchFilter;
