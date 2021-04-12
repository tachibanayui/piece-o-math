import { TiSortNumerically } from 'react-icons/ti'
import IntegerOperation, { getDefaultState as intOpState } from '../components/IntegerOperation';

const types = [
    {
        id: 1,
        name: 'Integer Operation',
        icon: <TiSortNumerically />,
        summary: "Calculate integer math equations (+, -, *, /)",
        desc: <> <strong>Note: </strong> division will be rounded down </>,
        defaultState: intOpState,
        optionUI: IntegerOperation
    }
];

export default types;