//traits object is tediously formatted for simplicity down the line, could bind ids to the name on render. I found the array to object loading less readable
const initialTraits = {
    traits: {
        'peace':{id:'peace', content: 'peace'},
        'love':{id:'love', content: 'love'},
        'patience':{id:'patience', content: 'patience'},
        'joy':{id:'joy', content: 'joy'},
        'perseverance':{id:'perseverance', content: 'perseverance'},
        'bravery':{id:'bravery', content: 'bravery'},
    },
    columns:{
        'column1':{
            id: 'dislikes',
            title:'dislikes',
            traitIds:[],
        },
        'column2':{
            id: 'traits',
            title:'traits',
            traitIds:['peace', 'love', 'patience', 'joy', 'perseverance'],
        },
        'column3':{
            id: 'likes',
            title:'likes',
            traitIds:[],
        },
    },
    columnOrder: ['column1','column2','column3'],
};
export default initialTraits;
