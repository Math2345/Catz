import React from "react";

import {StyledButton} from "../../styles/styles"


const Button = ({children, ...props}) => {

    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    )
}

export default Button;