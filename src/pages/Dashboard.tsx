import React from "react";
import {
	createContext,
	ReactElement,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	Box, Typography, useTheme, TextField, useMediaQuery, Container, Autocomplete, Accordion, AccordionSummary,
	AccordionDetails, IconButton, Dialog, DialogContent,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BarChart, Legend, ResponsiveContainer } from "recharts";
import { AppContext } from "../context/AppContext";
import { Chart } from "../components/_Dashboard/Chart";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DrawerContext } from "../components/MenuLateral";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import "../App.css";
import TextMobileStepper from "../components/Carrossel";

interface IMedia {
	channel: string;
	value: number;
}

interface IExpandedChart {
	channelName: string;
	element: ReactElement;
}

//Context----------------------------------------------------------------------------------
interface IDashboardContex {
	dates: string[];
	setDates: (dates: string[]) => void;
	barra: ReactElement[];
	setBarra: (barra: ReactElement[]) => void;
	media: IMedia[];
	setMedia: (media: IMedia[]) => void;
}
export const DashboardContext = createContext({} as IDashboardContex);
//Context----------------------------------------------------------------------------------

export const Dashboard = () => {
	const theme = useTheme();

	//================================================================================================
	// DATE
	const datef = new Date();
	let dataFormatadaf =
		datef.getFullYear() + "/" + (datef.getMonth() + 1) + "/" + datef.getDate();

	const last = new Date(datef.getTime() - 7 * 24 * 60 * 60 * 1000);
	let dataFormatadai =
		last.getFullYear() + "/" + (last.getMonth() + 1) + "/" + last.getDate();
	const [idate, setIdate] = React.useState<Dayjs>(dayjs(dataFormatadai));
	const [fdate, setFdate] = React.useState<Dayjs>(dayjs(dataFormatadaf));
	const handleChange2 = (newValue: Dayjs | null) => {
		if (newValue) {
			setIdate(newValue);
		}
	};
	const handleChange3 = (newValue: Dayjs | null) => {
		if (newValue) {
			setFdate(newValue);
		}
	};
	const [dates, setDates] = useState<string[]>([]);
	let datas: string[] = [];
	useEffect(() => {
		setDates([]);
		const datai = new Date(idate.toString());
		const dataf = new Date(fdate.toString());
		let novaData = datai;
		while (novaData <= dataf) {
			let dataFormatada =
				novaData.getFullYear() +
				"/" +
				(novaData.getMonth() + 1) +
				"/" +
				novaData.getDate();
			datas.push(dataFormatada);
			novaData = new Date(novaData.getTime() + 24 * 60 * 60 * 1000);
		}
		setDates(datas);
	}, [idate, fdate]);
	//================================================================================================

	//================================================================================================
	// CHARTS RENDER
	const [value, setValue] = useState<string[]>();
	const [charts, setCharts] = useState<ReactElement[]>();
	const [expandedChart, setExpandedChart] = useState<IExpandedChart>();
	const [expand, setExpand] = useState<boolean>(false);

	const expandChart = (channelName: string, element: ReactElement) => {
		setExpandedChart({ channelName, element });
		setExpand(true);
	};

	const { setOpen } = useContext(AppContext);

	useEffect(() => {
		let graph: ReactElement[] = [];
		let count: number = 0;
		const data = [{ name: "Norte" }, { name: "Nordeste" }, { name: "Sudeste" }];
		data.map((channel) => {
			count++;
			graph.push(
				<Grid2 width={smDown ? 280 : 350} key={count}>
					<Box
						className={theme.palette.mode == "dark" ? "darkGlass" : "glass"}
						border={1}
						borderColor={theme.palette.primary.main}
					>
						<Box

							display="flex"
							justifyContent="flex-end"
						>
							<IconButton
								onClick={() =>
									expandChart(
										channel.name,
										<Chart
											name={channel.name}
											channel={{ name: channel.name, id_channel: channel.name }}
										/>
									)
								}
							>
								<OpenInFullIcon
									sx={{ color: "primary.contrastText", fontSize: 15 }}
								/>
							</IconButton>
						</Box>
						<Chart
							name={channel.name}
							channel={{ name: channel.name, id_channel: channel.name }}
						/>
					</Box>
				</Grid2>
			);
		});
		setCharts(graph);
		setOpen(false);
	}, [dates, value, theme]);

	//================================================================================================
	// DRAWER
	const { toggleDrawerOn } = useContext(DrawerContext);
	useEffect(() => {
		toggleDrawerOn(true);
	}, []);
	//================================================================================================

	const [barra, setBarra] = useState<ReactElement[]>([]);
	const smDown: boolean = useMediaQuery(theme.breakpoints.down("sm"));

	const closeExpand = () => {
		setExpand(false);
	};

	const downloadHandler = (event: any) => {
		event.preventDefault();
		let portalDiv = document.getElementById("my-node") as HTMLElement;
		domtoimage.toBlob(portalDiv).then(function (blob) {
			saveAs(blob, `${expandedChart?.channelName}-${dataFormatadaf}.png`);
		});
	};

	const commonStyles = {
		bgcolor: "background.paper",
		m: 1,
		border: 1.8,
	};

	const [media, setMedia] = useState<any>()

	return (
		<Box display="flex" flex={1}>
			<DashboardContext.Provider value={{ media, setMedia, barra, setBarra, dates, setDates }}>
				<Dialog
					fullWidth={true}
					maxWidth="lg"
					id="my-node"
					onClose={closeExpand}
					open={expand}
				>
					<DialogContent>
						<Box id="my-node">
							<Box display="flex" justifyContent="flex-end">
								<IconButton onClick={downloadHandler.bind(this)}>
									<DownloadIcon />
								</IconButton>
							</Box>
							{expandedChart?.element}
						</Box>
					</DialogContent>
				</Dialog>

				<Box
					display="flex"
					flex={1}
					justifyContent="center"
					flexDirection="column"
				>
					<Box>
						<Container maxWidth="sm">
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								flexDirection="row"
								sx={{
									...commonStyles,
									borderColor: "primary.contrastText",
									border: 0,
									borderRadius: 5,
								}}
							>
								<Autocomplete
									multiple
									freeSolo
									value={value}
									onChange={(event: any, newValue: string[]) => {
										setValue(newValue);
									}}
									id="controllable-states-demo"
									options={[]}
									sx={{ width: "80%" }}
									renderInput={(params) => (
										<TextField
											placeholder="Channels"
											variant="standard"
											{...params}
											label="Search"
										/>
									)}
								/>

								<SearchIcon color="primary" />
							</Box>
						</Container>
					</Box>
					<Box
						display="flex"
						flex={1}
						alignItems="center"
						justifyContent="center"
						flexDirection={smDown ? "column" : "row"}
					>
						<TextMobileStepper />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Box padding={2}>
								<MobileDatePicker
									label="Initial Date"
									inputFormat="YYYY/MM/DD"
									value={idate}
									onChange={handleChange2}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Box>
							<Box padding={2}>
								<MobileDatePicker
									label="Final Date"
									inputFormat="YYYY/MM/DD"
									value={fdate}
									onChange={handleChange3}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Box>
						</LocalizationProvider>
					</Box>

					<Grid2
						container
						spacing={3}
						direction="row"
						alignItems="center"
						justifyContent="center"
					>
						<Accordion
							sx={{ ...commonStyles, border: 0, borderRadius: 1, width: 200 }}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography fontWeight="semibold" component="h5">
									Legend
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box>
									<ResponsiveContainer height={"300px"}>
										<BarChart>
											{barra}
											<Legend align="left" verticalAlign="middle" />
										</BarChart>
									</ResponsiveContainer>
								</Box>
							</AccordionDetails>
						</Accordion>
						{charts}
					</Grid2>
				</Box>
			</DashboardContext.Provider>
		</Box>
	);
};

export default Dashboard;
