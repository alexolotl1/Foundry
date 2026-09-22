import { createTheme } from "@mui/material/styles";

// MUI's color utilities (alpha/lighten/darken) parse these and choke on
// var(...) strings, so they stay real hex matching the default (deep-blue)
// palette. CssBaseline's body background is overridden by the higher-
// specificity `html body` rule in globals.css, which does track the
// CSS variables — see the comment there for how ThemeSwitcher stays in sync.
const tokens = {
  bg: "#012248",
  surface: "#0e3a72",
  text: "#e2e7ee",
  textMuted: "#b9c5d8",
  gold: "#dfae00",
  border: "#2c5b96",
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
      contrastText: tokens.bg,
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
