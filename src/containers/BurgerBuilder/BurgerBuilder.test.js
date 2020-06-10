import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildContols//BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />);
    });

    it('should have <BuildControls> element when there is ingredients', () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});