import { Color } from '../shared/types.ts';
import { WIDTH, PIXEL_SIZE } from '../shared/constants.ts';
import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export function Tiles ({ grid, selectedColor} : { grid: Signal<Color[]>, selectedColor: Color}) {
    useEffect(() => {
        const eventSource = new EventSource('/api/listen');
        eventSource.onmessage = (event) => {
            const { index, color } = JSON.parse(event.data);
            const gridValue = grid.value;
            grid.value = gridValue.with(index, color);
        }
        return () => eventSource.close();
    }, []);

    const updateGrid = async (index: number, selectedColor: Color) => {
        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'content_Type': 'aplication/json',
            },
            body: JSON.stringify({ index, color: selectedColor }),
        });

        if ( !response.ok) {
            console.error('Failed to update grid');
            return;
        }

        const { versionstamp }: { versionstamp: string } = await response.json();

        const gridValue = grid.value;
        grid.value = gridValue.with(index, selectedColor);}
    return (
        <div className='grid' style={{ width: `${WIDTH * PIXEL_SIZE}px`, gridTemplateColumns: `repeat(${WIDTH}, 1fr)` }}>
            {
                grid.value.map((color, index) => (
                    <div
                        style={{ width: `${PIXEL_SIZE}px`, height: `${PIXEL_SIZE}px`, backgroundColor: `${color}` }}
                        onClick={()=> updateGrid(index, selectedColor)}
                    />
                ))
            }
        </div>
    )
}