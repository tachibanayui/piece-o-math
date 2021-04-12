import styled from 'styled-components'
import AccountBadge from '../components/AccountBadge'
import NumberField from '../components/NumberField'
import {Link} from 'react-router-dom'

export default function MainMenu() {
    return (
        <Wrapper>
            <div className='top-bar transition'>
                <Link to='/about'>About</Link>
                <AccountBadge/>
            </div>

            <div className='title transition'>
                <h1 className='transition transition-phase-2'>Piece-o-Math</h1>
                <h2 className='transition transition-phase-2'>Show your calculation mastery!</h2>
                <Link to='/game/sp/options' className='btn btn-p2-filled transition transition-phase-3'>Singleplayer</Link>
                <Link className='btn btn-gra-p2-s2-filled btn-mp transition transition-phase-4'>Multiplayer</Link>
            </div>
            
        </Wrapper>
    );
}

const Wrapper = styled.section`
width: 100vw;
height: 100vh;
display: grid;
grid-template-rows: auto 1fr;
color: var(--clr-text);

div.top-bar {
    margin-left: auto;  
}

div.title {
    justify-self: center;
    align-self: center;
    background-color: #00000046;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--clr-primary-1);
}

div.title > .btn {
    display: block;
    width: 600px;
    font-size: 24px;
    margin: 12px;
    text-align: center;
    text-decoration: none;
}

h1 {
    font-size: 50px;
    text-align: center;
    margin-bottom: 4px;
}

h2 {
    font-weight: normal;
    text-align: center;
    color: var(--clr-text-subheading);
}


.btn:hover {
    transform: scale(1.2);
}

.transition {
    opacity: 0;
    animation: fade-in 0.3s ease-in forwards;
}

.transition-phase-2 { animation-delay: 0.4s }
.transition-phase-3 { animation-delay: 0.8s }
.transition-phase-4 { animation-delay: 1.2s }

`;