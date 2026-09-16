import { createTheme } from "@mui/material/styles";

export const tokens = {
  bg: "#0e1621",
  surface: "#15202c",
  surface2: "#1b2836",
  border: "#28394a",
  borderStrong: "#3d5570",
  text: "#e8edf3",
  textMuted: "#96a7b8",
  textFaint: "#5e7185",
  gold: "#d9a354",
  goldSoft: "#8c723f",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: tokens.bg,
      paper: tokens.surface,
    },
    text: {
      primary: tokens.text,
      secondary: tokens.textMuted,
    },
    primary: {
      main: tokens.gold,
      contrastText: "#14100a",
    },
    divider: tokens.border,
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily: "var(--font-body)",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
  },
});
