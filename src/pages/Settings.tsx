import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Box, Container, Divider, IconButton, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { ReactElement, useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { DrawerContext } from "../components/MenuLateral";

interface ILabel {
    name: string,
    reactElement: ReactElement
}

export const Settings = () => {

    const [teste, setTeste] = useState<string>()
    const { user } = useContext(AppContext)
    const theme = useTheme()

    const letter: string[] = user.profile.nickname.split('')

    const [label, setLabel] = useState<ILabel>()

    const toggleLabel = (label: string) => {
        if (label == "static") {
            setLabel({
                name: "dinamic",
                reactElement:
                    <Box

                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="row"
                    >



                        <TextField id="standard-basic" label="nickname" variant="standard" value={teste} onChange={(event) => setTeste(event.target.value)} />

                        <IconButton onClick={() => toggleLabel("dinamic")}>
                            <DoneOutlineIcon fontSize="small" />

                        </IconButton>


                    </Box>
            }
            )
        } if (label == "dinamic") {
            setLabel(
                {
                    name: "static", reactElement:

                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            badgeContent={
                                <IconButton onClick={() => toggleLabel("static")}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            }
                        >
                            <Box paddingRight={3} paddingLeft={3}>
                                <Typography variant="h6" gutterBottom>
                                    {user.profile.nickname}
                                </Typography>
                            </Box>
                        </Badge>
                }
            )
        }
    }

    useEffect(() => {
        setLabel(
            {
                name: "static",
                reactElement:

                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        badgeContent={
                            <IconButton onClick={() => toggleLabel('static')}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        <Box paddingRight={3} paddingLeft={3}>
                            <Typography variant="h6" gutterBottom>
                                {user.profile.nickname}
                            </Typography>
                        </Box>
                    </Badge>

            }
        )
    }, [user])

    //Drawer----------------------------------------------------------------------------------
    const { toggleDrawerOn } = useContext(DrawerContext)
    useEffect(() => {
        toggleDrawerOn(true)
    }, [])
    //Drawer----------------------------------------------------------------------------------

    const smDown: boolean = useMediaQuery(theme.breakpoints.down('sm'))

    return (

        <Box
            display="flex"
            alignItems='center'
            justifyContent='center'
            flexDirection="column"
            height="100vh"
        >
            <Container maxWidth="sm" >
                <Paper>
                    <Stack padding={'50px'} spacing={2}

                    >
                        <Box
                            width='100%'
                            height={theme.spacing(20)}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"

                        >
                            <Avatar
                                sx={{ width: 56, height: 56 }}
                            >{letter[0]}</Avatar>
                            {label?.reactElement}
                        </Box>
                        <Divider />


                        <Typography fontWeight="bold" variant="h5" component="h1" gutterBottom>
                            Channels: {user.channels.length}
                        </Typography>

                        <Typography fontWeight="bold" variant="h5" component="h1" gutterBottom>
                            Accounts: {user.accounts.length}
                        </Typography>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Alterar dados:</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Stack display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column" spacing={2} >
                                    <Typography>
                                        <TextField id="outlined-basic" label="Password" variant="outlined" value={teste} onChange={(event) => setTeste(event.target.value)} />
                                    </Typography>
                                    <Typography>
                                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" value={teste} onChange={(event) => setTeste(event.target.value)} />
                                    </Typography>
                                </Stack>

                            </AccordionDetails>
                        </Accordion>

                    </Stack>
                </Paper>
            </Container>
        </Box>

    )
}

export default Settings