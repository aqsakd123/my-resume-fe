import {
    Box, Button, useMediaQuery,
    useTheme
} from "@mui/material";
import {tokens} from "../../../theme";
import CustomInput from "../../../components/custom-input-form";
import {Settings} from "@mui/icons-material";
import {Form, Popover, Select, Slider} from "antd";
import {useContext, useState} from "react";
import {selectColorCoverImage, selectCoverImage} from "../common/common-data";
import {PreviewContext} from "../resume-form";
import CustomTextArea from "../../../components/custom-textarea";
import {mediaQuery} from "../../../common/common-data";

const CoverResume = ({form}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(mediaQuery)

    const [rerender, setRerender] = useState(false)
    const [showSettingCover, setShowSettingCover] = useState(false)
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    const [showInfoButton, setShowInfoButton] = useState({})

    const context = useContext(PreviewContext)
    const isView = context.isPreview

    function transformSelectedColorToTransparent(value){
        return value?.replace(')', ', coverTransparent)')
    }

    function transformSelectToColorCover(item){
        return {
            value: item.value,
            label:
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <span>
                        {item.label}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ width: '40px', height: '16px', backgroundColor: item.value}}></div>
                </div>

        }
    }

    const settingCover = (
        <Box>
                <Form.Item
                    name={"coverTransparent"}
                    label={"Changing cover color transparent"}
                    style={{ width: '200px' }}
                >
                    <Slider
                        min={0}
                        step={10}
                        max={100}
                        onChange={() => {
                            setRerender(!rerender)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={"coverColor"}
                    label={"Change color cover"}
                    style={{ width: '200px' }}
                >
                    <Select
                        options={selectColorCoverImage.map(item => {
                            return transformSelectToColorCover(item)
                        })}
                        onChange={() => setRerender(!rerender)}
                    />
                </Form.Item>
                <Form.Item
                    name={"coverImageURL"}
                    label={"Change cover image"}
                    style={{ width: '200px' }}
                >
                    <Select
                        options={selectCoverImage}
                        onChange={() => setRerender(!rerender)}
                    />
                </Form.Item>
        </Box>
    );

    const coverStyle = {
        padding: '10px',
        border: `2px solid white`,
        marginBottom: '24px',
        width: isMobile? '80%' : '60%',
        height: 'auto',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: '100',
        textAlign: 'center',
        textTransform: 'uppercase',
        textDecoration: 'underline',
        textDecorationThickness: 'from-font',
        fontStyle: "'Raleway',sans-serif"
    }

    const buttonList = [{
            value : "phoneNumber"
        },
        {
            value: "location"
        },
        {
            value : "email",
        },
        {
            value : "github",
            isLink: true
        },
        {
            value : "linkedln",
            isLink: true
        },
        ]

    return (
        <Box sx={{ height: '600px' }}>
            <Box
                onMouseEnter={() => setShowSettingCover(true)}
                onMouseLeave={() => setShowSettingCover(false)}
                className={'cover-img'}
                style={{backgroundImage: `url('../../../assets/resume-cover-image/${form.getFieldValue('coverImageURL')}')`,
            }}>
                <Box
                    className={'cover-float-button'}
                    sx={{
                    backgroundColor: transformSelectedColorToTransparent(form.getFieldValue('coverColor'))?.replace('coverTransparent', form.getFieldValue('coverTransparent')/100 ),
                }}>
                    {/*{((showSettingCover || isSettingOpen) && !isView) &&*/}
                        <Popover placement="topRight" onOpenChange={(value) => setIsSettingOpen(value)} content={settingCover} trigger="click">
                            <Button
                                className={'float-button'}
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    visibility: ((showSettingCover || isSettingOpen) && !isView) ? 'visible' : 'hidden',
                                }}
                            >
                                <Settings />
                            </Button>
                        </Popover>
                    {/*}*/}
                    <CustomTextArea
                        name={"name"}
                        isView={isView}
                        style={{
                            ...coverStyle,
                            fontSize: '80px',
                        }}
                        maxLength={50}
                        rules={[
                                {
                                    required: true,
                                    message: 'Field Required'
                                },
                                {
                                    max: 50,
                                    message: 'Field Max Length is 50 characters'
                                }
                            ]}
                    />
                    <CustomTextArea
                        name={"resumeTitle"}
                        isView={isView}
                        style={{
                            ...coverStyle,
                            fontSize: '30px',
                            width: isMobile? '60%' : '40%',
                            textDecoration: 'none',
                            padding: '7px',
                            marginBottom: '10px',
                        }}
                        maxLength={50}
                        rules={[
                            {
                                required: true,
                                message: 'Field Required'
                            },
                            {
                                max: 50,
                                message: 'Field Max Length is 50 characters'
                            }
                        ]}
                    />
                    <Box sx={{ display: 'flex', textTransform: 'none' }}>
                        {buttonList.map(item => {
                            const contactInfo = { ...form.getFieldsValue().contactInfo }
                            if (!contactInfo[item.value]) return;
                            return (
                                        <Box
                                            key={item.value}
                                            onMouseEnter={() => setShowInfoButton( prevState => ({ ...prevState, [item.value]: true }))}
                                            onMouseLeave={() => setShowInfoButton( prevState => ({ ...prevState, [item.value]: false }))}
                                            sx={{ display: 'flex', marginLeft: "20px", flexDirection: 'column', position: "relative" }}
                                        >
                                            <img
                                                onClick={() => {
                                                    if(item.isLink) {
                                                        window.open(contactInfo[item.value], '_blank')
                                                    }
                                                }}
                                                src={`/assets/${item.value}.png`}
                                                 alt={item.value}
                                                 style={{ width: '35px', height: '35px', cursor: item.isLink ? 'pointer' : 'auto' }}/>
                                            {showInfoButton[item.value] &&
                                            <p className={'detail-icon-info'}>
                                                {contactInfo[item.value]}
                                            </p>
                                            }
                                        </Box>
                            )
                        })
                        }
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};

export default CoverResume;
