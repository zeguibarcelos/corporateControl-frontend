import { Box, Typography, useTheme } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import { useContext } from "react"
import { DashboardContext } from "../../pages/Dashboard";
import Gradient from "javascript-color-gradient";

interface Props {
	name: string,
	channel: {
		id_channel: string,
		name: string
	}
}

export const Chart: React.FC<Props> = ({ name, channel }) => {
	// Defina o tema do Material-UI
	const theme = useTheme();

	// Defina os estados para os dados e barras dos gráficos
	const [data, setData] = useState<any[]>([]);
	const [bar, setBar] = useState<React.ReactElement[]>([]);
	let barra: React.ReactElement[] = [];

	// Obtenha as datas do contexto do Dashboard
	const { dates } = useContext(DashboardContext);

	// Obtenha o estado de media e função de setMedia do contexto do Dashboard
	const { media, setMedia } = useContext(DashboardContext);

	// Defina os dados dos produtos
	const products = [
		{ name: 'Product 1', sales: 10 },
		{ name: 'Product 2', sales: 15 },
		{ name: 'Product 3', sales: 8 }
	];

	// Defina o estado de mediaCanal e sua função de atualização
	const [mediaCanal, setMediaCanal] = useState<number>();

	useEffect(() => {
		// Limpe os dados e as barras antes de atualizar
		setData([]);
		setBar([]);

		// Simule algumas datas
		const dats = ['2023/6/29', '2023/6/30'];
		dates?.forEach((data) => {
			let arr: any[] = [];
			dats.forEach((date) => {
				if (date === data) {
					products.forEach((product) => {
						arr.push({ name: product.name, value: product.sales });
					});
				}
			})
			setData((prevData) => [...prevData, { date: data, productsSales: arr }]);
		});


		if (theme.palette.mode === 'light') {
			const colors = new Gradient()
				.setColorGradient('#EFA00B', '000000')
				.setMidpoint(32)
				.getColors();

			products.forEach((product, index) => {
				barra.push(
					<Bar
						key={index}
						name={product.name}
						dataKey={`productsSales[${index}].value`}
						fill={`${colors[index]}`}
					/>
				);
			});
			setBar(barra);
		} else {
			// const colors = new Gradient()
			// 	.setColorGradient("#8B5BFF", "#C2A8FF", "#E44FFF", "#F09CFF", "#4F79FF", "#9CB3FF", "FFFFFF")
			// 	.setMidpoint(user.accounts.length)
			// 	.getColors();
			// user.accounts.map((conta) => {
			// 	barra.push(<Bar key={count} name={conta.name} dataKey={`accounts[${count}].value`}
			// 		fill={`${colors[count]}`} />)
			// 	count++
			// })
			// setBar(barra)
			// setBarra(barra)
		}
	}, [dates, theme]);


	useEffect(() => {
		let counter: number = 0;
		let sum: number = 0;

		if (data.length > 0) {
			data[data.length - 1].productsSales.forEach((product: any) => {
				counter++;
				sum = sum + product.value;
			});
		}
	}, [data]);

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				padding={2}
			>
				<Typography fontWeight="semibold" component="h5" gutterBottom>
					{name}
				</Typography>
				<Box height={250} width="99%">
					<ResponsiveContainer>
						<BarChart
							data={data}
							margin={{
								top: 10,
								right: 10,
								left: 10,
								bottom: 10
							}}
						>
							<XAxis dataKey="date" stroke={theme.palette.text.secondary} />
							<YAxis>
							</YAxis>
							<Tooltip />
							{data.length > 1 && <>{bar}</>}
						</BarChart>
					</ResponsiveContainer>
				</Box>
			</Box>
		</>
	);
};