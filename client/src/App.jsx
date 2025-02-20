import React, { useEffect, useState } from "react"


const GRID_SIZE = 20

function App() {
    const [grid, setGrid] = useState([])
    const [startCell, setStartCell] = useState(null)
    const [endCell, setEndCell] = useState(null)
    const [path, setPath] = useState([])

    useEffect(() => {
        const initialGrid = new Array(GRID_SIZE).fill().map(() => new Array(GRID_SIZE).fill(0))
        setGrid(initialGrid)
    }, [])

    const handleCellClick = (r, c) => {
        if (!startCell) {
            setStartCell([r, c])
        } else {
            setEndCell([r, c])
        }
    }

    const handleApi = async () => {
        console.log("Calling API for Start: ", startCell, " End: ", endCell)
        const res = await fetch("http://localhost:3000/find-path", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "start": startCell,
                "end": endCell
            })
        }).then((res) => res.json())

        console.log(JSON.parse(res.path))
        if (res.path) {
            setPath(res.path)
        }
    }

    const handleGridReset = () => {
        setStartCell(null)
        setEndCell(null)
        setPath([])
    }

    const renderGrid = (r, c) => {
        if (startCell && startCell[0] == r && startCell[1] == c) return "start-cell"
        else if (endCell && endCell[0] == r && endCell[1] == c) return "end-cell"
        else if (path.includes([r, c])) return "path-cell"
        else return ""
    }

    return <div className="app">
        <div className="header">
            <h1>PathFinder</h1>
            <button onClick={() => handleApi()}>Start</button>
            <button onClick={() => handleGridReset()}>Reset</button>
        </div>
        <div className="grid">
            {grid.map((row, r) => {
                return <div className="row" key={r}>
                    {row.map((_, c) => {
                        return <div key={c} className={`cell ${renderGrid(r, c)}`} onClick={() => handleCellClick(r, c)}></div>
                    })}
                </div>
            })}
        </div>
    </div >
}

export default App
