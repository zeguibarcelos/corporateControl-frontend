import { Backdrop, CircularProgress } from "@mui/material"
import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/Storage"

interface Profile {
  id_profile: string,
  nickname: string
}

interface IAccount {
  id_account: string,
  name: string
}

interface IChannel {
  id_channel: string,
  name: string
}

interface User {
  token: string,
  isLoggedIn?: boolean,
  profile: Profile,
  channels: IChannel[],
  accounts: IAccount[]
}

interface IAppContext {
  buttonPress: boolean,
  setButtonpress: (buttonPress: boolean) => void,
  openDialog: boolean,
  setOpendialog: (openDialog: boolean) => void,
  user: User,
  setUser: (user: User) => void,
  open: boolean,
  setOpen: (open: boolean) => void
}

export const AppContext = createContext({} as IAppContext)

export const AppContextProvider = ({ children }: any) => {



  const [buttonPress, setButtonpress] = useState<boolean>(false)

  const [openDialog, setOpendialog] = useState<boolean>(false)

  const [user, setUser] = useState<User>({
    token: '',
    profile: { id_profile: '', nickname: '' },
    channels: [],
    accounts: []
  })


  useEffect(() => {

    const storage = getAllLocalStorage()
    let usuario: User = {
      token: user.token,
      isLoggedIn: user.isLoggedIn,
      profile: user.profile,
      channels: user.channels,
      accounts: user.accounts
    }

    if (storage) {
      const { token } = JSON.parse(storage)
      usuario.token = token
      const { isLoggedIn } = JSON.parse(storage)  //converte uma string para um objeto
      usuario.isLoggedIn = isLoggedIn
      const { profile } = JSON.parse(storage)
      usuario.profile.id_profile = profile.id_profile
      usuario.profile.nickname = profile.nickname
      const { channels } = JSON.parse(storage)
      usuario.channels = channels
      const { accounts } = JSON.parse(storage)
      usuario.accounts = accounts

      setUser(usuario)
    }

  }, [])

  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      open, setOpen, buttonPress, setButtonpress, openDialog,
      setOpendialog, user, setUser
    }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </AppContext.Provider>
  )
}