import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { changeLocalStorage, deleteLocalStorage } from "../services/Storage";
import InfoIcon from "@mui/icons-material/Info";
import { DrawerContext } from "../components/MenuLateral";
import { Copyright } from "../components/Copyright";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PrivacyPolicy } from "../components/_SignUp/PrivacyPolicy";
import { UseTerms } from "../components/_SignUp/UseTerms";
import "../App.css";
import FormDialog from "../components/Dialog";

interface ISignupContext {
    openDialog: boolean;
    setOpendialog: (openDialog: boolean) => void;
}

interface Profile {
    id_profile: string;
    nickname: string;
}

interface User {
    name: string;
    email: string;
    password: string;
    profile: Profile;
}

export const SignupContext = createContext({} as ISignupContext);

const Signup = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const { setOpen } = useContext(AppContext);
    //================================================================================================
    // LABELS STATE
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    //================================================================================================
    //================================================================================================
    // CONTEXT
    const { setOpendialog } = useContext(AppContext);
    const { openDialog } = useContext(AppContext);
    const { setButtonpress } = useContext(AppContext);
    const { buttonPress } = useContext(AppContext);
    //================================================================================================
    //================================================================================================
    // REGEX EMAIL VALIDATE
    function isValidEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //================================================================================================
    //================================================================================================
    // REGISTER USER FUNCTION
    const createUser = async (name: string, email: string, senha: string) => {
        const EmailValid = isValidEmail(email);

        if (!EmailValid) {
            alert("email invalido");
        } else {
            if (!name || !email || !senha) {
                setAlertBox(
                    <Alert
                        onClose={() => {
                            setAlertBox(<></>);
                        }}
                        severity="error"
                    >
                        Preencha todos os dados!
                    </Alert>
                );
            } else {
                if (senha.split("").length !== 8) {
                    setAlertBox(
                        <Alert
                            onClose={() => {
                                setAlertBox(<></>);
                            }}
                            severity="error"
                        >
                            A senha deve ter 8 digitos!
                        </Alert>
                    );
                } else {
                    const loggedIn = (() => true)();

                    if (loggedIn) {
                        setOpendialog(true);
                        postUser()
                    } else {
                        setAlertBox(
                            <Alert
                                onClose={() => {
                                    setAlertBox(<></>);
                                }}
                                severity="error"
                            >
                                O email informado já existe!
                            </Alert>
                        );
                    }
                }
            }
        }
    };
    //================================================================================================

    const postUser = async () => {
        deleteLocalStorage();

        setOpen(true);
        const usuario = (() => {
            return { name, email, password, nickname };
        })();

        changeLocalStorage({
            token: "",
            isLoggedIn: false,
            profile: { id_profile: "", nickname: "" },
            channels: [],
            accounts: [],
        });

        setUser({
            token: "",
            isLoggedIn: false,
            profile: { id_profile: "", nickname: "" },
            channels: [],
            accounts: [],
        });

        setOpen(false);
        setAlertBox(
            <Alert
                onClose={() => {
                    setAlertBox(<></>);
                }}
                severity="success"
            >
                Usuário Criado!
            </Alert>
        );
        navigate("/pay");
    };

    const [openDialog2, setOpenDialog2] = useState<boolean>(false);

    const closeDialog = () => {
        setOpenDialog2(false);
    };

    const [openTerms, setOpenTerms] = useState<boolean>(false);

    const closeTerms = () => {
        setOpenTerms(false);
    };

    const { toggleDrawerOn } = useContext(DrawerContext);
    useEffect(() => {
        toggleDrawerOn(false);
    }, []);

    //================================================================================================
    // PASSWORD FIELD
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    //================================================================================================

    const [alertBox, setAlertBox] = useState<any>();
    const [terms, setTerms] = useState<ReactElement>(
        <PrivacyPolicy key="privacy" />
    );

    return (
        <SignupContext.Provider value={{ openDialog, setOpendialog }}>
            <Box className="bg">
                <Dialog onClose={closeDialog} open={openDialog2}>
                    <DialogTitle>Aviso:</DialogTitle>
                    <DialogContent>
                        Esse site se dispõe de informações 100% públicas.
                    </DialogContent>
                </Dialog>

                <Dialog onClose={closeTerms} open={openTerms}>
                    <DialogTitle>
                        {terms.key === "terms" ? (
                            <Button disabled>USE TERMS</Button>
                        ) : (
                            <Button onClick={() => setTerms(<UseTerms key="terms" />)}>
                                USE TERMS
                            </Button>
                        )}

                        {terms.key === "privacy" ? (
                            <Button disabled>PRIVACY POLICY</Button>
                        ) : (
                            <Button onClick={() => setTerms(<PrivacyPolicy key="privacy" />)}>
                                PRIVACY POLICY
                            </Button>
                        )}
                    </DialogTitle>
                    <DialogContent>{terms}</DialogContent>
                </Dialog>

                <FormDialog>
                    <Stack spacing={1}>
                        <DialogContentText>Add your nickname:</DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="nickname"
                            variant="outlined"
                            value={nickname}
                            onChange={(event) => setNickname(event.target.value)}
                        />
                    </Stack>
                </FormDialog>
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
                                <IconButton onClick={() => setOpenDialog2(true)}>
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Stack padding={"50px"} spacing={2}>
                                <Typography fontWeight="bold" variant="h5" gutterBottom>
                                    Create User:
                                </Typography>
                                <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <TextField
                                    id="email"
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
                                        createUser(name, email, password);
                                    }}
                                >
                                    <Typography variant="subtitle1" gutterBottom>
                                        Sign Up
                                    </Typography>
                                </Button>
                                <Typography variant="subtitle2">
                                    By creating the account you agree to the
                                    <Tooltip
                                        onClick={() => {
                                            setOpenTerms(true);
                                            setTerms(<UseTerms key="terms" />);
                                        }}
                                        title="Termos de Uso"
                                        arrow
                                    >
                                        <Button size="small">
                                            <u>USE TERMS</u>
                                        </Button>
                                    </Tooltip>
                                    and the
                                    <Tooltip
                                        onClick={() => {
                                            setOpenTerms(true);
                                            setTerms(<PrivacyPolicy key="privacy" />);
                                        }}
                                        title="Políticas de Privacidade"
                                        arrow
                                    >
                                        <Button size="small">
                                            <u>PRIVACY POLICY</u>
                                        </Button>
                                    </Tooltip>
                                </Typography>
                            </Stack>
                        </Box>
                    </Container>
                    <Copyright />
                </Box>
            </Box>
        </SignupContext.Provider>
    );
};

export default Signup;
