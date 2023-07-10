import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const FormDialog = ({ children }: any) => {

	const { setOpendialog } = useContext(AppContext)
	const { openDialog } = useContext(AppContext)
	const { setButtonpress } = useContext(AppContext)

	const handleClose = () => {
		setOpendialog(false)
	}

	const handleOpen = () => {
		setButtonpress(true)
		setOpendialog(false)
	}

	return (
		<>
			<Dialog open={openDialog} onClose={handleClose}>
				<DialogTitle>Confirme:</DialogTitle>
				<DialogContent >
					{children}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleOpen}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</>
	)

}

export default FormDialog;