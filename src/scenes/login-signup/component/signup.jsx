import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import {Button, Result} from "antd";
import {getUserInfo, setJwtToken} from "../../../axios-instance";
import {useState} from "react";
import {t} from "i18next";
import {successInfo} from "../../../common/common-function";
import {registerUser} from "../service/service";

const SignUpForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [form] = Form.useForm()

    const [message, setMessage] = useState({ status: '', message: '' })

    const onSubmitSignUpForm = async (values) => {
        const value = form.getFieldsValue()
        await registerUser({...value})
            .then(r => {
                setMessage({status: "success", message: t('MESSAGE.SIGNUP_SUCCESS')})
                successInfo(t('SIGNUP_SUCCESS'))
            })
            .catch(r => setMessage({status: "warning", message: t(`MESSAGE.${r?.response?.data?.message}`)}))
    };

    const onReset = () => {
        form.resetFields();
    };

    const validateReInputPassword = (_, value) => {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject('Password not match')
        }
        return Promise.resolve()
    }

    const validatePassword = (_, value) => {
        if(value) {
            if(value.length < 8) {
                return Promise.reject('Password should include at least 8 characters')
            }
            if (!/[0-9]/.test(value)) {
                return Promise.reject('Password should include at least 1 digit')
            }
            if (!/[a-z]/.test(value)) {
                return Promise.reject('Password should include at least 1 normal character')
            }
            if (!/[A-Z]/.test(value)) {
                return Promise.reject('Password should include at least 1 capitalize character')
            }
            if (!/[!@#$%^&*]/.test(value)) {
                return Promise.reject('Password should include at least 1 special character including: !@#$%^&*')
            }
            return Promise.resolve()
        }
        return Promise.resolve()
    }


    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Form
                layout={"horizontal"}
                form={form}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 30,
                }}
                preserve={true}
                onFinish={onSubmitSignUpForm}
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
                            },
                            {
                                validator: validatePassword
                            }

                        ]}
                        style={{ width : "100%" }}
                    >
                        <Input type={"password"} placeholder={"Password"}/>
                    </Form.Item>
                </Box>
                <Box>
                    <Form.Item
                        label={"Re-Input Password"}
                        name={"reInputPassword"}
                        rules={[
                            {
                                required: true,
                                message: 'Re-Input Password is required'
                            },
                            {
                                max: 255,
                                message: 'Re-Input Password max length is 255 characters'
                            },
                            {
                                validator: validateReInputPassword
                            }
                        ]}
                        style={{ width : "100%" }}
                    >
                        <Input type={"password"} placeholder={"Re-Input Password"}/>
                    </Form.Item>
                </Box>
                {message.status &&
                <Result
                    status={`${message.status}`}
                    title={`${message.message}`}
                />
                }
                <Form.Item style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit" size={"large"}>
                        Sign Up
                    </Button>
                    &nbsp;&nbsp;
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>

            </Form>
        </Box>
    );
};

export default SignUpForm;
