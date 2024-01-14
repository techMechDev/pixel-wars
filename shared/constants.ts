export const WIDTH = 64
export const HEIGHT = 64
export const BOARDGAME = WIDTH * HEIGHT

export const PIXEL_SIZE = 32

export const COLORS_NAMES = {
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#ffff00',
    brightBlue: '#00FFFF',
    pink: '#FF00FF',
    white: '#FFFFFF',
    black: '#000000',
} as const;

export const COLORS = Object.values(COLORS_NAMES)

export const KEYS = {
    tiles: 'tiles',
} as const;

export const CHANNELS = {
    PIXEL_UPDATE: 'pixel-update',
}as const;