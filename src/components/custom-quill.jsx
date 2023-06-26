import {Box} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

const QuillEditor = ({value, isView, onChange, style, ...rest}) => {
    const formats = [
        'background',
        'bold',
        'color',
        'font',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'code-block',
        'formula'
    ];

    const modules = {
        toolbar: [
            [{ header: [1,2,3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'code-block'],
            [{ color: [] }, { background: [] }],
            ['clean']
        ]
    }

    return (
        <>
                <Box p={2} sx={{
                    "& .ql-toolbar" : {
                        backgroundColor: "wheat",
                        width: '100%',
                        display: isView ? 'none' : 'block',
                        position: 'sticky',
                        top: '0px',
                        zIndex: 100
                    },
                    "& .ql-container" : {
                        border: isView && 'none',
                        width: `100%`
                    },
                    "& .ql-editor" : {
                        wordBreak: 'break-word',
                        width: `100%`
                    },
                    width: '100%'
                }}>
                    <ReactQuill
                        theme={"snow"}
                        modules={modules}
                        formats={formats}
                        value={value}
                        onChange={onChange}
                        style={{ height: '350px', overflow: 'auto', maxHeight: "350px", ...style }}
                        readOnly={isView}
                        {...rest}
                    />
                </Box>
        </>
    )
}

export default QuillEditor
