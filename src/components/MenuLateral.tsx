import { Avatar, Badge, Box, Divider, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext } from "../context/ThemeContext";
import MenuIcon from '@mui/icons-material/Menu';
import { AppContext } from "../context/AppContext";
import { changeLocalStorage } from "../services/Storage";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import '../App.css'

interface IListItemProps {
    to: string;
    icon: ReactElement;
    label?: string;
    isDrawerOpen: boolean;
    onClick?: () => void;
    perfil?: boolean
}
const ListItemLink: React.FC<IListItemProps> = ({ to, icon, label, isDrawerOpen, onClick, perfil }) => {

    const navigate = useNavigate()

    const resolvedPath = useResolvedPath(to)
    const match = useMatch({ path: resolvedPath.pathname, end: false })

    const handleClick = () => {
        onClick?.() //se for undefined n faz nada
        navigate(to)
    }

    const theme = useTheme()
    const smDown: boolean = useMediaQuery(theme.breakpoints.down('sm'))

    return (<>
        {perfil === true ?
            <ListItemButton selected={!!match && true} onClick={handleClick}>
                {icon}
            </ListItemButton>
            :
            <ListItemButton selected={!!match && true} onClick={handleClick}>
                <Box display="flex" alignItems="center" flexDirection={smDown ? "column" : "row"}>
                    <ListItemIcon
                        sx={{
                            ...(smDown && { minWidth: "10px" }),
                            justifyContent: "center"
                        }}>
                        {icon}
                    </ListItemIcon>
                    {isDrawerOpen && <ListItemText primary={
                        <Typography sx={{ ...(smDown && { fontSize: "10px" }) }}>
                            {label}
                        </Typography>
                    } />}
                </Box>
            </ListItemButton>
        }
    </>
    )
}

interface IDrawer {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOn: boolean;
    toggleDrawerOn: (drawerOn: boolean) => void
}

export const DrawerContext = createContext({} as IDrawer)

export const MenuLateral = ({ children }: any) => {


    const [drawerOn, setDrawerOn] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawerOpen = (useCallback(() => {
        setIsDrawerOpen(oldIsDrawerOpen => !oldIsDrawerOpen)
    }, []))

    const toggleDrawerOn = (drawer: boolean) => {
        setDrawerOn(drawer)
    }

    const theme = useTheme()
    const smDown: boolean = useMediaQuery(theme.breakpoints.down('sm'))

    const { themeName, toggleTheme } = useAppThemeContext();

    useEffect(() => {
        if (smDown) { toggleDrawerOpen() }
    }, [])

    const { setUser } = useContext(AppContext)

    const logout = (): void => {
        changeLocalStorage({
            token: '',
            isLoggedIn: false,
            profile: { id_profile: '', nickname: '' },
            channels: [],
            accounts: []
        })
    }

    const { user } = useContext(AppContext)
    const letter: string[] = user.profile.nickname.split('')

    const navigate = useNavigate()

    const [mobileView, setMobileView] = useState<boolean>(false)

    useEffect(() => {
        if (smDown) {
            setMobileView(true)
        }
    }, [])

    const commonStyles = {
        m: 1
    };


    return (
        <>
            {drawerOn ?
                <Box>
                    <Drawer variant="permanent"
                        anchor={!mobileView ? "left" : "bottom"}
                        PaperProps={{

                            sx: {
                                ...commonStyles,
                                bgcolor: theme.palette.mode == 'light' ? 'rgba(255, 255, 255, 0.50)' : 'rgba(100, 100, 100, 0.50)',
                                borderRadius: 7.5,
                                border: 1,
                                borderColor: "white"

                            }
                        }}
                    >
                        <Box
                            display="flex"
                            flex={1}
                            flexDirection={smDown ? "row" : "column"}
                        // sx={{ ...(!smDown && { height: "90vh" }) }}
                        >

                            <Box
                                display="flex"
                                flexDirection="initial"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <IconButton onClick={toggleDrawerOpen}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>



                            <> <ListItemLink
                                perfil={true}
                                icon={<Box
                                    width='100%'
                                    sx={{
                                        ...(!smDown && { height: theme.spacing(20) })
                                    }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >

                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <ManageAccountsIcon />
                                        }
                                    >
                                        {!smDown && <Avatar

                                        >{letter[0]}</Avatar>}
                                    </Badge>

                                </Box>}

                                to='/settings'
                                isDrawerOpen={isDrawerOpen}
                            />
                                <Divider />
                            </>


                            <Box display="flex"
                                flexDirection={smDown ? "row" : "column"}
                                flex={1}
                            >
                                <ListItemLink
                                    icon={<DashboardIcon sx={{ color: theme.palette.primary.contrastText }} />}
                                    label='Dashboard'
                                    to='/dashboard'
                                    isDrawerOpen={isDrawerOpen}
                                />
                                <ListItemLink
                                    icon={<LogoutIcon sx={{ color: theme.palette.primary.contrastText }} />}
                                    label='Loggout'
                                    to='/login'
                                    isDrawerOpen={isDrawerOpen}
                                    onClick={logout}
                                />
                                {isDrawerOpen ? <ListItem>
                                    <Box
                                        display="flex"
                                        flexDirection={smDown ? "column" : "row"}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <ListItemIcon
                                            sx={{

                                                justifyContent: "center"
                                            }}>

                                            <Switch
                                                size={smDown ? "small" : "medium"}
                                                onChange={toggleTheme}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </ListItemIcon>
                                        {isDrawerOpen && <ListItemText primary={
                                            <Typography sx={{ ...(smDown && { fontSize: "10px" }) }}>
                                                Theme
                                            </Typography>
                                        } />}
                                    </Box>
                                </ListItem>
                                    :
                                    <Box
                                        display="flex"
                                        flexDirection="initial"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Switch
                                            size={smDown ? "small" : "medium"}
                                            onChange={toggleTheme}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />{isDrawerOpen && <ListItemText primary="Theme" />}
                                    </Box>
                                }
                            </Box>




                        </Box>
                    </Drawer>

                    <DrawerContext.Provider value={{ drawerOn, toggleDrawerOn, isDrawerOpen, toggleDrawerOpen }}>
                        {children}
                    </DrawerContext.Provider>

                </Box>

                : <DrawerContext.Provider value={{ drawerOn, toggleDrawerOn, isDrawerOpen, toggleDrawerOpen }}>

                    {children}

                </DrawerContext.Provider>
            }
        </>
    )

}