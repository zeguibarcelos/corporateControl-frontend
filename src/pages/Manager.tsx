import { Box, Button, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import { useContext, useEffect, useState } from "react"
import { DrawerContext } from "../components/MenuLateral"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Sub {
    nickname: string,
    sub: {
        id_sub: string,
        nChannels: number,
        nAccounts: number,
        price: number,
        date: string
    }
}


const Manager = () => {

    const [rows, setRows] = useState<IProfile[]>([])
    const [sub, setSub] = useState<Sub[]>([])

    let count: number = 0


    let arr: IProfile[] = []
    const { toggleDrawerOn } = useContext(DrawerContext)
    useEffect(() => {

        toggleDrawerOn(true)

        // getProfiles().then((profiles) => {        
        //     profiles.profile.map((profile) => {

        //         getSub(profile.id_profile).then((sub2) => {
        //             setSub(prevSub => [...prevSub, { nickname: profile.nickname, sub: sub2.sub }])
        //         })
        //     })
        // }
        // )

    }, [])
    //Drawer----------------------------------------------------------------------------------

    useEffect(() => {



        if (sub.length) {
            sub.map((desc) => {
                count++
                arr.push({
                    id: count,
                    name: desc.nickname,
                    date: desc.sub.date,
                    price: desc.sub.price,
                    channels: desc.sub.nChannels,
                    accounts: desc.sub.nAccounts,
                })
            })
            setRows(arr)
        }

    }, [sub])


    interface IProfile {
        id: number,
        name: string,
        date: string,
        price: number,
        channels: number,
        accounts: number,
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Profile Name',
            type: 'string',
            width: 150,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Pay Date',
            type: 'string',
            width: 150,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'channels',
            headerName: 'nChannels',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'accounts',
            headerName: 'nAccounts',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'Action',
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(event) => {
                            handleClick(event, cellValues)
                        }}
                    >
                        <Typography color="white" variant="subtitle1" component="h1" gutterBottom>
                            REMOVE
                        </Typography>
                    </Button>
                )
            }
        }
    ];

    const handleClick = (event: any, cellValues: any) => {
    }


    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {

        rows.map((row) => {
            selectionModel.map((select) => {
                if (select == row.id) {

                }
            })
        })

    }, [selectionModel])

    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1.8,
    };

    return (
        <Box
            display="flex"
            alignItems='center'
            justifyContent='center'
            flexDirection="column"
            height="100vh"
        >


            <Box sx={{ ...commonStyles, borderColor: 'primary.contrastText', border: 0, borderRadius: 1, height: 400, width: 900 }}>
                <DataGrid

                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids: any) => {
                        setSelectionModel(ids)
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>

        </Box>
    )

}

export default Manager