import {Box, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useEffect, useState} from "react";
import {changeStatus, cloneResume, filter} from "./service/service";
import {Button, Form, Input, Popconfirm, Radio} from "antd";
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import PersonOffSharpIcon from '@mui/icons-material/PersonOffSharp';
import {CopyAllTwoTone, DriveFileRenameOutlineSharp} from "@mui/icons-material";
import {DeleteFilled} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router";
import {successInfo} from "../../common/common-function";
import {constant} from "./common/common-data";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../login-signup/store/settingReducer";

const ResumeList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [form] = Form.useForm()
    const userInfo = useSelector(selectUserInfo)
    const navigate = useNavigate();
    const location = useLocation()
    const searchParams = new URLSearchParams(location?.search);

    const [listResume, setListResume] = useState([])

    useEffect(() => {
        let payload = {authorType: 1}
        if(searchParams?.get('uuid')){
            form.setFieldValue('uuid', searchParams?.get('uuid'))
            payload = { ...payload, uuid: searchParams?.get('uuid')}
        }
        if(searchParams?.get('authorType')){
            form.setFieldValue('authorType', parseInt(searchParams?.get('authorType')))
            payload = { ...payload, authorType: parseInt(searchParams?.get('authorType'))}
        }

        filterListResume({ ...payload })
    }, [searchParams?.get('uuid'), searchParams?.get('authorType')])

    function searchByFilter(){
        const search = new URLSearchParams();
        if (form.getFieldValue('uuid')) {
            search.append('uuid', form.getFieldValue('uuid'));
        }
        if (form.getFieldValue('authorType')) {
            search.append('authorType', form.getFieldValue('authorType'));
        }
        navigate(`/resume?${search.toString()}`);
    }

    function deleteResume(id){
        changeStatusResume({id: id, action: constant.action.delete})
            .then((r) => {
                successInfo('DELETE_SUCCESS', () => undoResume(id))
            })
            .then(r => filterListResume({...form.getFieldsValue()}))
            .catch((r) => console.log(r))
    }

    function undoResume(id){
        changeStatusResume({id: id, action: constant.action.undo})
            .then(r => filterListResume({...form.getFieldsValue()}))
            .catch((r) => console.log(r))
    }

    function handleCloneResume(id, payload){
        cloneResume(id, payload)
            .then((r) => {
                successInfo('CLONE_SUCCESS')
            })
            .then(r => filterListResume({...form.getFieldsValue()}))
            .catch((r) => console.log(r))
    }

    async function filterListResume(payload) {
        await filter({...payload})
            .then(r => setListResume(r?.data))
            .catch(r => console.log(r))
    }

    async function changeStatusResume(payload) {
        return await changeStatus(payload)
            .catch(r => console.log(r))
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box className={"resume-list-box"} sx={{ width: '30%' }}>
                <Box sx={{ fontSize: '40px', fontWeight: 'bolder', paddingBottom: '30px' }}>
                    Search filter
                </Box>
                <Box>
                    <Form
                        layout={"horizontal"}
                        labelCol={{
                            span: 7,
                        }}
                        wrapperCol={{
                            span: 50,
                        }}
                        form={form}
                        preserve={true}
                        onFinish={searchByFilter}
                        style={{ width: '100%', backgroundColor: 'wheat', borderRadius: '10px', padding: '10px' }}
                    >
                        <Form.Item
                            label={"UUID"}
                            tooltip={"Đoạn mã uuid của 1 văn bản. Yêu cầu nhập chính xác tên mã UUID"}
                            name={"uuid"}
                            rules={[
                                {
                                    max: 50,
                                    message: 'UUID max length is 50 characters'
                                }
                            ]}
                            style={{
                                width : "100%",
                            }}
                        >
                            <Input placeholder={"UUID"}/>
                        </Form.Item>
                        <Form.Item
                            name={"authorType"}
                            label="Author Type"
                            tooltip={"If you choose unnamed author, you will get 10 random resume from unnamed author"}
                            initialValue={1}
                        >
                            <Radio.Group>
                                <Radio value={1}>Your resume</Radio>
                                <Radio value={2}>All Others</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType={"submit"} size={"large"}>
                                Search
                            </Button>
                            &nbsp;&nbsp;
                            <Button onClick={() => form.resetFields()}>
                                Reset
                            </Button>
                        </Form.Item>

                    </Form>
                </Box>
            </Box>
            <Box className={"resume-list-box"} sx={{ width: '60%' }}>
                <Box>
                    <Button onClick={() =>navigate(`/resume/create`)}>
                        CREATE A NEW RESUME
                    </Button>
                </Box>
                <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                    {listResume?.length > 0 && listResume?.map((item, index) => {
                        return (
                            <Box key={item?.id} sx={{ padding: '20px', display: 'flex', border: '1px solid', backgroundColor: index%2===0 ? colors.blueAccent[800] : colors.blueAccent[900] }}>
                                <Box sx={{ width: '70%' }}>
                                    <Typography variant="h3" component="h3" onClick={() =>navigate(`/resume/detail/${item.id}`)} sx={{ cursor: 'pointer', textTransform: 'uppercase', }}>
                                        {item.name}
                                    </Typography>
                                    <span style={{textTransform: 'uppercase',}}>{item.resumeTitle}</span>
                                </Box>
                                <Box sx={{ marginLeft: '30px' }}>
                                    {item.createdBy === userInfo?.username ?
                                        <>
                                            <IconButton onClick={() =>navigate(`/resume/update/${item.id}`)}>
                                                <DriveFileRenameOutlineSharp />
                                            </IconButton>
                                            <Popconfirm
                                                title="Delete Resume"
                                                description="Are you sure to delete this resume?"
                                                disabled={item.status === 0}
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => deleteResume(item?.id)}
                                            >
                                                <IconButton disabled={item.status === 0}>
                                                    <DeleteFilled />
                                                </IconButton>
                                            </Popconfirm>
                                            <Popconfirm
                                                title="Clone Resume"
                                                description="Are you sure to create a copy version of this resume?"
                                                disabled={item.status === 0}
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => handleCloneResume(item?.id, item)}
                                            >
                                                <IconButton disabled={item.status === 0}>
                                                    <CopyAllTwoTone />
                                                </IconButton>
                                            </Popconfirm>
                                            <Tooltip title={item.status === 0 ? "The resume has already been delete, you cannot perform any action with it" : "You're this resume author, you can edit, delete this resume"} >
                                                <IconButton sx={{ color: 'red' }}>
                                                    <StarsSharpIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                        :
                                        <Tooltip title="You aren't this resume author, you can't edit or delete this resume">
                                            <IconButton>
                                                <PersonOffSharpIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    );
}

export default ResumeList;
