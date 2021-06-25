import React from 'react';
import ReactDOM from 'react-dom';
import Game from '../components/Game'


const game = {
    name:'aaa',
    imgUrl:'https://www.google.com.ar/',
    genres:['genre1']
}

it('render without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Game game={game}/>, div);
})