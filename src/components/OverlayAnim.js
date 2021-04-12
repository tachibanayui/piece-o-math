import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { lerp } from '../utils/mathUtils';

export function useOverlayAnim(props) {
    props = props || defaultOptions;
    const [options, setOptions] = useState({...props});
    const [percentage, setPercentage] = useState(props.intialPecentage || 0);

    function setProgress(p) {
        setPercentage(p);
    }

    return {...options, percentage, setProgress}
}

const defaultOptions = {
    origin: {
        right: 110,
        bottom: 0,
    },
    radius: 0,
    background: 'red',
    percentage: 0.1,
    interval: '0.3s'
}

export default function OverlayAnim({hook}) {
    const { origin, percentage, background, interval, radius } = hook || {...defaultOptions};
    const { top, left, right, bottom} = origin;

    const eleContainer = useRef();
    const eleChild = useRef();
    const [desiredLength, setDesiredLength] = useState(1);
    const [sign, setSign] = useState({x: 1, y: 1});
    const [sizeObserver, setSizeObserver] = useState();
    const rd = lerp(radius, desiredLength, percentage);

    const recalc = () => {
        const rectParent = eleContainer.current && eleContainer.current.getBoundingClientRect();
        const rectChild = eleChild.current && eleChild.current.getBoundingClientRect();
        if(rectParent && rectChild) {
            // calc length
            const x = rectChild.width / 2 + rectChild.x - rectParent.x;
            const y = rectChild.height / 2 + rectChild.y - rectParent.y;

            const ctl = x ** 2 + y ** 2;
            const cbl = x ** 2 + (rectParent.height - y) ** 2;
            const ctr = (rectParent.width - x) ** 2 + y ** 2;
            const cbr = (rectParent.width - x) ** 2 + (rectParent.height - y) ** 2;
            setDesiredLength(Math.sqrt(Math.max(ctl, cbl, ctr, cbr)) * 2);

            // calc sign
            let xSign = 1;
            let ySign = 1;
            const isRtl = rectParent.current && getComputedStyle(rectParent.current).direction === 'rtl';
            if (left !== undefined && right !== undefined) {
                xSign = isRtl ? -1 : 1;
            } else if (right !== undefined) {
                xSign = -1;
            }
            
            if (top !== undefined && bottom !== undefined) {
                ySign = isRtl ? -1 : 1;
            } else if (bottom !== undefined) {
                ySign = -1;
            }
            setSign({x: xSign, y: ySign});
        }
    }

    useEffect(() => {
        recalc();
        const observer = new ResizeObserver(recalc);
        observer.observe(eleContainer.current);
        setSizeObserver(observer);

        return () => sizeObserver && sizeObserver.disconnect();
    }, [eleContainer.current, eleChild.current, hook])

    return (
        <Wrapper ref={eleContainer} style={{width: '100vw', height: '100vh'}}>
            <div style={{
                width: rd, 
                height: rd,
                top, left, right, bottom,
                background, 
                transition: `all ${interval}`, 
                transform: `translate(${-rd/2*sign.x}px, ${-rd/2*sign.y}px)` }} ref= {eleChild} className='circle'></div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
position: relative;
overflow: hidden;

.circle {
    position: absolute;
    border-radius: 1000000px;
}
`;