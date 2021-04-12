import { useState, useRef} from 'react'
import styled from 'styled-components'
import {v1 as uuidv1} from 'uuid'
import { BiErrorCircle } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';

export function useSnackBar(options) {
    const { initialPlacement } = options || {initialPlacement: 'top'};
    const [placement, setPlacement] = useState(initialPlacement);
    const [content, setContent] = useState();
    const [background, setBackground] = useState();
    const [width, setWidth] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const showId = useRef();

    function show(content, background, isFullWidth, timeout) {
        setContent(content);
        setBackground(background);
        setWidth(isFullWidth && '100%');
        setIsOpen(true);
        const newId = uuidv1();
        showId.current = newId;
        if(timeout) (() => {
            const associatedId = newId;
            setTimeout(() => associatedId === showId.current && setIsOpen(false), timeout);
        })();
    }

    function sp(placement) {
        setPlacement(placement);
    }

    function hide() {
        setIsOpen(false);
    }

    function showError(title, message, isFullWidth, timeout) {
        show(<ErrorSnackBar title={title} message={message} onClose={hide} />, 'transparent', isFullWidth, timeout);
    }

    return { 
        // Data as props
        placement, content, background, width, isOpen,

        // Controlling methods
        show, hide, showError, setPlacement: sp
    };
}

function ErrorSnackBar({title, message, onClose}) {
    return (
        <ErrorSnackBarWrapper style={{background: 'red'}}>
            {title || <h2><BiErrorCircle/> Error!</h2> }
            <button onClick={onClose} className='btn btn-subtle'> <IoCloseOutline/> Dismiss </button>
            <p>{message}</p>  
        </ErrorSnackBarWrapper>
    );
}

const ErrorSnackBarWrapper = styled.section`
padding: 6px 12px;
display: grid;
grid-template-columns: 1fr auto;

h2 {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

button {
    display: flex;
    align-items: center;
}

.btn-subtle:hover {
    background: #ffffff78;
}

button > svg {
    font-size: 16px;
}

border-radius: 0 0 12px 12px; 
`;

export default function SnackBar({hook}) {
    const { content, isOpen, placement, background, width } = hook;

    const style = {
        [placement]: 0, 
        transform: !isOpen && `translateY(${placement === 'top' ? '-' : ''}100%)` ,
        background,
        width
    };
    console.log(placement);
    console.log(style);
    return (
        <Wrapper style={style}>
            {content}
        </Wrapper>
    );
}

const Wrapper = styled.section`
transition: all ease-out 0.3s;
position: absolute;
`;
