import styled from 'styled-components'
import { AiOutlineLineChart } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GiExitDoor } from 'react-icons/gi';
import AccountBadge from '../components/AccountBadge';
import MathOptions from '../components/MathOptions';
import OverlayAnim, { useOverlayAnim } from '../components/OverlayAnim';
import SnackBar, { useSnackBar } from '../components/SnackBar';
import { useGameOptionsContext } from '../contexts/GameOptionsContext';
import { BiErrorCircle } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
 
export default function SinglePlayerOptions() {
    const { mathOptions } = useGameOptionsContext();
    const options = useOverlayAnim({ origin: {bottom: 50, right: 50}, radius: 0, background: 'var(--clr-primary-1)', interval: 'ease-out 0.8s', intialProgress: 0 });
    const snackBar = useSnackBar();
    const { push } = useHistory();

    const { setProgress } = options;

    const handlePlay = (e) => {
        if(!mathOptions.length) {
            snackBar.showError(<><h2><BiErrorCircle/> Error!</h2></>, "Please create at least 1 math option to continue!", true, 12000);
            return;
        }

        setProgress(1);
        setTimeout(() => push('/lmao'), 1500);
    };

    return (
        <Wrapper>
            <div className='header'>
                <Link className='btn btn-destructive btn-back' to='/game'><GiExitDoor/> Quit</Link>
                <h1>Singleplayer</h1>
                <div className='acct'> 
                    <AccountBadge/>
                </div>
            </div>
            <div className='panel stats'>
                <AiOutlineLineChart/> 
                <h1>Loading statistics...</h1>
            </div>
            <div className='panel quiz-content'>
                <MathOptions/>
            </div>
            <div className='panel mods'>
                <BsGearFill/>
                <h1> Mods </h1>
                <p>(Not available)</p>

            </div>
            <div className='panel actions'>
                <button className='btn btn-gra-p2-s2-filled btn-play' onClick={handlePlay}>Let's rock!</button>
            </div>

            <SnackBar hook={snackBar} />
            <div className='overlay'>
                <OverlayAnim hook={{...options}}/>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
background: #46464646;
display: grid;
grid-template-rows: auto 1fr 150px auto;
grid-template-columns: 2fr 1.25fr;
width: 100vw;
height: 100vh;
overflow: hidden;
padding: 8px;
color: var(--clr-text);
gap: 10px;
position: absolute;

grid-template-areas: "header header"
                     "quiz-content stats"
                     "quiz-content mods"
                     "quiz-content actions";

> .header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 10px 24px;

    animation: 600ms topSlideIn;
}

> .header > .acct { margin-left: auto; }

.panel {
    background: #46464646;
    border-radius: 24px;
}

.btn-back {
    text-decoration: none;
    margin-right: 24px;
}

.btn-back > svg {
    margin-right: 8px;
}

.stats {
    grid-area: stats;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    border: 4px dashed var(--clr-text);
    animation: 600ms forwards ease-out rightSlideIn;
    animation-delay: 200ms;
}

.stats svg {
    font-size: 50px;
    animation: breathing 2s infinite;
}

.quiz-content {
    grid-area: quiz-content;
    display: grid;
    align-items: stretch;
    justify-content: stretch;

    animation: 600ms ease-out leftSlideIn;
}

.mods {
    grid-area: mods;
    padding: 4px;
    display: flex;
    border: 4px dashed var(--clr-text);
    font-size: 24px;
    transform: translateX(100%);
    animation: 600ms forwards ease-out rightSlideIn;
    animation-delay: 300ms;
}

.mods > h1 { margin: 0; padding: 0; display: inline; }

.mods > p {color: var(--clr-text-subheading); margin-top: 10px;}

.mods > svg {
    margin-top: 10px;
    margin-right: 12px; 
    font-size: 32px;
    transition: transform 0.3s;
}

.mods:hover > svg {
    transform: rotate(360deg);
}

.actions {
    grid-area: actions;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 8px;
    animation: 600ms ease-out bottomSlideIn;
}

.btn-play {
    margin-left: auto;
    width: 250px;
    font-size: 24px;
    border-radius: 9px;
    font-weight: 900;
}

.overlay {
    position: absolute;
    pointer-events: none;
}

@keyframes breathing {
    from {
        transform: scale(1);
    }

    20% {
        transform: scale(0.9);
    }

    30% {
        transform: scale(1);
    }

    45% {
        transform: scale(0.9);
    }

    60% {
        transform: scale(2);
    }

    90% {
        transform: scale(0.9);
    }

    to {
        transform: scale(1);
    }
}

@keyframes bg {
    from {
        background: transparent;
    }

    to {
        background: #46464646;
    }
}
`;