import styled from 'styled-components'
import { TiSortNumerically } from 'react-icons/ti'
import { BsFillTrashFill } from 'react-icons/bs'
import MathHeaderEntry from './MathHeaderEntry'
import { useGameOptionsContext } from '../contexts/GameOptionsContext'

export const OP_ADD = 0;
export const OP_SUBTRACT = 1;
export const OP_MULTPLY = 2;
export const OP_DIVIDE = 3;

export function getDefaultState() {
    return {
        typeId: 1,
        name: "Integer Operation",
        weight: 1,
        data: {
            aFrom: 1,
            aTo: 10,
            bFrom: 1,
            bTo: 10,
            op: OP_ADD,

            useRl: false,
            rlFrom: 1,
            rlTo: 10,

            rm: false, // remainder
        }
    }
}

export default function IntegerOperation(props) {
    const { id, data } = props;
    const { aFrom, aTo, op, bFrom, bTo, useRl, rlFrom, rlTo, rm } = data;

    const { modifyMathOptionsSpecificData } = useGameOptionsContext();

    const handleInput = (e) => {
        modifyMathOptionsSpecificData(id, { [e.target.name]: e.target.value });
    };

    const handleNumberInput = (e) => {
        modifyMathOptionsSpecificData(id, { [e.target.name]: e.target.valueAsNumber });
    };

    const handleCheckBox = (e) => {
        console.log(e.target.checked)
        modifyMathOptionsSpecificData(id, { [e.target.name]: e.target.checked });
    }

    return (
        <Wrapper>
            <MathInput>
                <div className='io-header'>
                    <MathHeaderEntry {...props} isInflated={true} isSelectable={false} />
                </div>
                <span className='io-from-at'>from</span>
                <input name='aFrom' className='io-from-ai' type='number' value={aFrom} max={aTo} onChange={handleNumberInput}></input>
                <span className='io-to-at'>to</span>
                <input name='aTo' className='io-to-ai' type='number' value={aTo} onChange={handleNumberInput}></input>
                <div className='io-op'>
                    <p>Operator</p>
                    <select name='op' value={op} onChange={handleInput}>
                        <option value={OP_ADD}>+</option>
                        <option value={OP_SUBTRACT}>-</option>
                        <option value={OP_MULTPLY}>*</option>
                        <option value={OP_DIVIDE}>/</option>
                    </select>                
                </div>

                <span className='io-from-bt'>from</span>
                <input name='bFrom' className='io-from-bi' type='number' value={bFrom} max={bTo} onChange={handleNumberInput}></input>
                <span className='io-to-bt'>to</span>
                <input name='bTo' className='io-to-bi' type='number' value={bTo} onChange={handleNumberInput}></input>
                <div className='h-sep'></div>
            </MathInput>

            <ResultLimiter>
                <div className='title-rl'>
                    <input name='useRl' type='checkbox' checked={useRl} onChange={handleCheckBox}/>
                    <h3> Result limiter </h3>
                    <p>(Useful for practicing with equations have remainders)</p>
                </div>
                <div className={`options-rl ${!useRl && 'disabled'}`}>
                    <span className='io-from-rlt'>from</span>
                    <input name='rlFrom' disabled={!useRl} className='io-from-rli' type='number' value={rlFrom} max={rlTo} onChange={handleNumberInput}></input>
                    <span className='io-to-rlt'>to</span>
                    <input name='rlTo' disabled={!useRl} className='io-to-rli' type='number' value={rlTo} onChange={handleNumberInput}></input>
                </div>
            </ResultLimiter>

            {
                op == OP_DIVIDE &&
                <div className='remainder'>
                    <input name='rm' type='checkbox' checked={rm} onChange={handleCheckBox}></input> 
                    <h3> Ask remainder? </h3>
                </div>
            }
            
        </Wrapper>
    );
}

const MathInput = styled.div`
display: grid;
row-gap: 4px;
position: relative;
align-items: center;

grid-template:  'h    h       h       h     h'
                '.    fromat  fromai  toat  toai' auto
                'op   fromat  fromai  toat  toai' auto
                'op   .       .       .     .   ' auto
                'op   frombt  frombi  tobt  tobi' auto
                '.    frombt  frombi  tobt  tobi' auto 
                'hsep hsep    hsep    hsep  hsep' auto /
                 auto auto    auto    auto  auto;

> h2 { margin-bottom: 50px; }
> span {
    margin-left: auto; 
    margin-right: 8px; 
}

> .h-sep {
    width: unset;
    grid-area: hsep;
    margin: 8px 0;
}

.io-header { grid-area: h; }
.io-from-at { grid-area: fromat; }
.io-from-ai { grid-area: fromai; }
.io-to-at { grid-area: toat; }
.io-to-ai { grid-area: toai; }
.io-op { grid-area: op; }

.io-op > p {margin: 0; padding: 0;}
.io-from-bt { grid-area: frombt; }
.io-from-bi { grid-area: frombi; }
.io-to-bt { grid-area: tobt; }
.io-to-bi { grid-area: tobi; }
`;

const ResultLimiter = styled.section`
.title-rl {
    grid-area: rl;
    display: flex;
    gap: 4px;
    align-items: center;
}

.title-rl > p { color: var(--clr-text-subheading); }

.options-rl { 
    width: 50%;
    display: grid;
    grid-template: "ft fi" auto 
                   "tt ti" auto /
                   auto 1fr;
    gap: 10px 25px;
    align-items: center;
    margin-left: 25px;

    transition: opacity 0.3s;
}
`;

const Wrapper = styled.section`
padding: 8px 24px;

.remainder {
    display: flex;
    align-items: center;
    gap: 4px;
}
`;