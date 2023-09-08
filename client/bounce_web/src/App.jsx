import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapContainer from './MapContainer'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { Wrapper, Status, Spinner, ErrorComponent } from "@googlemaps/react-wrapper";



function App() {
  const [routingdata, setRoutingdata] = useState('xxx')

  return (
    <Router>
      <Routes>
        <Route path='/map' element={<MapComponent props={routingdata} />}></Route>
        <Route path='/find' element={<AddLocations props={setRoutingdata} />}></Route>
      </Routes>

    </Router>

  )
}


const MapComponent = ({ props }) => {
  const center = { lat: 43.6811345, lng: -79.58786719999999 };
  const zoom = 11;
  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <h1>Wait....</h1>;
      case Status.FAILURE:
        return <h1>Wait....</h1>;
      case Status.SUCCESS:
        return <MapContainer center={center} zoom={zoom} mapData={props} />;
    }
  };
  return (
    <div>
      <div className='map_main'>
        <Wrapper apiKey={"AIzaSyANu4rP79yzZDjyHT3ExDgGb_6gh9IxbwE"} render={render} >
        </Wrapper>
      </div>
    </div>
  )
}
const AddLocations = ({ props }) => {
  const [locations, setLocations] = useState(["Bounce 123 Galaxy Boulevard Etobicoke", "40 Barrington Crescent Brampton", "48 Lanark Circle Brampton", "52 Woolgar Avenue Etobicoke", "17 Nagel Road North York", "611 Vaughan Rd Toronto", "83 Avondale Avenue North York", "2864 keele street Toronto", "19 Blaney Crescent North York", "3903 Oland Drive Mississauga", "4149 Chadburn crescent Mississaga", "3 Scarlettwood Court Etobicoke", "10 Knightsbridge Road Brampton", "47 Rowse Cres Etobicoke", "2700 Eglinton ave w Toronto", "25 Colonel Bertram Road Brampton", "134 rotondo cres Kleinburg", "2 Fernwood Rd Toronto"]);
  const navigate = useNavigate();

  const handleClick = async () => {

    const response = await fetch('http://127.0.0.1:8000/api/routing/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locations })
    });
    // Todo: Create a type for the response that you get back from the server
    const data = await response.json();


    if (data) {
      props(data)
      navigate("/map");
    } else {
      alert("Error");
    }
  };

  return (
    <div>
      <div>
        <h2>Assign Locations</h2>
        <input type='textarea' value={locations} onChange={(e) => setLocations(e.target.value)} placeholder='Locations' />
        <button onClick={handleClick}>Find</button>
      </div>
    </div>
  )
}

export default App
