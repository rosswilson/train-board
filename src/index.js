require("dotenv").config();

const { fetchServices } = require("./api");

async function start() {
  const services = await fetchServices("MAGOR");

  console.log(JSON.stringify(services, null, 2));
}

start().catch(error => console.error(error));
