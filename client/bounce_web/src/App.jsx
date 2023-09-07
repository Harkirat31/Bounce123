import './App.css'
import MapContainer from './MapContainer'

import { Wrapper, Status, Spinner, ErrorComponent } from "@googlemaps/react-wrapper";

const center = { lat: 43.6811345, lng: -79.58786719999999 };
const zoom = 11;
const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <h1>Wait....</h1>;
    case Status.FAILURE:
      return <h1>Wait....</h1>;
    case Status.SUCCESS:
      return <MapContainer center={center} zoom={zoom} />;
  }
};

function App() {

  return (
    <div className='map_main'>
      <Wrapper apiKey={"AIzaSyANu4rP79yzZDjyHT3ExDgGb_6gh9IxbwE"} render={render} >
      </Wrapper>
    </div>

  )
}

export default App
