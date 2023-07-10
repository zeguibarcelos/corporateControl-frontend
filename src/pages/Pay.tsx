import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, SelectChangeEvent, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import '../App.css'

const Pay = () => {

    const theme = useTheme()
    const smDown: boolean = useMediaQuery(theme.breakpoints.down('sm'))

    //================================================================================================
    // STATES
    const [price, setPrice] = useState<number>(0)
    const [Channels, setChannels] = useState<ReactElement[]>()
    const [Accounts, setAccounts] = useState<ReactElement[]>()
    const [Channel, setChannel] = useState<string>('1')
    const [Account, setAccount] = useState<string>('1')
    const [tier, setTier] = useState<string>('')
    const [value1, setValue1] = useState<number>(0.65)
    const [value2, setValue2] = useState<number>(0.60)
    const [value3, setValue3] = useState<number>(0.50)
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    //================================================================================================

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id");
        if (id) {
            // getStatus(id).then((status) => {
            //     if (status.results[0].status === 'approved') {
            //         createSub(Number(Channel), Number(Account), price, user.profile.id_profile, cupom)
            //         navigate('/perfil')
            //     }
            // })
        }

    }, [])

    const handleChange = async () => {
        navigate('/perfil')
        // const preferences = await createPreferences(user.profile.id_profile)
        // window.open(preferences?.init_point);
    }

    useEffect(() => {

        let canais: ReactElement[] = ([])
        for (let i: number = 1; i <= 99; i++) {
            canais.push(
                <MenuItem key={i} value={i.toString()}>{i}</MenuItem>
            )

        }
        setChannels(canais)

        let contas: ReactElement[] = ([])
        for (let i: number = 1; i <= 99; i++) {
            contas.push(
                <MenuItem key={i} value={i.toString()}>{i}</MenuItem>
            )

        }
        setAccounts(contas)
    }, [])

    useEffect(() => {
        const subs: number = Number(Channel) * Number(Account);

        if (subs >= 1 && subs < 100) {
            setPrice(Number((subs * value1).toFixed(2)))
        }

        else if (subs >= 100 && subs < 200) {
            setPrice(Number((subs * value2).toFixed(2)))
        }

        else if (subs >= 200) {
            setPrice(Number((subs * value3).toFixed(2)))
        }

    }, [Account, Channel, value1, value2, value3])

    const handleChanel = (event: SelectChangeEvent<string>) => {
        setChannel(event.target.value)
    }

    const handleAccount = (event: SelectChangeEvent<string>) => {
        setAccount(event.target.value)
    }



    //================================================================================================
    // PAYMENT FUNCTION
    const [idData, setIdData] = useState<string>('')
    const validatePayment = async () => {
        /*
                if (idData === 'apro') {
                    createSub(Number(Channel), Number(Account), price, user.profile.id_profile, cupom)
                    navigate('/perfil')
                }
                else {
                    const status = await getStatus(idData)
                    if (status.status === 'approved') {
                        createSub(Number(Channel), Number(Account), price, user.profile.id_profile, cupom)
                    }
                }
                */
    }
    //================================================================================================
    //================================================================================================
    // NUMBER COUNTERS LABELS
    const addAccount = () => {
        let x = parseInt(Account)
        if (x < 99) {
            x++
            setAccount(x.toString())
        }
    }
    const removeAccount = () => {
        let x = parseInt(Account)
        if (x > 1) {
            x--
            setAccount(x.toString())
        }
    }
    const addChannel = () => {
        let x = parseInt(Channel)
        if (x < 99) {
            x++
            setChannel(x.toString())
        }
    }
    const removeChannel = () => {
        let x = parseInt(Channel)
        if (x > 1) {
            x--
            setChannel(x.toString())
        }
    }
    //================================================================================================
    const [cupom, setCupom] = useState<string>('')
    const [coupon, setCoupon] = useState<string>()

    const validateCupom = () => {
        setIcon(<CircularProgress />)
        // getCupom(cupom).then((coupon) => {

        //     if (coupon.Cupom) {
        //         setIcon(<DoneAllIcon color="success" />)
        //         setValue1(0.65 - (coupon.Cupom[0].discount * 0.65 / 100))
        //         setValue2(0.60 - (coupon.Cupom[0].discount * 0.60 / 100))
        //         setValue3(0.50 - (coupon.Cupom[0].discount * 0.50 / 100))
        //         setCoupon(cupom)
        //     } else {
        //         setIcon(<ErrorIcon color="error" />)
        //     }
        // })
    }

    const [icon, setIcon] = useState<ReactElement>(<CheckIcon />);

    const commonStyles = {
        m: 1,
        border: 1.8,
    };

    const confirm = () => {
        validateCupom()
    }

    //================================================================================================
    // STATES
    const [openDialog, setOpendialog] = useState<boolean>(false)
    const closeDialog = () => {
        setOpendialog(false)
    }
    //================================================================================================
    return (
        <>
            <Dialog
                onClose={closeDialog} open={openDialog}>
                <DialogTitle>Aviso:</DialogTitle>
                <DialogContent >
                    <Stack spacing={1}>
                        <DialogContentText>
                            Confirme seu pagamento:
                        </DialogContentText>
                        <TextField id="outlined-basic" label="idData" variant="outlined" value={idData} onChange={(event) => setIdData(event.target.value)} />
                        <Button variant="outlined" onClick={() => {
                            validatePayment()
                        }}><Typography variant="subtitle1" gutterBottom>
                                Sign Up
                            </Typography></Button>

                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog open={false}>
                <DialogTitle>Info</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography align="justify" variant="body1" gutterBottom>
                            The subscription price is calculated based on the amount of subs in your farm.
                        </Typography>
                        <Box display="flex" flex={1} alignItems="center" flexDirection="row" justifyContent="center">
                            <Box color="#464646" padding={2} sx={{ ...commonStyles, bgcolor: "#D2FFE1", borderColor: "lightGreen", border: 2, borderRadius: 5 }}>
                                <Typography variant="subtitle1">
                                    1 to 99
                                </Typography>

                                <Typography align="center" variant="h4">
                                    R${value1.toFixed(2)}
                                </Typography>
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography variant="body2">
                                        per unit
                                    </Typography>
                                </Box>
                            </Box>
                            <Box color="#464646" padding={2} sx={{ ...commonStyles, bgcolor: "#AAFFC6", borderColor: "lightGreen", border: 2, borderRadius: 5 }}>
                                <Typography variant="subtitle1">
                                    100 to 199
                                </Typography>

                                <Typography align="center" variant="h4">
                                    R${value2.toFixed(2)}
                                </Typography>
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography variant="body2">
                                        per unit
                                    </Typography>
                                </Box>
                            </Box>
                            <Box color="464646" padding={2} sx={{ ...commonStyles, bgcolor: "#73FFA2", borderColor: "lightGreen", border: 2, borderRadius: 5 }}>
                                <Typography variant="subtitle1">
                                    above 200
                                </Typography>

                                <Typography align="center" variant="h4">
                                    R${value3.toFixed(2)}
                                </Typography>
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography variant="body2">
                                        per unit
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="row">
                            <TextField
                                id="outlined-basic"
                                label="CUPOM"
                                variant="outlined"
                                value={cupom}
                                onChange={(event) => setCupom(event.target.value)}
                            />
                            <IconButton onClick={validateCupom}>
                                {icon}
                            </IconButton>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => confirm()} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                display="flex"
                alignItems='center'
                justifyContent='center'
                flexDirection="column"
                height="100vh"
            >
                <Container maxWidth="sm" >
                    <Box className="glass">
                        <Stack padding={'50px'} spacing={2} >
                            <Typography align="center" fontWeight="bold" variant={smDown ? "subtitle1" : "h4"} gutterBottom>
                                Conexões: {Number(Channel) * Number(Account)}
                            </Typography>
                            <Box display="flex"
                                alignItems='center'
                                flexDirection="row">

                                <Box display="flex"
                                    flexDirection="column"
                                    flex={1}
                                    alignItems='center'
                                >
                                    <Typography align="center" fontWeight="bold" variant={smDown ? "subtitle1" : "h5"} gutterBottom>
                                        Regiões:
                                    </Typography>
                                    <Box padding={2}><Avatar
                                        sx={{ width: 78, height: 78 }}
                                    >{Channel}</Avatar></Box>
                                    <Box display="flex"
                                        flexDirection="row">
                                        <IconButton onClick={() => addChannel()}>
                                            <AddIcon />
                                        </IconButton>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Channel}
                                            label="Age"
                                            onChange={handleChanel}
                                        >
                                            {Channels}
                                        </Select>
                                        <IconButton onClick={() => removeChannel()}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box display="flex"
                                    flexDirection="column"
                                    flex={1}
                                    alignItems='center'
                                >
                                    <Typography align="center" fontWeight="bold" variant={smDown ? "subtitle1" : "h5"} gutterBottom>
                                        Produtos:
                                    </Typography>
                                    <Box padding={2}><Avatar
                                        sx={{ width: 78, height: 78 }}
                                    >{Account}</Avatar></Box>
                                    <Box display="flex"
                                        flexDirection="row">
                                        <IconButton onClick={() => addAccount()}>
                                            <AddIcon />
                                        </IconButton>
                                        <Select

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Account}
                                            label="Age"
                                            onChange={handleAccount}
                                        >
                                            {Accounts}

                                        </Select>
                                        <IconButton onClick={() => removeAccount()}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Typography fontWeight="bold" variant={smDown ? "subtitle1" : "h5"} gutterBottom>
                                Payment:
                            </Typography>
                            <Button variant="outlined" onClick={() => {
                                handleChange()
                            }}><Typography variant="subtitle1" gutterBottom>
                                    Pay R${price}
                                </Typography></Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default Pay;