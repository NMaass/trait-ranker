import traits from "../../Assets/listOfAllTraits"

const likedTraits = {
    traits,
    columns:{
        'column1':{
            id: 'column1',
            title:'Likes',
            traitIds:[],
        },
        'column2':{
            id: 'column2',
            title:'Loves',
            traitIds:[],
        },
    },
    columnOrder: ['column1','column2'],
};
export default likedTraits;
