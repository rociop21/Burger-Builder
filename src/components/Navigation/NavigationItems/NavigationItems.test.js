import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem';
import { exportAllDeclaration } from '@babel/types';

configure({adapter: new Adapter});

describe('NavigationItems', () => {
    it('render two NavigationItems if not auth', () => {
        const wrapper = shallow(<NavigationItems isAuth={false} />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});