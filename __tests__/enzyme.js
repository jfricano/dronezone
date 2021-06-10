import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Adapt to a particular version of React
configure({ adapter: new Adapter() });

import App from '../client/components/App';
import Display from '../client/components/Display';
import DisplayModal from '../client/components/DisplayModal';
import Header from '../client/components/Header';
import Login from '../client/components/Login';
import {
  useDisclosure,
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react';

describe('React unit tests', () => {
  let wrapper;

  describe('App', () => {
    it("renders", () => {
      shallow(<App />);
    })
  });

  describe('Display', () => {
    beforeAll(() => {
      wrapper = shallow(<Display />)
    });
    it("renders", () => {
      shallow(<Display />);
    });
    it("displays the job applications table", () => {
      expect(wrapper.find(Table).exists()).toEqual(true);
    });
    it("should have a table head", () => {
      expect(wrapper.find(Thead).exists()).toEqual(true);
    });
    it("should have a table body", () => {
      expect(wrapper.find(Tbody).exists()).toEqual(true);
    });
  });

  describe('Header', () => {
    beforeAll(() => {
      wrapper = shallow(<Header />)
    });
    it("renders", () => {
      shallow(<Header />)
    });
    it("should have a menu button", () => {
      expect(wrapper.find('MenuButton').exists()).toEqual(true);
    });
    it("should have a menu list", () => {
      expect(wrapper.find('MenuList').exists()).toEqual(true);
    });
    it("should have an option to add an application as the first menu item", () => {
      expect(wrapper.find('MenuItem').first().text()).toMatch(/add/i);
    });
    it("should have an option to log out as the last menu item", () => {
      expect(wrapper.find('MenuItem').last().text()).toMatch(/[log|sign]*out/i);
    });
  });
});