import traits from "../../Assets/listOfAllTraits";
const initialTraits = {
    traits,
    columns:{
        'column1':{
            id: 'column1',
            title:'dislikes',
            traitIds:[],
        },
        'column2':{
            id: 'column2',
            title:'traits',
            traitIds:traits,
        },
        'column3':{
            id: 'column3',
            title:'likes',
            traitIds:[],
        },
    },
    columnOrder: ['column1','column2','column3'],
};
export default initialTraits;
