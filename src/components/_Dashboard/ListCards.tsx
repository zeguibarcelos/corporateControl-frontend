import { Avatar, Box, Paper, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"

interface IListItemProps {
    channelname: string,
    point: number
}
const ListCards: React.FC<IListItemProps> = ({ channelname, point }) => {

    const letter = channelname.split('')

    return (
        <Grid2>
            <Paper >
                <Grid2
                    container
                    spacing={1}
                    sx={{ justifyContent: 'space-between' }}
                    direction='row'
                >

                    <Grid2>
                        <Box padding='5px'>

                            <Typography color="textSecondary"
                                gutterBottom
                                variant="overline">
                                Média {channelname}
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                {point.toFixed(2)}
                            </Typography>
                        </Box >
                    </Grid2>

                    <Grid2>
                        <Box padding='5px'>
                            <Avatar
                                sx={{
                                    backgroundColor: 'primary.main',
                                    height: 46,
                                    width: 46
                                }}
                            >
                                {letter[0]}
                            </Avatar>
                        </Box >
                    </Grid2>

                </Grid2>
            </Paper>
        </Grid2>

    )
}

export default ListCards;