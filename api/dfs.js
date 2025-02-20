const GRID_SIZE = 20

const MOVEMENT = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
]

function dfs(start, end, path, visited) {

    let startR = Number(start[0])
    let startC = Number(start[1])

    if (startR < 0 || startR >= GRID_SIZE || startC < 0 || startC >= GRID_SIZE || visited.has(`${startR},${startC}`)) {
        return null
    }

    path.push([startR, startC])
    visited.add(`${startR},${startC}`)

    if (startR === Number(end[0]) && startC === Number(end[1])) {
        return path
    }

    let res = dfs([startR + 1, startC], end, path, visited) ||
        dfs([startR - 1, startC], end, path, visited) ||
        dfs([startR, startC + 1], end, path, visited) ||
        dfs([startR, startC - 1], end, path, visited)

    if (res) {
        return res
    }
    path.pop()
    // visited.delete(`${startR},${startC}`)
    return null
}

export default function findPath(startCell, endCell) {
    let visited = new Set()

    let finalPath = dfs(startCell, endCell, [], visited)
    return finalPath
}


