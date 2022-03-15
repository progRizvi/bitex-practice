import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 8000;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6doss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(url);

async function run() {
	try {
		await client.connect();
		const database = client.db("stories");
		const stories = database.collection("stories");
		app.get("/stories/", async (req, res) => {
			const result = await stories.find({}).toArray();
			res.status(200).json(result);
		});
		app.delete("/stories/", async (req, res) => {
			const result = await stories.deleteMany({});
			res.status(200).json(result);
		});
	} catch (error) {
		console.error(error);
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(port, () => {
	console.log("Server started on port", port);
});
