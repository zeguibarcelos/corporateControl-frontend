import { Avatar, Box, Button, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { PerfilContext } from "../../pages/Perfil";
import { deleteLocalStorage } from "../../services/Storage";
import Grid2 from "@mui/material/Unstable_Grid2";
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from "../EditDialog";
import '../../App.css'

const ConfirmationPage = () => {
    const navigate = useNavigate()

    const theme = useTheme();
    const smDown: boolean = useMediaQuery(theme.breakpoints.down('sm'))

    const { locals } = useContext(PerfilContext)
    const { products } = useContext(PerfilContext)

    const { setOpen } = useContext(AppContext);
    const { setOpendialog } = useContext(PerfilContext)
    const [obj, setObj] = useState<string>('')
    const [objName, setObjName] = useState<string>('')

    const listpapers = locals.map((local) => {
        const letter = local.split('')
        const editAccount = (obj: string, objName: string) => {
            setObj(obj)
            setObjName(objName)
            setOpendialog(true)
        }
        return (
            <>
                <EditDialog title={obj} toDo={objName} />
                <Grid2 minWidth={smDown ? 175 : 225} key={local}>
                    <Box className="glass">
                        <Box padding='25px'>
                            <Box
                                display="flex"
                                alignItems='center'
                                justifyContent='center'
                                flexDirection="column"
                                padding={2}
                            >
                                <Avatar> {letter[0]} </Avatar>
                                <Typography
                                    variant="subtitle1"
                                    component="h1"
                                    gutterBottom
                                >
                                    Local {local}
                                    <IconButton onClick={() => editAccount(local, 'channel')}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Box>
                            <Divider />
                            {products.map((product) =>
                                <Box key={product}> Product {product}
                                    <IconButton onClick={() => editAccount(product, 'account')}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}

                        </Box>
                    </Box>
                </Grid2>
            </>
        )
    }
    )

    //================================================================================================
    // USUÁRIO CONFIRMA QUE TODOS OS DADOS ESTÃO CORRETOS
    const handleConfirm = () => {
        setOpen(true)
        // channel.map((channel) =>
        //     getChannelByName(channel).then((channelContent) => {
        //         if (channelContent.channels) {
        //             incrementChannel(channelContent.channels.id_channel, user.profile.id_profile)
        //         }
        //         else {
        //             createChannel(channel, user.profile.id_profile)
        //         }

        //     }))

        // account.map((account) => {
        //     createAccount(account, user.profile.id_profile)
        // }
        // )
        deleteLocalStorage()
        setOpen(false)
        navigate('/')
    }
    //================================================================================================

    return (
        <Box
            display="flex"
            alignItems='center'
            justifyContent='center'
            flexDirection="column"
        >
            <Box padding={2}>
                <Button variant="outlined" onClick={() => {
                    handleConfirm()
                }}>
                    <Typography
                        variant="subtitle1"
                        component="h1"
                        gutterBottom>
                        Confirm!
                    </Typography>
                </Button>
            </Box>
            <Grid2 container spacing={3} direction='row' alignItems='center' justifyContent='center'>
                {listpapers}
            </Grid2>
        </Box>
    )

}

export default ConfirmationPage;