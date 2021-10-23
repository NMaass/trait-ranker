//traits object is tediously formatted for simplicity down the line, could bind ids to the name on render. I found the array to object loading less readable
const initialTraits = {
    traits: {
        'trait-1':{id:'trait-1', content: 'peace'},
        'trait-2':{id:'trait-2', content: 'love'},
        'trait-3':{id:'trait-3', content: 'patience'},
        'trait-4':{id:'trait-4', content: 'joy'},
        'trait-5':{id:'trait-5', content: 'perseverance'},
        'trait-6':{id:'trait-6', content: 'bravery'},
    },
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
