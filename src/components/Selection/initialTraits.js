import traits from "../../Assets/listOfAllTraits";
import listOfAllTraits from "../../Assets/listOfAllTraits";
import shuffle from "../../Assets/ShuffleUtil";
const initialTraits = {
    traits,
    columns:{
        'column1':{
            id: 'column1',
            title:'Not Valued',
            traitIds:[],
        },
        'column2':{
            id: 'column2',
            title:'Traits',
            traitIds:shuffle(listOfAllTraits),
        },
        'column3':{
            id: 'column3',
            title:'Valued',
            traitIds:[],
        },
    },
    columnOrder: ['column1','column2','column3'],
};
export default initialTraits;
