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
            <Toolbar>
                <IconButton size="large" color="inherit" edge="start" aria-label="logo" >
                    <NotStartedIcon fontSize="large" />
                </IconButton>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: "Segoe UI",
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: " #fff",
                        textShadow: "1px 1px 4px #6366f1",
                    }}
                >
                    Vid Craft
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        color="inherit"
                        sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "18px",
                            '&:hover': { background: "#818cf8" }
                        }}
                    >
                        Converter
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "18px",
                            '&:hover': { background: "#818cf8" }
                        }}
                    >
                        Downloader
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}