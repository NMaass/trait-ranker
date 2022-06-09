import traits from "../../utils/listOfAllTraits";
import listOfAllTraits from "../../utils/listOfAllTraits";
import shuffle from "../../utils/ShuffleUtil";
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
        'guessing':{
            id:'guessing',
            title:'guessing',
            traitIds:[],
        }
    },
    columnOrder: ['column1','column2','column3'],
};
export default initialTraits;
