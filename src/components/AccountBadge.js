import styled from 'styled-components'

export default function AccountBadge() {
    return (
        <Wrapper>
            <div className='badge'></div>          
            <p>Test</p>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 8px;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    p { margin: 0;}

    div {
        background: pink;
        border-radius:100px;
        width: 40px;
        height: 40px;
    }
`;