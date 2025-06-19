import fs from "node:fs/promises";

export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query;

  async function loadOpinions() {
    try {
      const dbFileData = await fs.readFile("db.json");
      const parsedData = JSON.parse(dbFileData);
      return parsedData.opinions;
    } catch (error) {
      return [];
    }
  }

  async function saveOpinion(opinion) {
    const opinions = await loadOpinions();
    const newOpinion = { id: new Date().getTime(), votes: 0, ...opinion };
    opinions.unshift(newOpinion);
    await fs.writeFile(
      "backend/db.json",
      JSON.stringify({ opinions }, null, 2)
    );
    return newOpinion;
  }

  async function voteOpinion(id, type) {
    const opinions = await loadOpinions();
    const opinion = opinions.find((o) => o.id === Number(id));
    if (!opinion) return null;
    type === "up" ? opinion.votes++ : opinion.votes--;
    await fs.writeFile(
      "backend/db.json",
      JSON.stringify({ opinions }, null, 2)
    );
    return opinion;
  }

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") return res.status(200).end(); // Preflight

  try {
    if (method === "GET") {
      const opinions = await loadOpinions();
      return res.status(200).json(opinions);
    } else if (method === "POST" && !id) {
      const { userName, title, body } = req.body;
      if (!userName || !title || !body) {
        return res.status(400).json({ error: "Missing fields" });
      }
      const newOpinion = await saveOpinion({ userName, title, body });
      return res.status(201).json(newOpinion);
    } else if (method === "POST" && id && req.url.includes("upvote")) {
      const opinion = await voteOpinion(id, "up");
      if (!opinion) return res.status(404).json({ error: "Opinion not found" });
      return res.status(200).json(opinion);
    } else if (method === "POST" && id && req.url.includes("downvote")) {
      const opinion = await voteOpinion(id, "down");
      if (!opinion) return res.status(404).json({ error: "Opinion not found" });
      return res.status(200).json(opinion);
    } else {
      return res.status(405).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
