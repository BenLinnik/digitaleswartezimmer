import React from 'react';

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    paddingBottom: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "3vh",
    width: "100%",
}

var phantom = {
  display: 'block',
  height: '60px',
  width: '100%',
}

export default function Footer() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                Das digitale Wartezimmer, für weniger Stress<br />Entstanden im Rahmen des Hackathons "#WirVsVirus"<br/>
            </div>
        </div>
    )
}
