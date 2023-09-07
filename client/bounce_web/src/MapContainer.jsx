import { React, useEffect, useRef } from 'react'



const locations = ["Bounce 123 Galaxy Boulevard Etobicoke", "40 Barrington Crescent Brampton", "48 Lanark Circle Brampton", "52 Woolgar Avenue Etobicoke", "17 Nagel Road North York", "611 Vaughan Rd Toronto", "83 Avondale Avenue North York", "2864 keele street Toronto", "19 Blaney Crescent North York", "3903 Oland Drive Mississauga", "4149 Chadburn crescent Mississaga", "3 Scarlettwood Court Etobicoke", "10 Knightsbridge Road Brampton", "47 Rowse Cres Etobicoke", "2700 Eglinton ave w Toronto", "25 Colonel Bertram Road Brampton", "134 rotondo cres Kleinburg", "2 Fernwood Rd Toronto"]

const mapData = {
    "result": {
        "0": {
            "path": [
                0,
                12,
                1,
                15,
                16,
                0
            ],
            "Total Distance in meters": 77022
        },
        "1": {
            "path": [
                0,
                2,
                9,
                10,
                3,
                0
            ],
            "Total Distance in meters": 91897
        },
        "2": {
            "path": [
                0,
                8,
                4,
                7,
                6,
                0
            ],
            "Total Distance in meters": 52031
        },
        "3": {
            "path": [
                0,
                14,
                17,
                5,
                11,
                0
            ],
            "Total Distance in meters": 36405
        },
        "4": {
            "path": [
                0,
                13,
                0
            ],
            "Total Distance in meters": 13071
        }
    },
    "locationsLatLong": [
        [
            43.6811345,
            -79.58786719999999
        ],
        [
            43.7331442,
            -79.7901081
        ],
        [
            43.6698073,
            -79.82452409999999
        ],
        [
            43.6254419,
            -79.5213502
        ],
        [
            43.7281104,
            -79.50652629999999
        ],
        [
            43.6923105,
            -79.4398415
        ],
        [
            43.75906,
            -79.4055245
        ],
        [
            43.7321029,
            -79.48387869999999
        ],
        [
            43.75448249999999,
            -79.5219838
        ],
        [
            43.5471904,
            -79.7442815
        ],
        [
            43.538633,
            -79.7047171
        ],
        [
            43.69285989999999,
            -79.51591049999999
        ],
        [
            43.71967859999999,
            -79.71652809999999
        ],
        [
            43.6913426,
            -79.5435483
        ],
        [
            43.6899032,
            -79.478518
        ],
        [
            43.7292381,
            -79.8164242
        ],
        [
            43.83689080000001,
            -79.6534341
        ],
        [
            43.70358419999999,
            -79.4359479
        ]
    ]
}

const MapContainer = ({
    center,
    zoom,
}) => {

    const ref = useRef();

    useEffect(() => {
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
                    ariaLabel: "Bounce123",
                });

                let deliveryLocation = new window.google.maps.Marker({
                    position: { lat: locationsLatLong[mapData["result"][i].path[j]][0], lng: locationsLatLong[mapData["result"][i].path[j]][1] },
                    title: "Bounce123",
                });
                deliveryLocation.setMap(map)

                infowindow.addListener("click", () => {
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
