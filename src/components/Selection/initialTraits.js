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
            traitIds:['trait-1', 'trait-2', 'trait-3', 'trait-4', 'trait-5','trait-6',],
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
