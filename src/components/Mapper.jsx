import React from "react";
import { Map, TileLayer } from 'react-leaflet';

export default function Mapper(props) {
    return (
        <Map center={[props.latitude, props.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />
        </Map>
    )
}