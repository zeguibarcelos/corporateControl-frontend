import { Alert, Avatar, AvatarGroup, Box, Button, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PerfilContext } from '../../pages/Perfil';

const AddProducts = () => {

    const { setProducts } = useContext(PerfilContext)
    const { setEtapa } = useContext(PerfilContext)

    const [accountname, setAccountname] = useState<string>('')
    const [count, setCount] = useState<number>(0)
    const [product, setProduct] = useState<string[]>([])
    const [maxAccounts, setMaxAccounts] = useState<number>(2)

    // useEffect(() => {
    //     getSub(user.profile.id_profile).then((sub) => {
    //         setMaxAccounts(sub.sub.nAccounts)
    //     })
    // }, [])

    const [avatar, setAvatar] = useState<ReactElement[]>([])

    const handleChange = () => {
        if (!accountname) {
            setAlertBox(<Alert
                onClose={() => {
                    setAlertBox(<></>);
                }}
                severity="error"
            >
                O nome do produto não pode estar vazio!
            </Alert>)
        }
        else {
            setCount(count + 1)
            const split: string[] = accountname.split('/')
            const letter = split[split.length - 1].split('')
            setProduct(prevConta => [...prevConta, split[split.length - 1]])
            avatar.unshift(<Stack key={accountname} padding={'5px'} spacing={2} alignItems="center"
                justifyContent="center"><Avatar>{letter[0]}</Avatar> {split[split.length - 1]}</Stack>)
        }
    }

    useEffect(() => {
        setAccountname('')
        if (product.length === 3) {
            setEtapa(3)
            setProducts(product)
        }
    }, [product])

    const [alertBox, setAlertBox] = useState<ReactElement>(<Alert onClose={() => { setAlertBox(<></>) }} severity="warning">Adicione o nome do produto</Alert>)

    return (
        <>
            <Box paddingLeft={2} paddingTop={2} display="flex" justifyContent="flex-start">
                {alertBox}
            </Box>
            <Typography fontWeight="bold" variant="h5" component="h1" gutterBottom>
                Add Products:
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
                id="outlined-basic" label="Account Name" variant="outlined" value={accountname} onChange={(event) => setAccountname(event.target.value)} />
            <Button
                variant="outlined"
                onClick={handleChange}
            >
                <Typography variant="subtitle1" component="h1" gutterBottom>
                    SUBMIT
                </Typography>
            </Button>
        </>
    )
}

export default AddProducts;