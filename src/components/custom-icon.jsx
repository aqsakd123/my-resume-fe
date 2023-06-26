import React from "react";
import * as Icons from "react-icons/hi2";

const CustomIcon = ({ name }) => {
    let IconComponent = Icons[name];

    return (
        <>
            {IconComponent ?
                <IconComponent />
                :
                <span>No Icon Found</span>
            }
        </>
    );
};

export default CustomIcon;
