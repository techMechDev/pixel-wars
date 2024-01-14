import { type Signal } from "@preact/signals";
import { COLORS } from '../shared/constants.ts';
import { Color } from '../shared/types.ts';

export function ColorPicker ( {selected}: {selected: Signal<Color>} ) {

    return (
        <footer className={'flex gap-8'}>
            <div className={'flex fixed bottom-4 justify-center left-0 right-0 gap-x-1'}>
                {
                    COLORS.map (color => <button
                            className={`w-8 h-8 border-4 ${selected.value == color && 'border-white' || 'border-gray-800'}`}
                            style={{ backgroundColor: `${color}` }}
                            onClick={()=> selected.value = color}
                        />)
                }
            </div>
        </footer>
    )
}