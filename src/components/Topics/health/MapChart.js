import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useZoomPan
} from "react-simple-maps";
import styles from './Health.module.css'
import Hospitals from './Hospitals';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ hospitals, city, cities }) => {

  const [showHospitals, setShowHospitals] = useState(false);

  const CustomZoomableGroup = ({ children, ...restProps }) => {
    const { mapRef, transformString, position } = useZoomPan(restProps);
    return (
      <g ref={mapRef}>
        <rect fill="transparent" />
        <g transform={transformString}>{children(position)}</g>
      </g>
    );
  };

  const openHospitalsList = () => {
    setShowHospitals(true);
  }

  return (
    <ComposableMap>
      <CustomZoomableGroup center={[0, 0]}>
        {position => (
          <>
            <Geographies geography={geoUrl}>
              {
                ({ geographies }) =>
                  geographies
                    .map(geo =>
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        stroke="#D6D6DA"
                      />
                    )
              }
            </Geographies>

            {cities && cities.map(c => {
              const isCurrentCity = c.name === city;

              return <Marker key={c.name} coordinates={c.cityCoor}>
                <circle
                  r={isCurrentCity ? (5 / position.k) : (3 / position.k)}
                  fill="#F24B6A"
                  stroke="#fff"
                  onClick={isCurrentCity ? () => openHospitalsList() : undefined}
                  className={isCurrentCity ? styles.pulse : undefined}
                />
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 10, fontWeight: 'bold' }}
                >
                  {isCurrentCity && c.name}
                </text>

                {(showHospitals && isCurrentCity) &&
                  <Hospitals
                    hospitals={hospitals}
                    open={showHospitals}
                    setOpen={setShowHospitals}
                    city={city}
                  />
                }
              </Marker>
            }
            )}
          </>
        )}

      </CustomZoomableGroup>
    </ComposableMap>

    // <ComposableMap>
    //   <Geographies geography={geoUrl}>
    //     {
    //       ({ geographies }) =>
    //         geographies
    //           .map(geo =>
    //             <Geography
    //               key={geo.rsmKey}
    //               geography={geo}
    //               fill="#EAEAEC"
    //               stroke="#D6D6DA"
    //             />
    //           )
    //     }
    //   </Geographies>

    //   {cities && cities.map(c => {
    //     const isCurrentCity = c.name === city;

    //     return <Marker key={c.name} coordinates={c.cityCoor}>
    //       <circle
    //         r={isCurrentCity ? 5 : 2}
    //         fill="#F24B6A"
    //         stroke="#fff"
    //         onClick={isCurrentCity ? () => openHospitalsList() : undefined}
    //         className={isCurrentCity ? styles.pulse : undefined}
    //       />
    //       <text
    //         textAnchor="middle"
    //         y={-12}
    //         style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 10, fontWeight: 'bold' }}
    //       >
    //         {isCurrentCity && c.name}
    //       </text>

    //       {(showHospitals && isCurrentCity) &&
    //         <Hospitals
    //           hospitals={hospitals}
    //           open={showHospitals}
    //           setOpen={setShowHospitals}
    //           city={city}
    //         />
    //       }
    //     </Marker>
    //   }
    //   )}
    // </ComposableMap>
  )
}

export default MapChart
