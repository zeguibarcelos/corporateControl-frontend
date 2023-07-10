import Container from '@mui/material/Container';
import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import AddProducts from '../components/_Perfil/AddProducts';
import AddLocals from '../components/_Perfil/AddLocals';
import ConfirmationPage from '../components/_Perfil/ConfirmationPage';
import { AppContext } from '../context/AppContext';
import '../App.css'

export interface IPerfilContext {
	etapa: number,
	setEtapa: (etapa: number) => void,
	openDialog: boolean,
	setOpendialog: (openDialog: boolean) => void,
	locals: string[],
	setLocals: (channel: string[]) => void,
	products: string[],
	setProducts: (products: string[]) => void,
}

export const PerfilContext = createContext({} as IPerfilContext)

const steps = [
	'Locals configuration',
	'Products configuration',
	'Confirmation',
];

const Perfil = () => {

	const [openDialog, setOpendialog] = useState<boolean>(false)
	const [etapa, setEtapa] = useState<number>(1)
	const { buttonPress } = useContext(AppContext)
	const { setButtonpress } = useContext(AppContext)
	setButtonpress(false)

	useEffect(() => {
		if (buttonPress === true) {
			setEtapa(2)
		}
	}, [buttonPress])

	const [locals, setLocals] = useState<string[]>([])
	const [products, setProducts] = useState<string[]>([])

	useEffect(() => {
		localStorage.setItem("locals", locals.join(", "))
	}, [locals])

	useEffect(() => {
		localStorage.setItem("products", products.join(", "))
	}, [products])

	return (
		<>
			<PerfilContext.Provider value={{ locals, setLocals, etapa, setEtapa, openDialog, setOpendialog, products, setProducts }}>
				<Box
					display="flex"
					alignItems='center'
					justifyContent='center'
					flexDirection="column"
					minHeight="100vh"
				>
					<Box paddingTop={5} sx={{ width: '100%' }}>
						<Stepper activeStep={etapa - 1} alternativeLabel>
							{steps.map((label, i) => (
								<Step key={label}>
									<StepLabel onClick={() => setEtapa(i + 1)}>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
					{etapa === 3
						?
						<ConfirmationPage />
						:
						<Box
							display="flex"
							alignItems='center'
							justifyContent='center'
							flexDirection="column"
							flex={1}
						>
							<Container >
								<Box className="glass">
									<Stack padding={'50px'} spacing={2} alignItems="center"
										justifyContent="center">
										{etapa === 1 && <AddLocals />}
										{etapa === 2 && <AddProducts />}

									</Stack>
								</Box>
							</Container>
						</Box>
					}
				</Box>
			</PerfilContext.Provider>
		</>
	);
}

export default Perfil;