import 'whatwg-fetch';

let AirCheapAPI = {
    fetchAirports(){
        fetch('airports.json')
            .then((response) => response.json())
            .then((responseData) => {

            })
            .catch((error) => {

            })
    }
};

export default AirCheapAPI;