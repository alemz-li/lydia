import app from "./app.js";
import { PORT } from "./config.js";
import { connectDb } from "./db.js";

connectDb();
app.listen(PORT, console.log(`Listening on port ${PORT}`));
