import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import MultipleStepRegistrationForm2 from "../../src/MultipleStepRegistrationForm2"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "MultipleStepRegistrationForm2"
  }

const feature = loadFeature('./__tests__/features/MultipleStepRegistrationForm2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to MultipleStepRegistrationForm2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:MultipleStepRegistrationForm2; 

        given('I am a User loading MultipleStepRegistrationForm2', () => {
            exampleBlockA = shallow(<MultipleStepRegistrationForm2 {...screenProps}/>);
        });

        when('I navigate to the MultipleStepRegistrationForm2', () => {
             instance = exampleBlockA.instance() as MultipleStepRegistrationForm2
        });

        then('MultipleStepRegistrationForm2 will load with out errors', () => {
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
