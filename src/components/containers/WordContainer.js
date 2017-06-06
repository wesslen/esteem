/*

Copyright 2017 Pacific Northwest National Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.

*/


import {connect} from 'react-redux';

import {selectWord, unselectWord, removeWord} from '../../actions';

import WordComponent from '../presenters/WordComponent.js';

export default connect(
  ({wordList, regions, selection}, {word}) => ({
    id: word,
    word: wordList.getIn([word, 'word']),
    region: wordList.getIn([word, 'region']),
    color: regions.getIn([wordList.getIn([word, 'region']), 'color']),
    isLoaded: wordList.hasIn([word, 'neighbors']),
    isSelected: selection.has(word)
  }),
  dispatch => ({
    onSelect: (word, isSelected) =>
      dispatch(isSelected ? unselectWord(word) : selectWord(word)),
    onRemove: word =>
      dispatch(removeWord(word))
  })
)(WordComponent);