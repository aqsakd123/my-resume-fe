import {
    Box,
    Button as MUIButton, capitalize,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {tokens} from "../../../theme";
import {mediaQuery} from "../../../common/common-data";
import CustomInput from "../../../components/custom-input-form";
import {Button, Form, InputNumber, Popconfirm, Popover, Select, Slider} from "antd";
import {CloseSquareOutlined, PlusOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {useContext, useEffect, useState} from "react";
import {
    layoutSettingDefault,
    textBoxDefault
} from "../common/common-data";
import ContentItemBox from "./content-item-box";
import {
    MenuOpen,
    RemoveCircleOutlineOutlined,
    RemoveCircleOutlineRounded,
    RemoveCircleOutlineSharp
} from "@mui/icons-material";
import {PreviewContext} from "../resume-form";
import Input from "antd/es/input/Input";

const ResumeContent = ({item, resumeIndex, remove, move, totalSize, contentRef, ...rest}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const context = useContext(PreviewContext)
    const isView = context.isPreview
    const form = context.form

    const isMobile = useMediaQuery(mediaQuery)
    const [resumeContentLayout, setResumeContentLayout] = useState({ button: false, cover: false })
    const [layout, setLayout] = useState({ totalLayoutSize: 6 })

    useEffect(() => {
        const fieldName = ['resumeContentItemList', resumeIndex, 'position']
        form.setFieldValue(fieldName, resumeIndex)
    }, [resumeIndex])

    const margin = {
        left: isMobile ? 10 : 15,
        right: isMobile ? 10 : 15
    }

    function moveContentItem(curentPos, newPos) {
        move(curentPos, newPos)
    }

    const contentItemLayoutSettingCover = (
            <MenuList>
                <Popconfirm
                    title="Delete the Resume Content"
                    description="Are you sure to delete this resume content?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => remove(resumeIndex)}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <RemoveCircleOutlineSharp />
                        </ListItemIcon>
                        <ListItemText>DELETE</ListItemText>
                    </MenuItem>
                </Popconfirm>
                <MenuItem disabled={resumeIndex === 0} onClick={() => moveContentItem(resumeIndex, resumeIndex - 1)}>
                    <ListItemText>MOVE FIELD UP</ListItemText>
                </MenuItem>
                <MenuItem disabled={resumeIndex === (totalSize - 1)} onClick={() => moveContentItem(resumeIndex, resumeIndex + 1)}>
                    <ListItemText>MOVE FIELD DOWN</ListItemText>
                </MenuItem>
            </MenuList>
    )

    return (
        <Box
            sx={{ backgroundColor: colors.blueAccent[900] }}
            pb={5}
        >
            <Box
                className="resume-content-item-title"
                onMouseEnter={() => setResumeContentLayout(prevState => ({...prevState, button: true }))}
                onMouseLeave={() => setResumeContentLayout(prevState => ({...prevState, button: false }))}
                sx={{ backgroundColor: colors.primary[900], width: '100%', position: 'relative' }}>
                {((resumeContentLayout.button || resumeContentLayout.cover) && !isView) &&
                <Popover placement="topRight"
                         onOpenChange={(value) => setResumeContentLayout(prevState => ({...prevState, cover: value }))}
                         content={contentItemLayoutSettingCover}
                         trigger="click">
                    <MUIButton
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            position: "absolute",
                            top: "20px",
                            right: '20px',
                            zIndex: 1
                        }}
                    >
                        <MenuOpen />
                    </MUIButton>

                </Popover>

                }
                <CustomInput
                    name={[resumeIndex, "nameContentItem"]}
                    isView={isView}
                    coverStyle={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '20px',
                    }}
                    style={{ fontSize: '30px',
                        marginBottom: '0px',
                        textDecoration: 'underline',
                        textAlign: 'center'
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
                <Form.Item
                    name={[resumeIndex, "position"]}
                    hidden
                >
                    <Input/>
                </Form.Item>

            </Box>
            <Box ml={margin.left}
                 mt={5}
                 mr={margin.right}
                 sx={{ display: 'flex' }}
            >
                <Form.Item style={{ width: '100%' }}>
                    <Form.List name={[resumeIndex, "contentItemList"]}>
                        {(fields, { add, remove }) => (
                            // ToDo: Drag and Drop
                            <Box
                                display="grid"
                                gridTemplateColumns={isMobile ? "fill" : "repeat(60, 1fr)"}
                                gap="20px"
                            >
                                {fields.map((field, key) => {
                                        return (
                                            (
                                                <ContentItemBox
                                                    key={field.key}
                                                    contentItemIndex={key}
                                                    resumeContentIndex={resumeIndex}
                                                    layout={layout}
                                                    setLayout={setLayout}
                                                    add={add}
                                                    remove={remove}
                                                />
                                            )
                                        )
                                    }
                                )}
                                {!isView &&
                                <Box
                                    gridColumn="span 20">
                                    <Form.Item>
                                        <Button style={{ marginTop: '30px', backgroundColor: 'transparent', color: colors.primary[100] }} type="dashed" onClick={() => add(textBoxDefault)} block icon={<PlusOutlined />}>
                                            Add Content Item
                                        </Button>
                                    </Form.Item>
                                </Box>
                                }
                            </Box>
                        )}
                    </Form.List>
                </Form.Item>

            </Box>

        </Box>
    );
};

export default ResumeContent;
