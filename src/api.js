const got = require("got");

const prefixUrl = "https://api.rtt.io/api/v1/json/searchv3";

function formatService(rawService) {
  const {
    locationDetail: {
      origin: [{ description: originDescription, publicTime: originTime }],
      destination: [
        { description: destinationDescription, publicTime: destinationTime }
      ],
      realtimePass
    },
    runningIdentity,
    atocName,
    isPassenger
  } = rawService;

  return {
    origin: {
      description: originDescription,
      time: originTime
    },
    destination: {
      description: destinationDescription,
      time: destinationTime
    },
    passingTime: realtimePass,
    identity: runningIdentity,
    atocName,
    isPassenger
  };
}

async function fetchServices(location) {
  try {
    const {
      body: { services }
    } = await got(location, {
      prefixUrl,
      responseType: "json",
      username: process.env.REAL_TIME_TRAINS_API_USERNAME,
      password: process.env.REAL_TIME_TRAINS_API_PASSWORD
    });

    return services
      .map(formatService)
      .sort(
        (serviceA, serviceB) => serviceA.passingTime - serviceB.passingTime
      );
  } catch (error) {
    console.error(error);

    throw new Error(`Error fetching services for ${location} location`);
  }
}

module.exports = { fetchServices };
