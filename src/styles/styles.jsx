import styled from 'styled-components';

// general 

export const AppWrapper = styled.div`
    height: 1000vh;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(116.57deg, #011724 19.34%, #04263A 54.86%, #01273D 90.38%);
`;


export const Container = styled.div`
   margin: 0 auto;
   margin-top: 100px;
   max-width: 1210px;
`;


// auth

export const ContainerHeader = styled.div`
    margin-bottom: 20px;
`;

export const ContainerAuth = styled.div`
    margin: 0 auto;
    width: 810px;
`;

export const ShopHeaderWr = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LogoWr = styled.div`
    margin-right: 60px;
`;

export const StyledModal = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    opacity: ${({active}) =>  active ? '1' : '0'};
    pointer-events: ${({active}) =>  active ? 'all' : 'none'};
`;

export const StyledModalContent = styled.div`
    padding: 20px;
    border-radius: 12px;
    width: 700px;
    height: auto;
    background-color: #031E2F;
`;

export const StyledModalTitle = styled.div`
    margin-bottom: 10px;
    color: #fff;
`;

export const StyledLabelText = styled.div`
    margin-bottom: 5px;
    font-size: 12px;
    color: #fff;
`;

export  const HeaderWr= styled.div`
    margin-bottom: 50px;
    display: flex;
    align-items: center;
`;


//ui

export const StyledButton = styled.button`
    display: block;
    margin-left: auto;

    padding: ${({padding}) => padding};
    font-size: ${({size = '16px'}) => size};
    background-image: ${({image}) => image ? `url(${image})` : 'none'};
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${({color = '#337EAA'}) => color};
    border: none;
    border-radius: ${({raduis = '5px'}) => raduis};
    color: #FFF;
    cursor: pointer;       
`;


export const StyledImage = styled.img`
    max-width: 100%;
    height: 100%;
`;

export const StyledInput = styled.input`
    margin-bottom: ${({margin}) => margin};
    margin-left: ${({marginLeft = '0px'}) => marginLeft};
    width: 100%;
    padding: ${({padding}) => padding};
    font-size: ${({size}) => size};
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    background-color: ${({bg}) => bg};
    color:  ${({color}) => color};
`;

export const StyledSubTitle = styled.h1`FH
    font-style: normal;
    font-weight: 500;
    font-size: 2.25rem;
    text-align: center;
    color: #fff;
`;

export const StyledTitle = styled.h1`
    font-size: 3em;
    text-align: center;
    color: #fff;
`;

// table data

export const Table = styled.table`
    align-self: stretch;
`

export const TableTr = styled.tr`
    padding: 20px 10px;
    border-bottom: 2px solid #417B9D;

    display: flex;
    justify-content: space-between;
`

export const TableTh = styled.th`
    width: 50%;
    font-weight: bold;
`

export const TableTd = styled.td.attrs(({userId}) => ({
    id: userId
}))`
    width: 50%;
`

// product

export const CartContainer = styled.div`
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
`

export const Card = styled.div.attrs(({id}) => ({
    id: id
}))`
    margin-right: 20px;
    margin-bottom: 20px;
    width: ${({per = '23%'}) => per};
    padding: 20px;
    height: 100%;

    position: relative;
    background: linear-gradient(180deg, #001E29 0%, #002735 20.83%, #002F40 100%);
    border-radius: 5px;
    cursor: pointer;
`
export const CardTitle = styled.div`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: #fff;
    text-align: center;
`
export const CardDescription = styled.div`
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
`


export const CardPrice = styled.div`
    margin-bottom: 25px;
    font-size: 17px;
    font-weight: 700;
    line-height: 17px;
`
export const CardClose = styled.div`
    position: absolute;
    top: 6px;
    right: 4px;

    width: 12px;
    height: 12px;

    background-image: url(${({src}) => src});
    background-repeat: no-repeat;
`

export const Div = styled.div`
    display: flex;
    justify-content: space-between;
`

//cartProduct

export const CardInCart = styled.div`
    width: 100%;

    display: flex;
`
export const CardInCartCounter = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const CardInCartCounterRes = styled.div`
    width: 30px;
    height: 26px;
    background: #337EAA;
`
