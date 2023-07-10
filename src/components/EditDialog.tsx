import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { PerfilContext } from "../pages/Perfil";

interface IListItemProps {
    title: string,
    toDo: string
}

const EditDialog: React.FC<IListItemProps> = ({ title, toDo }) => {

    const { setProducts } = useContext(PerfilContext)
    const { products } = useContext(PerfilContext)

    const { setLocals } = useContext(PerfilContext)
    const { locals } = useContext(PerfilContext)

    const { openDialog } = useContext(PerfilContext)
    const { setOpendialog } = useContext(PerfilContext)

    const [obj, setObj] = useState<string>('')

    const confirmDialog = () => {
        if (toDo === 'channel') {
            const objIndex = locals.findIndex((obj => obj === title)) // objIndex recebe a posição da conta a ser alterada
            let local = locals // canal recebe os canais
            local[objIndex] = obj // canal na posição de objIndex é alterado
            setLocals(local) // canal é alterado no state
        }

        if (toDo === 'account') {
            const objIndex = products.findIndex((obj => obj === title)) // objIndex recebe a posição da conta a ser alterada
            let product = products
            product[objIndex] = obj
            setProducts(product)
        }

        setOpendialog(false)
        setObj('')
    }

    const closeDialog = () => {
        setOpendialog(false)
    }

    return (
        <Dialog open={openDialog} onClose={closeDialog}>
            <DialogTitle>Altere o {title}:</DialogTitle>
            <DialogContent >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="row"
                >
                    <TextField id="standard-basic" label="name" variant="standard" value={obj} onChange={(event) => setObj(event.target.value)} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={confirmDialog}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditDialog;