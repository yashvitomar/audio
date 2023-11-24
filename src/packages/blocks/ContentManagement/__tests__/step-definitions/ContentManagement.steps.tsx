import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import ContentManagement from "../../src/ContentManagement"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ContentManagement"
  }

const feature = loadFeature('./__tests__/features/ContentManagement-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ContentManagement', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ContentManagement; 

        given('I am a User loading ContentManagement', () => {
            exampleBlockA = shallow(<ContentManagement {...screenProps}/>);
        });

        when('I navigate to the ContentManagement', () => {
             instance = exampleBlockA.instance() as ContentManagement
        });

        then('ContentManagement will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
