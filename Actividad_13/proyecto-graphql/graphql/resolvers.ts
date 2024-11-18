import { users } from "./data";

const locations = [
    {
        zip: "17878",
        weather: "Sunny",
        tempC: "20",
        tempF: "70",
        friends: ["16787"],
    },
    {
        zip: "87878",
        weather: "Cloudy",
        tempC: "19",
        tempF: "69",
        friends: ["17878"],
    },
];

const resolvers = {
    Query: {
        weather: (_: unknown, { zip }: { zip: string }) => {
            const location = locations.find((loc) => loc.zip === zip);
            if (!location) return [];

            const friendsDetails = location.friends.map((friendZip) =>
                locations.find((loc) => loc.zip === friendZip)
            );

            return [
                {
                    ...location,
                    friends: friendsDetails,
                },
            ];
        },
        users: () => users,
    },
    Mutation: {
        weather: (_: unknown, { data }: { data: any }) => {
            const location = locations.find((loc) => loc.zip === data.zip);
            if (location) {
                Object.assign(location, data);
            } else {
                locations.push(data);
            }
            return locations;
        },
        addLocation: (_: unknown, { data }: { data: any }) => {
            const existingLocation = locations.find((loc) => loc.zip === data.zip);
            if (existingLocation) {
                throw new Error(`Location with zip ${data.zip} already exists.`);
            }
            locations.push(data);
            return locations;
        },
    },
};

export default resolvers;
