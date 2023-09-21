import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapContainer from './MapContainer'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import config from './config';
import { Wrapper, Status, Spinner, ErrorComponent } from "@googlemaps/react-wrapper";
import SignIn from './SignIn';



function App() {
  const [routingdata, setRoutingdata] = useState('xxx')

  return (
    <Router>
      <Routes>
        <Route path='' element={<SignIn></SignIn>}></Route>
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
  const [locations, setLocations] = useState('');
  const [locationssize, setLocatiossize] = useState(0)
  const [driversize, setDriverSize] = useState(0)
  const [driversvehiclecapacity, setDriversvehiclecapacity] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const apiUrl = config.apiUrl;

  function onChangeAddresses(e) {
    setLocations(e.target.value)
    if (locations && locations != null && locations != "") {
      setLocatiossize(locations.split("\n").filter((element) => element.length != 0).length)
    }

  }

  function onChangeVehicleCapacity(e) {
    setDriversvehiclecapacity(e.target.value)
  }

  const handleClick = async () => {
    setLoading(true)
    let deliveryLocations = locations.split("\n")
    deliveryLocations.unshift("Bounce 123 Galaxy Boulevard Etobicoke")
    deliveryLocations = deliveryLocations.filter((element) => element.length != 0)
    console.log(deliveryLocations)
    console.log(driversize)
    let driversvehiclecapacityinInt = driversvehiclecapacity.split(',').map((e) => parseInt(e))
    console.log(driversvehiclecapacityinInt)

    const response = await fetch(`${apiUrl}/api/routing/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token") 
      },
      body: JSON.stringify({ "locations": deliveryLocations, "driverSize": parseInt(driversize), "vehiclesCapacity": driversvehiclecapacityinInt })
    });
    // Todo: Create a type for the response that you get back from the server
    if (!response.ok) {
      if (response.status === 401) {
        // Handle 401 status (Unauthorized) - redirect to login page or display an error message
        console.log('Unauthorized: Please log in.');
      } else {
        // Handle other non-OK status codes as generic errors
        console.log(`HTTP error! Status: ${response.status}`);
      }
    }
    else {
      const data = await response.json();
      setLoading(false)

      if (data) {
        console.log(data)
        props(data)
        navigate("/map");
      } else {
        alert("Error");
      }
    }

  };

  return (
    <div>
      <div>
        <h2>Assign Locations</h2>
        <textarea style={{ width: 500, height: 200 }} value={locations} onChange={onChangeAddresses} rows={5}
          cols={5} placeholder='Locations' />
        <br></br>
        <p>Total Locations :{locationssize}</p>
        <div>
          <p style={{ display: 'inline-block' }}>Drivers Strength:</p>  <input value={driversize} onChange={(e) => setDriverSize(e.target.value)}></input>
        </div>
        <br></br>
        {driversize > 0 &&
          <div>
            <p style={{ display: 'inline-block' }}>Enter Each Driver Capacity separated by comma:</p> <input value={driversvehiclecapacity} onChange={onChangeVehicleCapacity} ></input>
          </div>
        }
        {loading &&
          <div>
            <p style={{ display: 'inline-block' }}>Please Wait....</p>
          </div>
        }

        <button onClick={handleClick}>Find Paths</button>
      </div>
    </div>
  )
}

export default App




