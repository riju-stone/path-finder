"use client"

import { useRef } from "react"

function GridComponent() {
    return <div className="h-[35px] w-[35px] border-[1px] border-gray-800 hover:bg-gray-400"></div>
}


export default function Home() {

    const gridRefs = useRef([]);

    const generateGrid = () => {
        let grid = []

        for (let i = 0; i < 20; i++) {
            let gridRow = []
            for (let j = 0; j < 20; j++) {
                gridRow.push(<GridComponent ref={e => gridRefs.current.push(e)} key={`block-${i}-${j}`} />)
            }

            grid.push(gridRow)
        }

        return grid
    }
    return (
        <div className="flex items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="h-full flex justify-center items-center">
                <div className="h-full w-full grid grid-cols-[repeat(20,_minmax(0,_1fr))] gap-1">
                    {generateGrid()}
                </div>
            </main>
        </div>
    );
}
