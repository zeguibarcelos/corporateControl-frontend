import { Alert, Avatar, AvatarGroup, Box, Button, DialogContentText, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { IPerfilContext, PerfilContext } from '../../pages/Perfil';
import FormDialog from '../Dialog';

const AddLocals = () => {

    const { locals, setLocals } = useContext<IPerfilContext>(PerfilContext)
    const { setEtapa } = useContext(PerfilContext)

    const [localName, setLocalName] = useState<string>('')

    const [avatar, setAvatar] = useState<ReactElement[]>([])
    const { user } = useContext(AppContext)

    const handleChange = () => {
        if (!localName) {
            setAlertBox(<Alert
                onClose={() => {
                    setAlertBox(<></>);
                }}
                severity="error"
            >
                O nome do local não pode estar vazio!
            </Alert>)
        } else {

            setLocals([...locals, localName]);

            const letter = localName.split("")
            avatar.unshift(<Stack key={localName} padding={'5px'} spacing={2} alignItems="center"
                justifyContent="center"><Avatar>{letter[0]}</Avatar> {localName}</Stack>)
            setLocalName('')
        }
    }

    useEffect(() => {
        // getSub(user.profile.id_profile).then((sub) => {
        //     if (canal.length === sub.sub.nChannels && canal.length != 0) {
        //         setEtapa(2)
        //     }
        // })
        locals.length === 2 && setEtapa(2)
    }, [locals])


    const [alertBox, setAlertBox] = useState<ReactElement>(<Alert onClose={() => { setAlertBox(<></>) }} severity="warning">Insirar o nome da Região/Filial</Alert>)

    return (
        <>
            <Box paddingLeft={2} paddingTop={2} display="flex" justifyContent="flex-start">
                {alertBox}
            </Box>
            <FormDialog open={false}>
                <DialogContentText>
                    Confirme os locais a serem adicionadas:
                </DialogContentText>
                <Box>
                    <AvatarGroup max={4}>
                        {avatar}
                    </AvatarGroup>
                </Box>
            </FormDialog>
            <Typography fontWeight="bold" variant="h5" component="h1" gutterBottom>
                Adicionar Local
            </Typography>

            <AvatarGroup max={4}>
                {avatar}
            </AvatarGroup>

            <TextField
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleChange()
                    }
                }}
                id="outlined-basic"
                label="Channel Name"
                variant="outlined"
                value={localName}
                onChange={
                    (event) => setLocalName(event.target.value)
                }
            />
            <Button
                variant="outlined"
                onClick={handleChange}
            >
                <Typography variant="subtitle1" component="h1" gutterBottom>
                    SUBMIT
                </Typography></Button>
        </>
    )
}

export default AddLocals;