import app from "./app.js";
import connectDb from "./database/database.js";
import _config from "./config.js";

const port = _config.port || 6000;

connectDb();
app.listen(port, () => {
	console.log(`Server is running ar port ${port}`);
});
