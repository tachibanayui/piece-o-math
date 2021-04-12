import React, { useReducer, useEffect, useContext } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { apiOrigin, epCreateTempUser, gatewayEndpoint } from '../utils/consts';
import { BACKEND_SETACCESSTOKEN, BACKEND_SETCONNECTION } from '../utils/reducerActions';
import axios from 'axios';

const BackendContext = React.createContext();
const intialState = {
    accessToken: '',
    connection: null,
}

function backendReducer(state, action) {
    if(action.action == BACKEND_SETCONNECTION) {
        return {...state, connection: action.payload}
    } else if(action.action === "Your Action") {
        //Logic code here
    } else {
        throw new Error("Couldn't find the specified dispatch action!");
    }
}

export function BackendProvider({children}) {
    const [state, dispatch] = useReducer(backendReducer, intialState);
    //Your logic code here...

    async function createTempUser() {
        var result = await axios.push(epCreateTempUser);
        console.log(result);
        dispatch({action: BACKEND_SETACCESSTOKEN, payload: result.data.access_token});
    }

    async function connectToGateway() {
        const connection = new HubConnectionBuilder()
            .withUrl(`${gatewayEndpoint}?access_token=${state.accessToken}`)
            .build();

        connection.on('Ping', (e) => console.log(e));

        await connection.start();
        dispatch({action: BACKEND_SETCONNECTION, payload: connection});
    }

    return (
        <BackendContext.Provider value={{
            ...state,
            connectToGateway
            }}>
            {children}
        </BackendContext.Provider>
    )
}

export function useBackendContext() {
    return useContext(BackendContext);
}