import traits from "../../Assets/listOfAllTraits";
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
            title:'Neutral Value',
            traitIds:traits.slice(0,10),
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
