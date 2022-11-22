import React from "react";

import {StyledTitle} from "../../styles/styles"

const Title = ({children}) => {

    return (
        <StyledTitle>
            {children}
        </StyledTitle>
    )
}

export default Title;