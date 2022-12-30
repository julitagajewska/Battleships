import React from 'react';
import GridRow from './GridRow';
import './Grid.css'

export default function Grid(props) {

    const dragEnter = (e) => {
        // console.log(`Dragged over tile [${e.target.id}]`)
    }

    const dragDrop = (e) => {

        // Sprawdź czy e.target.id jest w props.tilesNotAllowed
        
        


    }

    return (
        <div className={`${props.type}-grid`}>
            {props.tiles.map((tile) => {
                return (
                    <div
                        className={`tile ${tile.shipType}`}
                        key={tile.id}
                        id={tile.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDragEnter={dragEnter}
                        onDrop={dragDrop}>
                    </div>
                )
            })}

        </div>
    )
}