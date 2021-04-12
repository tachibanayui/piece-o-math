import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react';
import { BsFillTrashFill, BsQuestion } from 'react-icons/bs'
import types from '../utils/mathType';
import { useGameOptionsContext } from '../contexts/GameOptionsContext';

export default function MathHeaderEntry(props) {
    const {id, typeId, name, weight, isInflated, isSelectable = true} = props;
    const typeInfo = types.find(x => x.id === typeId);
    const { removeMathOptions, modifyMathOptionsWeight, mathOptionsMaxWeight: maxWeight, renameMathOptions, mathOptionsSelection, selectMathOptions } = useGameOptionsContext();
    const isSelected = mathOptionsSelection === id;

    const element = useRef();

    useEffect(() => {
        const handleUnfocus = (e) => {
            if(!e.target.value)
                renameMathOptions(id, typeInfo.name);
        }

        element.current && element.current.addEventListener('focusout', handleUnfocus);
        return () => {
            element.current && element.current.removeEventListener('focusout', handleUnfocus);
        }
    }, [element.current]);

    var handleChange = (e) => {
        if(e.target.name === 'weight') {
            modifyMathOptionsWeight(id, e.target.valueAsNumber);
        }
    }

    var handleDelete = (e) => {
        removeMathOptions(id);
    }

    var handleRename = (e) => {
        renameMathOptions(id, e.target.value);      
    }

    var handleSelect = (e) => {
        // Bug: no selection
        isSelectable && selectMathOptions(id);  
    }

    return (
        <Wrapper onClick={handleSelect} style={{background: (isSelected && isSelectable) ? '#ffffff46' : 'transparent'}}>
            <div className={`me-header ${isInflated && 'me-header-inflated'}`}>
                { (typeInfo && typeInfo.icon) || <BsQuestion />}
                <div className='name'>
                    <input ref={element} type="field" placeholder='name...' value={name} onChange={handleRename}></input>
                    <p>{name}</p>
                </div>
                {
                    isInflated ? 
                    <button className={`btn btn-del-type btn-destructive btn-del-type-inflated`} onClick={handleDelete}><BsFillTrashFill/> Delete </button>:
                    <button className={`btn btn-del-type btn-subtle`} onClick={handleDelete}><BsFillTrashFill/></button>
                }
            </div>
            
            <div className={`me-weight ${isInflated && 'me-weight-inflated'}`}>
                <p className='w-text'>weight: </p>
                <input className='w-range' name='weight' type='range' min={0} max={maxWeight} value={weight} step='0.0001' onChange={handleChange}></input>
                <input className='w-num' name='weight' type='number' min='0' value={weight} step='0.1' onChange={handleChange}></input>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
padding: 4px;
border-radius: 4px;

.me-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 4px;
    align-items: center;
}

.me-header > p { margin: 0; }
.me-header-inflated > p { font-size: 24px; }

.me-weight {
    display: grid;
    grid-template-columns: auto 1fr auto;
    margin-top: 8px;
}

.me-weight-inflated { column-gap: 12px; }

.hidden {
    visibility: hidden;
}

.name {
    position: relative;
}

.name > p {
    position: absolute;
    top: 6px;
    left: 12px;
    font-size: 14px;
}

.name > input {
    width: 100%;
    font-size: 14px;
    visibility: hidden;
}

.name:hover > p {
    visibility: hidden;
}

input:focus ~ p {
    display: none;
}

.name:hover > input, .name > input:focus {
    visibility: visible;
}


.w-num {
    align-self: center;
    width: 100%;
}

.btn-del-type {
    color: red;
}
.btn-del-type > svg {
    transform: translateY(2px);
}

.btn-del-type-inflated:hover {
    color: white;
}
`;