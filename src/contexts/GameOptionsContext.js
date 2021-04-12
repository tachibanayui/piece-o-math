import React, { useReducer, useEffect, useContext } from 'react';
import { GAMEOPTIONS_ADD_QUESTION, GAMEOPTIONS_CHANGE_SELECTION, GAMEOPTIONS_MODIFY_MAX_WEIGHT, GAMEOPTIONS_MODIFY_QUESTION, GAMEOPTIONS_MODIFY_QUESTION_DATA, GAMEOPTIONS_REMOVE_QUESTION, GAMEOPTIONS_RESET, GAMEOPTIONS_UPDATE_MAX_WEIGHT } from '../utils/reducerActions';
import MathType from '../utils/mathType';
import { v1 as uuidv1 } from 'uuid';

const maxWeightSlider = 2;
const GameOptionsContext = React.createContext();
const intialState = {
    mathOptionsMaxWeight: 10,
    mathOptionsSelection: null,
    mathOptions: [
        

    ]
}

function gameOptionsReducer(state, action) {
    console.log(action, action.action);
    if(action.action === GAMEOPTIONS_RESET) {
        // Expected payload: none
        return {...intialState };
    } else if (action.action === GAMEOPTIONS_ADD_QUESTION) {
        // Expected payload: math options object
        return {...state, mathOptions: [...state.mathOptions, action.payload ]};
    } else if (action.action === GAMEOPTIONS_CHANGE_SELECTION) {
        // Expected payload: string: mathOptions id
        return {...state, mathOptionsSelection: action.payload}
    } else if (action.action === GAMEOPTIONS_REMOVE_QUESTION) {
        // Expected payload: math options id
        return {...state, mathOptions: state.mathOptions.filter(x => x.id !== action.payload) }
    } else if (action.action === GAMEOPTIONS_MODIFY_MAX_WEIGHT) {
        return {...state, mathOptionsMaxWeight: action.payload }
    } else if (action.action === GAMEOPTIONS_MODIFY_QUESTION) {
        // Expected payload: { id: math options id, data: math options new data }
        const mathOptions = [...state.mathOptions];
        const itemIndex = mathOptions.findIndex(x => x.id === action.payload.id);
        // Prone to RangeError if user provide data not from our state
        mathOptions[itemIndex] = { ...mathOptions[itemIndex], ...action.payload.data };
        return {...state, mathOptions};
    } else if (action.action === GAMEOPTIONS_MODIFY_QUESTION_DATA) {
        // Expected payload: { id: math options id, data: mathOptions.data new value }
        const mathOptions = [...state.mathOptions];
        const itemIndex = mathOptions.findIndex(x => x.id === action.payload.id);
        // Prone to RangeError if user provide data not from our state
        mathOptions[itemIndex].data = { ...mathOptions[itemIndex].data, ...action.payload.data };
        return {...state, mathOptions};
    } else if (action.action === GAMEOPTIONS_UPDATE_MAX_WEIGHT) {
        return {...state, mathOptionsMaxWeight: Math.max(...state.mathOptions.map(x => x.weight), 5) * maxWeightSlider};
    } else {
        throw new Error("Couldn't find the specified dispatch action!");
    }
}

export function GameOptionsProvider({children}) {
    const [state, dispatch] = useReducer(gameOptionsReducer, intialState);

    /**
     * reset game options to its original state
     */
    function reset() { dispatch({action: GAMEOPTIONS_RESET}); }

    /**
     * add a new math option
     * @param {string} typeId the type's id of this math options. See utils/mathType.js for all mathoptions types
     */
    function addMathOptions(typeId) {
        const targetMathType = MathType.find(x => x.id === typeId);
        const id = uuidv1();
        dispatch({action: GAMEOPTIONS_ADD_QUESTION, payload: {...targetMathType.defaultState(), id, weight: 1}});
        selectMathOptions(id);
    }

    /**
     * remove a mathoptions
     * @param {string} id the math options identifier
     */
    function removeMathOptions(id) {
        dispatch({action: GAMEOPTIONS_REMOVE_QUESTION, payload: id});
        const newSelection = state.mathOptions.length ? state.mathOptions[state.mathOptions.length - 1].id : null;
        selectMathOptions(newSelection);
    }

    /**
     * Change the currently selected math options
     * @param {string} id the math options id
     */
    function selectMathOptions(id) {
        if(id !== state.mathOptionsSelection) {
            dispatch({action: GAMEOPTIONS_CHANGE_SELECTION, payload: id});
            dispatch({action: GAMEOPTIONS_UPDATE_MAX_WEIGHT});
        }
    }

    /**
     * rename math options
     * @param {string} id the math options identifier
     * @param {string} newName the new name of the math options
     */
    function renameMathOptions(id, newName) {
        dispatch({action: GAMEOPTIONS_MODIFY_QUESTION, payload: {id,  data: { name: newName }}});
    }

    /**
     * change the possibility weight for this math options
     * @param {string} id the math options identifier
     * @param {number} newWeight the new weight of the math options
     */
    function modifyMathOptionsWeight(id, newWeight) {
        dispatch({action: GAMEOPTIONS_MODIFY_QUESTION, payload: {id, data: {weight: newWeight}}});
    }

    /**
     * Change the math options specific data. This method is intented for MathOptions types to call 
     * and this method does not provide/modify addtional data
     * @param {string} id the math options identifier
     * @param {any} data the math optoins specific data
     */
    function modifyMathOptionsSpecificData(id, data) {
        dispatch({action: GAMEOPTIONS_MODIFY_QUESTION_DATA, payload: {id, data}});
    }
 

    return (
        <GameOptionsContext.Provider value={{
            ...state, 
            reset, 
            // General math options operations
            addMathOptions, removeMathOptions, selectMathOptions, 
            renameMathOptions, modifyMathOptionsWeight, modifyMathOptionsSpecificData, 
            }}>
            {children}
        </GameOptionsContext.Provider>
    )
}

export function useGameOptionsContext() {
    return useContext(GameOptionsContext);
}