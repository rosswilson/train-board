require("dotenv").config();

const { fetchServices } = require("./api");

async function start() {
  const [nextService] = await fetchServices("MAGOR");

  const {
    origin: { description: originDescription, time: originTime },
    destination: { description: destinationDescription },
    passingTime: realtimePass,
    atocName
  } = nextService;

  console.log(
    `Next train at ${realtimePass} (the ${atocName} ${originTime} from ${originDescription} to ${destinationDescription})`
  );
}

start().catch(error => console.error(error));
