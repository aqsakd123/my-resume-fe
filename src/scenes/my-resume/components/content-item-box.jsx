import {Button, Form, InputNumber, Popover, Select, Slider, Space} from "antd";
import Input from "antd/es/input/Input";
import {Box, Button as MUIButton, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useContext, useEffect, useState} from "react";
import {Menu, Settings} from "@mui/icons-material";
import CustomInput from "../../../components/custom-input-form";
import {layoutSettingDefault, selectColorCoverImage, selectCoverImage, selectLayout} from "../common/common-data";
import {CloseSquareOutlined, CopyOutlined, PlusOutlined} from "@ant-design/icons";
import CustomResumeInput from "./custom-resume-text-input";
import ContentItem from "./content-item";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {PreviewContext} from "../resume-form";
import CustomTextArea from "../../../components/custom-textarea";
import {mediaQuery} from "../../../common/common-data";

const ContentItemBox = ({layout, setLayout, contentItemIndex, resumeContentIndex, remove, add, contentItemRef, ...rest}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [contentItemLayout, setContentItemLayout] = useState({ button: false, cover: false })
    const [orderLayout, setOrderLayout] = useState(contentItemIndex)
    const context = useContext(PreviewContext)
    const isView = context.isPreview
    const isMobile = useMediaQuery(mediaQuery)

    function getValueOrder(value){
        return { value: orderLayout }
    }

    useEffect(() => {
        const layout = context?.form?.getFieldsValue()?.resumeContentItemList[resumeContentIndex]?.contentItemList[contentItemIndex]
        if(layout) {
            setLayout(prevState => ({ ...prevState, [contentItemIndex]: layout?.layoutSize }))
        }
    }, [])

    const contentItemLayoutSettingCover = (
        <Box>
            <label>
                Change layout content size
            </label>
            <Form.Item
                name={[contentItemIndex, "layoutSize"]}
                style={{ width: '200px' }}
            >
                <InputNumber
                    min={1}
                    max={layout.totalLayoutSize}
                    onChange={(value) => setLayout(prevState => ({ ...prevState, [contentItemIndex]: value }))}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                name={[contentItemIndex, "layoutOrder"]}
                getValueProps={getValueOrder}
                hidden
            >
                <Input disabled={true}/>
            </Form.Item>
            <Button type="dashed" onClick={() => {
                const content = { ...context.form?.getFieldsValue()?.resumeContentItemList[resumeContentIndex]?.contentItemList[contentItemIndex], id: null }
                const textItemList = content?.textItemList?.map(item => ({...item, id: null}))
                add({...content, textItemList: textItemList})
            }} block icon={<CopyOutlined />}>
                Duplicate
            </Button>
            {contentItemIndex > 0 &&
            <Button type="dashed" onClick={() => remove(contentItemIndex)} block icon={<CloseSquareOutlined />}>
                Remove
            </Button>
            }

        </Box>
    )

    const styleIsView = isView ? {
        maxHeight: '500px',
        overflow: 'auto'
    } : {}

    return (
        <Box
            gridColumn={`span ${(isMobile ? 2 : (layout[contentItemIndex] || 2)) * 10}`}
            sx={{ backgroundColor: 'rgb(255, 149, 168, 20%)', position: 'relative', padding: '10px', borderRadius: '10px', ...isView ? {
                    maxHeight: '500px',
                    overflow: 'auto'
                } : {}
            }}
            onMouseEnter={() => setContentItemLayout(prevState => ({...prevState, button: true }))}
            onMouseLeave={() => setContentItemLayout(prevState => ({...prevState, button: false }))}
            ref={contentItemRef}
            {...rest}
        >
            {((contentItemLayout.button || contentItemLayout.cover) && !isView) &&
            <Popover placement="topRight"
                     onOpenChange={(value) => setContentItemLayout(prevState => ({...prevState, cover: value }))}
                     content={contentItemLayoutSettingCover}
                     trigger="click">
                <MUIButton
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        position: "absolute",
                        width: '35px',
                        minWidth: '15px',
                        borderRadius: '0px',
                        top: "-32px",
                        right: '0px',
                        zIndex: 1
                    }}
                >
                    <Menu />
                </MUIButton>
            </Popover>
            }
            <CustomTextArea
                name={[contentItemIndex, "titleItem"]}
                isView={isView}
                row={1}
                style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '0px',
                    textDecoration: 'underline',
                    textDecorationThickness: 'from-font',
                    width: "100%"
                }}
                rules={[
                    {
                        required: true,
                        message: 'Field Required'
                    },
                    {
                        max: 250,
                        message: 'Field Max Length is 250 characters'
                    }
                ]}
            />
            <ContentItem
                contentItemIndex={contentItemIndex}
                resumeContentIndex={resumeContentIndex}
            />
        </Box>
    );
};

export default ContentItemBox;
