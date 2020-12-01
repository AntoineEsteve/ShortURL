import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff5b7d',
            main: '#ee0e51',
            dark: '#b40029',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#646464',
            main: '#3a3a3a',
            dark: '#141414',
            contrastText: '#ffffff',
        },
    },
})
