import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Avatar, IconButton } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { DashboardContext } from "../pages/Dashboard";
import { AppContext } from "../context/AppContext";
// import { getPoint } from "../services/getPoint";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

interface IMedia {
    channel: string;
    value: number;
}

interface Point {
    id_point: string;
    value: number;
    account: {
        id_account: string;
        name: string;
    };
    channel: {
        id_channel: string;
        name: string;
    };
    date: string;
}

interface Points {
    point: Point[];
}

const TextMobileStepper = () => {
    const theme = useTheme();

    const [multiple, setMultiple] = useState<boolean>();
    const [activeStep, setActiveStep] = React.useState(0);
    const { user } = useContext(AppContext);
    const { dates } = useContext(DashboardContext);

    const [steps, setSteps] = useState<ReactElement[]>([
        <Box display="flex" alignItems="center" flexDirection="row">
            <Box padding={1}>
                <IconButton

                    sx={{ bgcolor: theme.palette.background.paper }}
                    onClick={() => {
                        setMultiple(false);
                    }}
                >
                    <ViewCarouselIcon />
                </IconButton>
            </Box>
            <Box padding={1}>
                <IconButton

                    sx={{ bgcolor: theme.palette.background.paper }}
                    onClick={() => {
                        setMultiple(true);
                    }}
                >
                    <ViewColumnIcon />
                </IconButton>
            </Box>
        </Box>,
    ]);

    let i: number = 0;
    const maxSteps = user.channels.length;
    const [media, setMedia] = useState<IMedia[]>([]);

    useEffect(() => {


        user.channels.map((canal) => {
            let sum: number = 0;
            // getPoint(canal.id_channel).then((pointContent: Points) => {
            //     user.accounts.map((conta) => {
            //         pointContent.point.map((point) => {
            //             if (
            //                 point.date == dates[dates.length - 1] &&
            //                 point.account.id_account == conta.id_account
            //             ) {

            //                 sum = (sum + point.value) / user.accounts.length
            //             }
            //         });
            //     });
            //     if (sum != 0) {
            //         media.push(
            //             { channel: canal.name, value: sum }
            //         )

            //         const letter = canal.name.split('')


            //         steps.push(
            //             <Grid2
            //                 container
            //                 spacing={2}
            //                 sx={{ justifyContent: 'space-between' }}
            //                 direction='row'
            //                 padding={1}
            //                 key={canal.name}
            //             >
            //                 <Grid2>
            //                     <Paper >

            //                         <Grid2
            //                             container
            //                             spacing={1}
            //                             sx={{ justifyContent: 'space-between' }}
            //                             direction='row'
            //                         >

            //                             <Grid2>
            //                                 <Box padding='5px'>

            //                                     <Typography color="textSecondary"
            //                                         gutterBottom
            //                                         variant="overline">
            //                                         Média {canal.name}
            //                                     </Typography>
            //                                     <Typography
            //                                         color="textPrimary"
            //                                         variant="h5"
            //                                     >
            //                                         {sum.toFixed(2)}
            //                                     </Typography>
            //                                 </Box >
            //                             </Grid2>

            //                             <Grid2>
            //                                 <Box padding='5px'>
            //                                     <Avatar
            //                                         sx={{
            //                                             backgroundColor: 'primary.main',
            //                                             height: 46,
            //                                             width: 46
            //                                         }}
            //                                     >
            //                                         {letter[0]}
            //                                     </Avatar>
            //                                 </Box >
            //                             </Grid2>

            //                         </Grid2>
            //                     </Paper>
            //                 </Grid2>

            //             </Grid2>


            //         )
            //     }

            // });
        });

    }, [dates]);

    if (steps.length == 5) {
        steps.shift()
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {multiple != undefined && (
                <Box display="flex" alignItems="center" flexDirection="row">
                    <Box paddingRight={1}>
                        <IconButton
                            size="small"
                            disabled={!multiple}
                            sx={{ bgcolor: theme.palette.background.paper }}
                            onClick={() => {
                                setMultiple(false);
                            }}
                        >
                            <ViewCarouselIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box paddingLeft={1}>
                        <IconButton
                            disabled={multiple}
                            size="small"
                            sx={{ bgcolor: theme.palette.background.paper }}
                            onClick={() => {
                                setMultiple(true);
                            }}
                        >
                            <ViewColumnIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            )}
            {!multiple ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    paddingBottom={3}
                    paddingRight={3}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="row"
                    >
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            {/*Back*/}
                        </Button>
                        <Box
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            {steps[activeStep]}
                        </Box>
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1 || multiple == undefined}
                        >
                            {/*Next*/}
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    </Box>
                    {multiple != undefined && (
                        <MobileStepper
                            sx={{ flex: 1, bgcolor: "rgba(0,0,0,0)" }}
                            variant="dots"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={<></>}
                            backButton={<></>}
                        />
                    )}
                </Box>
            ) : (
                <Grid2 container spacing={2} direction="row">
                    {steps}
                </Grid2>
            )}
        </Box>
    );
};

export default TextMobileStepper;
