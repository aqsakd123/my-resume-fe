import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {mediaQuery} from "../../../common/common-data";
import CustomInput from "../../../components/custom-input-form";
import CustomTextArea from "../../../components/custom-textarea";
import {Form, Image} from "antd";
import Input from "antd/es/input/Input";
import {useContext, useEffect, useState} from "react";
import {PreviewContext} from "../resume-form";
import QuillEditor from "../../../components/custom-quill";
import '../style/style-resume.css'

const ContactInfo = ({sx, form,...restProps}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(mediaQuery)
    const context = useContext(PreviewContext)
    const isView = context.isPreview

    const [imageContact, setImageContact] = useState('')
    const [contactSummary, setContactSummary] = useState(null)

    useEffect(() => {
        setImageContact(form?.getFieldsValue()?.contactInfo?.image)
        setContactSummary(form?.getFieldsValue()?.contactInfo?.summary)
    }, [])

    useEffect(() => {
        if(contactSummary !== null) {
            form.setFieldsValue({
                contactInfo: {
                    summary: contactSummary
                }
            })
        }
    }, [contactSummary])

    const margin = {
        left: isMobile ? 10 : 15,
        right: isMobile ? 10 : 15
    }

    const handleUpload = async (event) => {
        const file = event.target.files[0]
        const size_limit = 250
        if(file && file.size > size_limit*1024){
            alert("File is too big! Maximum is " + size_limit + "Kb");
            form.setFieldsValue({
                contactInfo: {
                    image: ''
                }
            })
            return;
        }
        if(file) {
            const base64 = await convertBase64(file)
            setImageContact(base64)
            form.setFieldsValue({
                contactInfo: {
                    image: base64
                }
            })
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    return (
        <Box
            sx={{
                backgroundColor: colors.blueAccent[900],
                ...sx
            }}
            pb={5}
            {...restProps}
        >
            <Box className="resume-content-item-title" sx={{ backgroundColor: colors.primary[900] }}>
                <Box
                    sx={{
                        padding: '20px',
                        fontSize: '30px',
                        marginBottom: '10px',
                        textDecoration: 'underline',
                        textAlign: 'center',
                        color: colors.primary[100],
                    }}
                >
                    ABOUT ME
                </Box>
            </Box>
            <Box ml={margin.left}
                 mt={5}
                 mr={margin.right}
                 display="grid"
                 gridTemplateColumns={isMobile ? "fill" : "repeat(12, 1fr)"}
                 gap="20px"
                 sx={{ color: colors.primary[100] }}
            >
                <Box
                     order={1}
                     gridColumn="span 3">
                    {!isView &&
                        <Box sx={{ display: 'flex' }}>
                            <input id={"file-upload"} accept="image/png, image/gif, image/jpeg" type={"file"}
                                   style={{ width: '70px' }}
                                   onChange={(event) => handleUpload(event)}/>
                                   &nbsp;
                            <label htmlFor="file-upload">Upload a photo</label>
                        </Box>
                    }
                    <Image src={imageContact} style={{ width: '75%' }}/>
                    <Form.Item
                        name={["contactInfo", "image"]}
                        hidden
                    >
                        <Input/>
                    </Form.Item>
                </Box>
                <Box sx={{
                    backgroundColor: 'rgb(255 149 168 / 20%)',
                    padding: '20px',
                    overflow: 'auto',
                    maxHeight: '600px',
                    '& .ant-input-affix-wrapper' : {
                        color: `${colors.primary[100]} !important`,
                        backgroundColor: 'rgb(255, 255, 255, 0) !important',
                    },
                    '& .ant-input' : {
                        color: `${colors.primary[100]} !important`,
                        backgroundColor: 'rgb(255, 255, 255, 0) !important',
                    }

                }}
                     order={isMobile ? 3 : 2}
                     gridColumn="span 6">
                    <Typography variant="h3" component="h3" sx={{ marginBottom: '10px' }}>
                        SUMMARY
                    </Typography>
                    <CustomTextArea
                        name={["contactInfo","summary"]}
                        style={{
                            marginBottom: '0px',
                        }}
                        formProps={{ hidden: true }}
                    />
                    <QuillEditor
                        theme={"snow"}
                        isView={isView}
                        value={contactSummary}
                        onChange={(e) => setContactSummary(e)}
                        style={{ height: '400px' }}
                    />
                </Box>
                <Box sx={{ backgroundColor: 'rgb(255 149 168 / 20%)', padding: '20px', paddingBottom: '30px', height: 'fit-content' }}
                     order={isMobile ? 2 : 3}
                     gridColumn="span 3">
                    <Typography variant="h4" component="h4" sx={{ marginBottom: '20px' }}>
                        CONTACT INFO
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <img src={"/assets/location.png"} alt={"location"} className={'icon-image'}/>
                        &nbsp;&nbsp;&nbsp;
                        <CustomInput
                            isView={isView}
                            name={["contactInfo", "location"]}
                            style={{ marginBottom: '10px' }}
                            maxLength={255}
                        />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <img src={"/assets/phoneNumber.png"} alt={"phone"} className={'icon-image'}/>
                        &nbsp;&nbsp;&nbsp;
                        <CustomInput
                            isView={isView}
                            name={["contactInfo", "phoneNumber"]}
                            style={{ marginBottom: '10px' }}
                            maxLength={255}
                        />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <img src={"/assets/email.png"} alt={"Gmail"} className={'icon-image'}/>
                        &nbsp;&nbsp;&nbsp;
                        <CustomInput
                            isView={isView}
                            name={["contactInfo", "email"]}
                            style={{ marginBottom: '10px' }}
                            maxLength={255}
                        />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <img src={"/assets/github.png"} alt={"Github"} className={'icon-image'}/>
                        &nbsp;&nbsp;&nbsp;
                        <CustomInput
                            isView={isView}
                            name={["contactInfo", "github"]}
                            style={{ marginBottom: '10px', cursor: (isView && form.getFieldsValue().contactInfo?.github) ? 'pointer' : 'auto' }}
                            maxLength={255}
                            onClick={() => {
                                if(isView && form.getFieldsValue().contactInfo?.github) {
                                    window.open(form.getFieldsValue().contactInfo?.github, '_blank')
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <img src={"/assets/linkedln.png"} alt={"Linkedin"} className={'icon-image'}/>
                        &nbsp;&nbsp;&nbsp;
                        <CustomInput
                            isView={isView}
                            name={["contactInfo", "linkedln"]}
                            style={{ marginBottom: '10px', cursor: (isView && form.getFieldsValue().contactInfo?.linkedln) ? 'pointer' : 'auto' }}
                            onClick={() => {
                                if(isView && form.getFieldsValue().contactInfo?.linkedln) {
                                    window.open(form.getFieldsValue().contactInfo?.linkedln, '_blank')
                                }
                            }}
                            maxLength={255}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactInfo;
