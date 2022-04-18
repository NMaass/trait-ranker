const likedTraits = {
    traits: {
        'trait-1':{id:'trait-1', content: 'Peace'},
        'trait-2':{id:'trait-2', content: 'Love'},
        'trait-3':{id:'trait-3', content: 'Patience'},
        'trait-4':{id:'trait-4', content: 'Joy'},
        'trait-5':{id:'trait-5', content: 'Perseverance'},
        'trait-6':{id:'trait-6', content: 'Bravery'},
    },
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
