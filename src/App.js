import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useRef} from "react";
import SelectSearch from "react-select-search";
import TextField from "@mui/material/TextField";
import cities from 'cities.json';
// for (var i = 0; i < cities.length; i++) {
//   console.log(cities.length)
// }
const options = [];
for (var i = 0; i < cities.length; i++) {
  options.push({name:cities[i]['name'],value:i,country:cities[i]['country'],lat:cities[i]['lat'],lng:cities[i]['lng']})
  if(i==100){
    break
  }
}
function App() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [listRs, setRs] = useState([]);
  const searchInput = useRef();
  const handleChange = (...args) => {
    var id = args['0']
    setName(options[id]['name']);
    setCountry(options[id]['country']);
    setLat(options[id]['lat']);
    setLng(options[id]['lng']);
    setRs([{'id':id,'name':options[id]['name'],'country':options[id]['country'],'lat':options[id]['lat'],'lng':options[id]['lng']}])
  };
  const handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return options;
      }
      const updatedItems = items.filter((item)=> {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      return updatedItems;
    };
  };
  function RenderingArrayOfObjects() {
    const listItems = listRs.map(
        (element) => {
            return (
              <table>
              <tr>
                <th>ID</th>
                <th>Country</th>
                <th>Name</th>
                <th>Lat</th>
                <th>Lng</th>
              </tr>

                  <tr>
                    <td>{element.id}</td>
                    <td>{element.country}</td>
                    <td>{element.name}</td>
                    <td>{element.lat}</td>
                    <td>{element.lng}</td>
                  </tr>

            </table>
            )
        }
    )
    return (
        <div>
            {listItems}
        </div>
    )
}
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Search city</h1>
        <SelectSearch
        ref={searchInput}
        options={options}
        filterOptions={handleFilter}
        value=""
        name="Workshop"
        placeholder="HaNoi, LaoCai, ...."
        search
        onChange={handleChange}
      />
      <RenderingArrayOfObjects />

      </header>
    </div>
  );
}

export default App;
