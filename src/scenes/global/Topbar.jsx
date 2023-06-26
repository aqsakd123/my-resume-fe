import {
  Backdrop,
  Box,
  Button,
  capitalize, CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Switch,
  useTheme
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import styled from "@emotion/styled";
import {Popover, Select} from "antd";
import i18n, {t} from "i18next";
import {languageList} from "./common/common-data";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguageState, runSpin, stopSpin, toggleTheme} from "./store/action";
import {logOut, successInfo} from "../../common/common-function";
import {selectSetting} from "./store/settingReducer";
import {selectUserInfo} from "../login-signup/store/settingReducer";
import {settingUserInfo} from "../login-signup/store/action";
import {useNavigate} from "react-router";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate()

  const spin = useSelector(selectSetting).spin
  const userInfo = useSelector(selectUserInfo)

  const dispatch = useDispatch();

  function transformSelectToLanguageImage(item){
    return {
      value: item.value,
      label:
          <div style={{ display: 'flex', alignItems: "center" }}>
            <img src={"/assets/language-image/" + item.value + ".png"} alt={item.value} style={{ width: '15px', height: '15px' }}/>
            &nbsp;&nbsp;&nbsp;
            <span>
              {item.label}
            </span>
          </div>
    }
  }

  const content = (
      <MenuList>
        <MenuItem onClick={() => navigate('/resume')}>
          MY RESUME
        </MenuItem>
        {userInfo.logged &&
              <MenuItem onClick={() => {
                logOut().then(r => successInfo('LOGOUT_SUCCESS'))
                dispatch(settingUserInfo( { logged: false }))
                navigate('/login')
              }}>
                LOGOUT
              </MenuItem>
        }
      </MenuList>
  );

  return (
      <Box display="flex" justifyContent="flex-end" p={2}>
        {/* ICONS */}
        <Box display="flex">
          <MaterialUISwitch checked={theme.palette.mode === "dark"} onClick={colorMode.toggleColorMode}/>
          <Select
              options={languageList.map(item => {
                return transformSelectToLanguageImage(item)
              })}
              style={{ width: '150px' }}
              defaultValue={i18n.language.substr(0,2)}
              onChange={(value) => {
                dispatch(changeLanguageState(value))
                i18n.changeLanguage(value).then(r => successInfo('CHANGE_LANGUAGE_SUCCESS'))
              }}
          />

          <Popover placement="bottomRight" title={userInfo.logged ? `Hello, ${userInfo.username}` : "Menu"} content={content} trigger="click">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Popover>

        </Box>
        {spin &&
        <Backdrop
            sx={{ color: '#fff',  zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={spin}
        >
          <CircularProgress color="inherit" size={"large"} />
        </Backdrop>
        }
      </Box>
  );
};

export default Topbar;
