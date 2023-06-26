import {Box, ButtonGroup, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import CoverResume from "./components/cover-resume";
import {Button, Form, Popconfirm} from "antd";
import ResumeContent from "./components/resume-content";
import {PlusOutlined} from "@ant-design/icons";
import {createContext, useEffect, useState} from "react";
import {t} from "i18next";
import ContactInfo from "./components/contact-info";
import {contentItemDefault} from "./common/common-data";
import {successInfo} from "../../common/common-function";
import {detailResume, insertResume, updateResume} from "./service/service";
import {useMatch} from "react-router-dom";
import {isNumber} from "./common/common-func";
import {useNavigate} from "react-router";
import {mockData} from "./common/mock-data";

export const PreviewContext = createContext({
});

const ResumeForm = ({isStatic}) => {
    //isStatic: default value present in Github Page
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const checkRouterDetail = useMatch("/resume/detail/:id")
    const checkRouterUpdate = useMatch("/resume/update/:id")
    const checkRouterCreate = useMatch("/resume/create")
    const checkRouterDetailStatic = useMatch("/static-resume/detail/:id")

    const navigate = useNavigate();

    const [form] = Form.useForm()
    const [isPreview, setIsPreview] = useState(false)
    const [stateForm, setStateForm] = useState(null)

    useEffect(() => {
        if (!isStatic) {
            if(checkRouterDetail || checkRouterUpdate) {
                const payloadId = checkRouterUpdate?.params?.id || checkRouterDetail?.params?.id
                if(isNumber(payloadId)) {
                    getDetail(payloadId)
                        .then(r => {
                            setStateForm(r?.data)
                        })
                        .catch(r => console.log(r))
                }
                if(checkRouterDetail) {
                    setIsPreview(true)
                }
            }
        } else {
            setIsPreview(true)
            const payloadId = checkRouterDetailStatic?.params?.id
            setStateForm(mockData[payloadId])
        }
        if (checkRouterCreate) {
            setStateForm({ coverImageURL: 'binary.jpg', coverColor:  'rgb(26, 188, 156)', coverTransparent: 60 })
        }
    }, [])

    const togglePreview = () => {
        setIsPreview(!isPreview)
    }

    async function saveResume() {
        const value = { ...form.getFieldsValue(true)}
        if(value?.id) {
            await updateResume(value?.id,{...value})
                .then(r => {
                    successInfo(t('SAVE_SUCCESS'))
                    navigate(-1);
                })
                .catch(r => console.log(r))
        } else {
            await insertResume({...value})
                .then(r => {
                    successInfo(t('UPDATE_SUCCESS'))
                    navigate(-1);
                })
                .catch(r => console.log(r))
        }
    }

    async function getDetail(id) {
        return await detailResume(id)
            .catch(r => console.log(r))
    }

    return (
        <PreviewContext.Provider value={{ isPreview, form }}>
            <Box sx={{ paddingBottom: '50px' }}>
                <ButtonGroup
                    orientation={"vertical"}
                    style={{ position: 'sticky', paddingTop: '0px', marginTop: '0px', top: '100px', backgroundColor: 'white', zIndex: 100 }}
                >
                    {!(checkRouterDetail || checkRouterDetailStatic) &&
                        <>
                            <Button onClick={() => {
                                console.log(form.getFieldsValue(true))
                            }}
                            >
                                LOG
                            </Button>
                            <Button onClick={() => {
                                togglePreview()
                            }}
                            >
                                { isPreview ? 'PREVIEW ON' : 'PREVIEW OFF' }
                            </Button>
                            <Popconfirm
                                title="Save Resume"
                                description="Are you sure to save this resume?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={saveResume}
                            >
                                <Button
                                    style={{ backgroundColor: 'blueviolet', color: 'white' }}
                                >
                                    {stateForm?.id ? 'UPDATE' : 'SAVE' }
                                </Button>
                            </Popconfirm>
                        </>
                    }
                </ButtonGroup>
                {stateForm !== null &&
                <Form
                    layout={"vertical"}
                    form={form}
                    initialValues={stateForm}
                    preserve={true}
                >
                    <CoverResume form={form} />
                    <ContactInfo
                        form={form}
                        sx={{ marginRight: '30px', width: '100%' }}
                    />
                    <Form.List name="resumeContentItemList">
                        {(fields, { add, remove, move }) => (
                            <Box>
                                {fields.map((field, key, num) => {
                                    return (
                                        <ResumeContent
                                            move={move}
                                            remove={remove}
                                            totalSize={fields.length}
                                            key={field?.key}
                                            resumeIndex={key}/>
                                    )
                                })}
                                {!isPreview &&
                                <Form.Item>
                                    <Button style={{ marginTop: '30px' }} type="dashed" onClick={() => add(contentItemDefault)} block icon={<PlusOutlined />}>
                                        Add Resume Content
                                    </Button>
                                </Form.Item>
                                }
                            </Box>
                        )}
                    </Form.List>
                </Form>
                }
            </Box>
        </PreviewContext.Provider>
    );
};

export default ResumeForm;
