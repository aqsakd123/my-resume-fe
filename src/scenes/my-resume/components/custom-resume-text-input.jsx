import {Button, Form, Popover, Select, Slider, Space} from "antd";
import Input from "antd/es/input/Input";
import {Box, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useContext, useEffect, useState} from "react";
import {Menu, Settings} from "@mui/icons-material";
import CustomInput from "../../../components/custom-input-form";
import {
    layoutSettingDefault,
    selectColorCoverImage,
    selectCoverImage,
    selectLayout,
    selectTextInput
} from "../common/common-data";
import {CloseSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {PreviewContext} from "../resume-form";
import CustomTextArea from "../../../components/custom-textarea";
import QuillEditor from "../../../components/custom-quill";
import {mediaQuery} from "../../../common/common-data";

const CustomResumeInput = ({value, placeholder, rules, style, index, remove, add, contentItemIndex, position, resumeContentIndex, ...restProps}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const context = useContext(PreviewContext)
    const isView = context.isPreview
    const isMobile = useMediaQuery(mediaQuery)
    const form = context.form

    const [isDisplayLayout, setIsDisplayLayout] = useState({ button: false, pop: false })
    const [layoutSetting, setLayoutSetting] = useState({ fontWeight: 100, fontSize: 16, layout: 4 })

    useEffect(() => {
        const layout = form.getFieldsValue()?.resumeContentItemList[resumeContentIndex]?.contentItemList[contentItemIndex]?.textItemList[index]
        if(layout) {
            setLayoutSetting(prevState => ({ ...prevState, ...layout }) )
        }
    }, [])

    useEffect(() => {
        const fieldName = ['resumeContentItemList', resumeContentIndex, 'contentItemList', contentItemIndex, 'textItemList', index, 'position']
        form.setFieldValue(fieldName, index)
    }, [index])

    function getValuePosition(value){
        return { value: index }
    }

    function modifiedByQuill(value){
        const fieldName = ['resumeContentItemList', resumeContentIndex, 'contentItemList', contentItemIndex, 'textItemList', index, 'textContent']
        form.setFieldValue(fieldName, value)
        setLayoutSetting(prevState => ({ ...prevState, textContent: value }))
    }

    const popOverContent = (
        <>
            <Form.Item
                name={[index, "fontWeight"]}
                label="Font weight"
                style={{ width: '200px' }}
            >
                <Slider
                    min={100}
                    step={100}
                    max={900}
                    onChange={(value) => setLayoutSetting(prevState => ({ ...prevState, fontWeight: value }))}
                />
            </Form.Item>
            <Form.Item
                name={[index, "fontSize"]}
                label="Font size"
                style={{ width: '200px' }}
            >
                <Slider
                    min={16}
                    step={4}
                    max={40}
                    onChange={(value) => setLayoutSetting(prevState => ({ ...prevState, fontSize: value }))}
                />
            </Form.Item>
            <Form.Item
                name={[index, "layout"]}
                label="Layout"
                style={{ width: '200px' }}
            >
                <Select
                    options={selectLayout}
                    onChange={(value) => setLayoutSetting(prevState => ({ ...prevState, layout: value }))}
                />
            </Form.Item>
            <Form.Item
                name={[index, "typeTextInput"]}
                label="Field Type"
                style={{ width: '200px' }}
            >
                <Select
                    options={selectTextInput}
                    onChange={(value) => setLayoutSetting(prevState => ({ ...prevState, typeTextInput: value }))}
                />
            </Form.Item>
            <Button type="dashed" onClick={() => add(layoutSettingDefault, index + 1)} block icon={<PlusSquareOutlined />}>
                Add Field
            </Button>
            {index > 0 &&
                <Button type="dashed" onClick={() => remove(index)} block icon={<CloseSquareOutlined />}>
                    Remove
                </Button>
            }
        </>
    )

    return (
        <Box
            gridColumn={`span ${layoutSetting.layout}`}
        >
                <Form.Item
                    preserve={true}
                >
                    <Box
                        onMouseEnter={() => setIsDisplayLayout(prevState => ({ ...prevState, button: true }))}
                        onMouseLeave={() => {
                            setIsDisplayLayout(prevState => ({ ...prevState, button: false }))
                        }}
                        sx={{ display: 'flex', position: "relative", width: '100%' }}
                    >
                        {(layoutSetting?.typeTextInput === 2)?
                            <QuillEditor
                                theme={"snow"}
                                isView={isView}
                                value={layoutSetting?.textContent}
                                onChange={(e) => modifiedByQuill(e)}
                                style={{ height: '350px', width: `100%`, marginBottom: '40px' }}
                            />
                            :
                            <CustomTextArea
                                row={1}
                                name={[index, "textContent"]}
                                isView={isView}
                                style={{ marginBottom: '0px', fontWeight: layoutSetting.fontWeight, fontSize: layoutSetting.fontSize }}
                                {...restProps}
                            />
                        }
                        {((isDisplayLayout.button || isDisplayLayout.pop) && !isView) &&
                        <Popover
                            placement="bottomRight"
                            onOpenChange={(value) => setIsDisplayLayout(prevState => ({ ...prevState, pop: value }))}
                            content={popOverContent}
                            trigger="click">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                sx={{ backgroundColor: colors.blueAccent[800],
                                    width: '35px', height: '35px',
                                    borderRadius: '5px',
                                    position: 'absolute',
                                    top: '-35px',
                                    right: '0px'
                                    // visibility: ((isDisplayLayout.button || isDisplayLayout.pop) && !isView) ? "visible" : "none"
                                }}>
                                <Menu />
                            </IconButton>
                        </Popover>

                        }
                    </Box>
                </Form.Item>
        </Box>

    );
};

export default CustomResumeInput;
