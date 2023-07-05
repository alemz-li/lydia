const allowedOrigins = ["http://localhost:5173"];
export const PORT = 5000;
export const TOKEN_SECRET = "aSomeRand0mSecret00";
export const CORS_OPTIONS = {
  origin: (origin, callback) => {
    // remove second condition to not allow applications like POSTMAN to make requests
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
