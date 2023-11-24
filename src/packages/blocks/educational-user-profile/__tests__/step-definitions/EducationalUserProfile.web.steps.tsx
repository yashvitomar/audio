import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import EducationalUserProfile from "../../src/EducationalUserProfile.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "EducationalUserProfile"
  }

const feature = loadFeature('./__tests__/features/EducationalUserProfile-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to EducationalUserProfile', ({ given, when, then }) => {
        let educationalUserProfileBlock:ShallowWrapper;
        let instance:EducationalUserProfile; 

        given('I am a User loading EducationalUserProfile', () => {
            educationalUserProfileBlock = shallow(<EducationalUserProfile {...screenProps}/>);
        });

        when('I navigate to the EducationalUserProfile', () => {
             instance = educationalUserProfileBlock.instance() as EducationalUserProfile
        });

        then('EducationalUserProfile will load with out errors', () => {
            expect(educationalUserProfileBlock).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(educationalUserProfileBlock).toBeTruthy();
        });
    });


});
