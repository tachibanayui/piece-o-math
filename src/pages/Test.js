import { useEffect } from 'react';
import styled from 'styled-components'
import { useBackendContext } from '../contexts/BackendContext';

export default function Test() {
    const { connectToGateway, connection, createTempUser } = useBackendContext();
    useEffect(() => {
        connectToGateway();
    }, []);


    return (
        <Wrapper>
            <button onClick={() => connection.send("Ping", "123123")}>Ping</button>
        </Wrapper>
    );
}

const Wrapper = styled.section``;