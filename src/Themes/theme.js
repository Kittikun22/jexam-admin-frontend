import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "'Prompt', sans-serif",
    },
    palette: {
        secondary: {
            main: '#015352',
        },
        warningOrange: {
            main: '#f57c00'
        },
        greenNeon: {
            main: '#a0d64b'
        },
        backButton: {
            main: '#0081B4'
        },
        whiteButton: {
            main: '#fff'
        },
        BlueGreen: {
            main: '#00425A'
        },
        GreyButton: {
            main: '#F0EEED'
        },
        DarkGreen: {
            main: '#064635'
        },
        ShamrockGreen: {
            main: '#009E60'
        }
    },
});

export default theme