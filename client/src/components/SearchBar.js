import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const products = useSelector((state) => state.products.products);
  const filteredItems = [];
    
  var re = new RegExp(searchValue, "ig");
  products.forEach((item) => {
    if (item.type.search(re) !== -1) {
      filteredItems.push(item);
    }
  });
  
  return (
    <div className="search-bar">
      <input
        className='search-input'
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Enter type of product'
      />
      
        
      
      <div className="search-items" style={!searchValue ?{display: 'none'}: {display:'block'}} >
        {filteredItems.map((item, num) => (
            <li key={num}>
            <Link className='item' to={`/${item.type}/${item._id}`} >
          
          <p><img src={item.url} alt={item.type}/>
            {item.title}</p>
            
          
          </Link>
          </li>
        ))}
      </div>
      
    </div>
  );
}

export default SearchBar;
