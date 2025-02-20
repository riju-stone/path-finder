import express from "express"
import cors from "cors"
import findPath from "./dfs.js"

const PORT = "3000"

const app = express()

app.use(cors())
app.use(express.json())

// Route to find path using dfs
app.post("/find-path", (req, res) => {
    console.log("Find Path endpoint called: ", req.body)
    let payload = req.body
    let path = findPath(payload.start, payload.end)
    res.status(200).json({ "mssg": "success", "path": JSON.stringify(path) })
})

app.listen(PORT, () => {
    console.log(`Server listening on port localhost:${PORT}`)
})


