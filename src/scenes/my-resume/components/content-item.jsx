import {Button, Form, Popover, Select, Slider, Space} from "antd";
import Input from "antd/es/input/Input";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useContext, useState} from "react";
import {Menu, Settings} from "@mui/icons-material";
import CustomInput from "../../../components/custom-input-form";
import {layoutSettingDefault, selectColorCoverImage, selectCoverImage, selectLayout} from "../common/common-data";
import {PlusOutlined} from "@ant-design/icons";
import CustomResumeInput from "./custom-resume-text-input";
import {PreviewContext} from "../resume-form";

const ContentItem = ({contentItemIndex, resumeContentIndex}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const context = useContext(PreviewContext)
    const isView = context.isPreview

    return (
        <Box>
            <Form.Item style={{ width: '100%' }}>
                <Form.List name={[contentItemIndex, "textItemList"]}>
                    {(fieldsContentItemList, { add, remove }) => (
                        <Box p={2}>
                            <Box
                                display="grid"
                                gridTemplateColumns={"repeat(4, 1fr)"}
                                columnGap="10px"
                            >
                                {fieldsContentItemList.map((fieldTextItem, keyTextInput) => {
                                    return (
                                        <CustomResumeInput
                                            key={fieldTextItem?.key}
                                            index={keyTextInput}
                                            contentItemIndex={contentItemIndex}
                                            resumeContentIndex={resumeContentIndex}
                                            position={fieldTextItem.key}
                                            add={add}
                                            remove={remove}
                                        />
                                    )
                                })}
                            </Box>
                            {!isView &&
                            <Form.Item>
                                <Button style={{ width: '100%', wordBreak: 'break-word' }} type="dashed" onClick={() => add(layoutSettingDefault)} block icon={<PlusOutlined />}>
                                    Add Text Label
                                </Button>
                            </Form.Item>
                            }
                        </Box>
                    )}
                </Form.List>
            </Form.Item>

        </Box>

    );
};

export default ContentItem;
