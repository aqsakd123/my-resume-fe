import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import {Button} from "antd";
import {request} from "../../../axios-instance";
import {useState} from "react";
import {WarningAmberRounded} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {settingUserInfo} from "../store/action";
import {setJwtToken, successInfo} from "../../../common/common-function";
import {fetchTestAPI, signIn} from "../service/service";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const [form] = Form.useForm()

    const toUserInfoState = (item) => {
        const newItem = { username: item.username, logged: item.logged, roles: item.roles.map(item => item.code) }
        return newItem
    }

    async function test() {
        await fetchTestAPI()
            .then(r => successInfo('TEST_SUCCESS'))
            .catch(r => console.log('TEST_FAILED: ' + r))

    }

    const onSubmitLoginForm = async (values) => {
        const value = form.getFieldsValue()
        await signIn({...value}).then(r => {
                setJwtToken(r?.data)
                dispatch(settingUserInfo(toUserInfoState({logged: true, ...r?.data})))
                setMessage('')
                navigate('/resume')
                successInfo('LOGIN_SUCCESS')
            })
            .catch(r => setMessage('Error: ' + r?.response?.data?.message))
    };

    return (
        <Box sx={{ width: '100%', display: 'flex'}}>
            <Form
                layout={"horizontal"}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 30,
                }}
                form={form}
                preserve={true}
                onFinish={onSubmitLoginForm}
                style={{ width: '100%' }}
            >
                <Box>
                    <Form.Item
                        label={"Username"}
                        name={"username"}

                        rules={[
                            {
                                required: true,
                                message: 'Username is required'
                            },
                            {
                                max: 255,
                                message: 'Username max length is 255 characters'
                            }
                        ]}
                        style={{ width : "100%" }}
                    >
                        <Input placeholder={"Username"}/>
                    </Form.Item>
                </Box>
                <Box>
                    <Form.Item
                        label={"Password"}
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: 'Password is required'
                            },
                            {
                                max: 255,
                                message: 'Password max length is 255 characters'
                            }
                        ]}
                        style={{ width : "100%" }}
                    >
                        <Input type={"password"} placeholder={"Password"}/>
                    </Form.Item>
                </Box>
                {message &&
                    <Box sx={{ display: 'flex', color: 'red', paddingTop: '20px', justifyContent: 'center' }}>
                        <WarningAmberRounded /> &nbsp;&nbsp;
                        <span style={{   wordBreak: 'break-word' }}>{message}</span>
                    </Box>
                }
                <Form.Item style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit" size={"large"}>
                        Login
                    </Button>
                    &nbsp;&nbsp;
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reset
                    </Button>
                    &nbsp;&nbsp;
                    <Button htmlType="button" onClick={test}>
                        TEST
                    </Button>
                </Form.Item>

            </Form>
        </Box>
    );
};

export default LoginForm;
