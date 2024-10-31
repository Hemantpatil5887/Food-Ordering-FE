const env = process.env.REACT_APP_ENV || "development";

const apiConfig = {
    title: "Food Ordering FE",
    development: {
        MAIN_URL: "//localhost:3000/",
        dashboard: "/",
        backendUrl: "//localhost:8080"
    }
};

module.exports = apiConfig[env];
