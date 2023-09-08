import { React, useEffect, useRef } from 'react'



const locations = ["Bounce 123 Galaxy Boulevard Etobicoke", "40 Barrington Crescent Brampton", "48 Lanark Circle Brampton", "52 Woolgar Avenue Etobicoke", "17 Nagel Road North York", "611 Vaughan Rd Toronto", "83 Avondale Avenue North York", "2864 keele street Toronto", "19 Blaney Crescent North York", "3903 Oland Drive Mississauga", "4149 Chadburn crescent Mississaga", "3 Scarlettwood Court Etobicoke", "10 Knightsbridge Road Brampton", "47 Rowse Cres Etobicoke", "2700 Eglinton ave w Toronto", "25 Colonel Bertram Road Brampton", "134 rotondo cres Kleinburg", "2 Fernwood Rd Toronto"]



const MapContainer = ({
    center,
    zoom,
    mapData
}) => {

    const ref = useRef();

    useEffect(() => {
        console.log(mapData)
        let strokeColors = ["#FF0000", "#68FF33", "#33D7FF", "#CA33FF", "#FF33AC", "#5B4B7F", "#E2E25E", "#07F6F6"]
        let locationsLatLong = mapData['locationsLatLong']

        const map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
        })
        let vehiclePaths = [];


        const contentString = "Bounce 123";
        const headQuarterInfoWindow = new window.google.maps.InfoWindow({
            content: contentString,
            ariaLabel: "Bounce123",
        });
        let headquarters = new window.google.maps.Marker({
            position: { lat: 43.6811345, lng: -79.58786719999999 },
            title: "Bounce123",
        });
        headquarters.setMap(map)
        headQuarterInfoWindow.open({
            anchor: headquarters,
            map,
        });




        for (let i = 0; i < Object.keys(mapData['result']).length; i++) {
            let path = []
            for (let j = 0; j < mapData["result"][i].path.length; j++) {
                path[j] = { lat: locationsLatLong[mapData["result"][i].path[j]][0], lng: locationsLatLong[mapData["result"][i].path[j]][1] }
                let infowindow = new window.google.maps.InfoWindow({
                    content: locations[mapData["result"][i].path[j]],
                });

                let deliveryLocation = new window.google.maps.Marker({
                    position: { lat: locationsLatLong[mapData["result"][i].path[j]][0], lng: locationsLatLong[mapData["result"][i].path[j]][1] },
                    title: "Bounce123",
                });
                deliveryLocation.setMap(map)

                deliveryLocation.addListener("click", () => {
                    infowindow.open({
                        anchor: deliveryLocation,
                        map,
                    });
                });




            }

            vehiclePaths[i] = path
            let flightPath = new window.google.maps.Polyline({
                path: vehiclePaths[i],
                geodesic: true,
                strokeColor: strokeColors[i],
                strokeOpacity: 1.0,
                strokeWeight: 3,
            });


            flightPath.setMap(map);

        }



    });

    return <div ref={ref} id="map" style={{ width: 1200, height: 700 }} />;
}

export default MapContainer
