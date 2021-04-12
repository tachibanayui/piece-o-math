import styled from 'styled-components'
import { IoAdd, IoOptionsOutline } from 'react-icons/io5';
import MathHeaderEntry from './MathHeaderEntry';
import React, { useState, useEffect }from 'react'
import mathType from '../utils/mathType';
import { useGameOptionsContext } from '../contexts/GameOptionsContext';
import { BiTaskX } from 'react-icons/bi';

export default function MathOptions() {
    const [isOpen, setIsOpen] = useState(false);
    const cp = useGameOptionsContext();
    const { mathOptions , addMathOptions, mathOptionsSelection: mosId} = cp;
    const mosData = mathOptions.find(x => x.id === mosId);
    const mosInfo = mosData && mathType.find(x => x.id === mosData.typeId);
    
    const handleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const handleAdd = (id) => {
        addMathOptions(id);
        handleDropDown();
    }

    return (
        <Wrapper>
            <div className='m-header'>
                <h2>Math options</h2>
                <h3>Select type of math question to generate</h3>
            </div>

            <div className='qt'>
                <div>
                    {
                        mathOptions.length ? 
                        mathOptions.map(x => <MathHeaderEntry key={x.id} {...x}/>) :
                        <div className='mathoptions-empty'>
                            <BiTaskX/> 
                            <h3>No math options</h3>
                            <p>Click the button below to explore what type of math problem are available</p>
                        </div>
                    }

                    <div className='btn-add-qt-container'>
                        <button onClick={handleDropDown} className='btn-add-qt center-child'> 
                            <IoAdd/> Add question type 
                        </button>
                        <div className={`qt-dropdown ${!isOpen && 'qt-dropdown-close'}`}>
                            {mathType.map(x => 
                            <button key={x.id} className='btn btn-subtle item-mathtype' onClick={() => handleAdd(x.id)}>
                                {x.icon}
                                <p>{x.name}</p>
                                <p className='item-summary-mathtype'>{x.summary}</p>
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className='qo'>
                {
                    mosInfo ? 
                        React.createElement(mosInfo.optionUI, {...mosData}):
                        <div className='option-select-none'>
                            <IoOptionsOutline />
                            <h3>No math options selected!</h3>
                            <p>Select a math option to edit or create one </p>
                        </div>
                }
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
display: grid;
gap: 8px;
background: #46464646;
padding: 8px;
border-radius: 16px;
grid-template: "m-header m-header" auto
               "qt qo" 1fr /
               300px 1fr;

.m-header {
    grid-area: m-header;
    display: block;
    padding: 12px;
}

h2, h3 {margin: 0}

.qt {
    grid-area: qt;
    overflow-y: auto;
    position: relative;
}

.qt > div {position: absolute;}

.qo {
    grid-area: qo;
    border-radius: 8px;
    background: var(--clr-bg-elevation-2);
    display: grid;
    align-items: stretch;
    justify-content: stretch;
}

.btn-add-qt {
    border: 1px dashed var(--clr-primary-2);
    border-radius: 4px;
    width: 100%;
    color: var(--clr-primary-2);
    background: transparent;
    padding: 6px;
    transition: all 0.3s;
}

.btn-add-qt:hover {
    background: var(--clr-primary-2);
    color: var(--clr-text);
}

.mathoptions-empty {
    padding: 8px;
}

.mathoptions-empty > * {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.mathoptions-empty > svg {
    font-size: 50px;
}

.mathoptions-empty > p {
    font-size: 14px;
}

.qt-dropdown {
    position: absolute;
    bottom: -2px;
    transform: translateY(100%);
    background: var(--clr-bg-elevation-1);
    color: white;
    width: 100%;
    border-radius: 4px;
    padding: 4px;
}

.btn-add-qt-container {
    position: relative;
}

.qt-dropdown-close {
    display: none;
}

.item-mathtype {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    gap: 8px;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
    margin: 0;
    width: 100%;
}

.item-mathtype:hover {
    background: var(--clr-bg-elevation-2);
}

.item-mathtype > * {
    font-size: 20px;
    text-align: left;
}

.item-summary-mathtype {
    grid-column: 1 / 3;
    font-size: 14px;
}

.option-select-none {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.option-select-none > svg {
    font-size: 50px;
} 

.option-select-none > h3 {
    font-size: 30px;
    margin-bottom: 12px;
}

`;