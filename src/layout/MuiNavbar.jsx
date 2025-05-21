import { AppBar, Button, IconButton, Stack, Toolbar, Typography, Box } from "@mui/material";
import NotStartedIcon from '@mui/icons-material/NotStarted';

export default function Navbar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                background: "linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)",
                boxShadow: 3,
            }}
            elevation={4}
        >
            <Toolbar
    sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-end", sm: "center" },
        gap: { xs: 1, sm: 0 },
        minHeight: { xs: 64, sm: 72 },
        px: { xs: 1, sm: 2 }
    }}
>
    <Box sx={{ display: "flex", alignItems: "center", width: { xs: "100%", sm: "auto" }, flexGrow: 1 }}>
        <IconButton size="large" color="inherit" edge="start" aria-label="logo" sx={{ mr: 1 }}>
            <NotStartedIcon fontSize="large" />
        </IconButton>
        <Typography
            variant="h5"
            component="div"
            sx={{
                fontFamily: "Segoe UI",
                fontWeight: 700,
                letterSpacing: 1,
                color: "#fff",
                textShadow: "1px 1px 4px #6366f1",
                flexGrow: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem" }
            }}
        >
            Vid Craft
        </Typography>
    </Box>
    <Stack
        direction="row"
        spacing={1}
        sx={{
            mt: { xs: 1, sm: 0 },
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "center", sm: "flex-end" },
            flexGrow: { xs: 0, sm: 1 }
        }}
    >
        <Button
            color="inherit"
            sx={{
                fontWeight: "bold",
                textTransform: "none",
                fontSize: { xs: "1rem", sm: "1.125rem" },
                px: { xs: 1, sm: 2 },
                width: { xs: "50%", sm: "auto" },
                '&:hover': { background: "#818cf8" }
            }}
            fullWidth={true}
        >
            Converter
        </Button>
        <Button
            color="inherit"
            sx={{
                fontWeight: "bold",
                textTransform: "none",
                fontSize: { xs: "1rem", sm: "1.125rem" },
                px: { xs: 1, sm: 2 },
                width: { xs: "50%", sm: "auto" },
                '&:hover': { background: "#818cf8" }
            }}
            fullWidth={true}
        >
            Downloader
        </Button>
    </Stack>
</Toolbar>
        </AppBar>
    );
}