import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Alert, Box, Button, createTheme, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Link, Stack, TextField } from "@mui/material";
import { useEffect, useState, useContext, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { changeLocalStorage } from "../services/Storage";
import { AppContext } from "../context/AppContext";
import InfoIcon from "@mui/icons-material/Info";
import { DrawerContext } from "../components/MenuLateral";
import { Copyright } from "../components/Copyright";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../App.css";

export const PrimaryMainTheme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
});

const Login = () => {
    const navigate = useNavigate();
    const [alertBox, setAlertBox] = useState<ReactElement>();
    //================================================================================================
    // FORM LABEL STATES
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //================================================================================================
    //================================================================================================
    // REQUEST TO BACKEND TO VALIDATE LOGIN
    const validateUser = async (email: string, password: string) => {
        // const response: string[] = await login(email, password);
        const response: string[] = (() => ["1", "2"])();

        if (!response) {
            setAlertBox(
                <Alert
                    onClose={() => {
                        setAlertBox(<></>);
                    }}
                    severity="error"
                >
                    Email ou senha inválidos!
                </Alert>
            );
        } else {
            //setIsLoggedIn(true)
            setAlertBox(
                <Alert
                    onClose={() => {
                        setAlertBox(<></>);
                    }}
                    severity="success"
                >
                    Login Realizado!
                </Alert>
            );
        }
    };
    //================================================================================================
    //================================================================================================
    // DIALOG
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const closeDialog = () => {
        setOpenDialog(false);
    };
    //================================================================================================
    //================================================================================================
    // DRAWER
    const { toggleDrawerOn } = useContext(DrawerContext);
    useEffect(() => {
        toggleDrawerOn(false);
    }, []);
    //================================================================================================
    //================================================================================================
    // PASSWORD FIELD
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    //================================================================================================

    return (
        <Box className="bg">
            <Dialog onClose={closeDialog} open={openDialog}>
                <DialogTitle>Aviso:</DialogTitle>
                <DialogContent>
                    Esse site se dispõe de informações 100% públicas.
                </DialogContent>
            </Dialog>

            <Box
                paddingLeft={2}
                paddingTop={2}
                display="flex"
                justifyContent="flex-start"
            >
                {alertBox}
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                height="100vh"
            >
                <Container maxWidth="sm">
                    <Box className="glass">
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <InfoIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Stack padding={"50px"} spacing={2}>
                            <Typography
                                fontWeight="bold"
                                variant="h5"
                                component="h1"
                                gutterBottom
                            >
                                Login:
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                onChange={(event) => setPassword(event.target.value)}
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    validateUser(email, password);
                                }}
                            >
                                <Typography variant="subtitle1" component="h1" gutterBottom>
                                    Sign In
                                </Typography>
                            </Button>
                        </Stack>
                        <Box paddingLeft="50px" paddingBottom="50px">
                            <Link onClick={() => navigate("/signup")} underline="hover">
                                {"SignUp"}
                            </Link>
                        </Box>
                    </Box>
                </Container>
                <Copyright />
            </Box>
        </Box>
    );
};

export default Login;
