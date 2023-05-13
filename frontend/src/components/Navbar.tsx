import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar, HStack, VStack, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/Auth/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootStateType } from '../redux/store';

interface NavLink { name: string; path: string }

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((store:RootStateType)=>store.AuthReducer.isAuth);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({ image: 'fdf', name: 'ritik' })
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Workout', path: '/workout' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Community', path: '/community' }
  ];

  if(!isAuth)navLinks.push({name:'Login', path:'/login'});

  const toggleMenu = () => { setIsOpen(!isOpen) };

  interface User { name: string };
  const user: User = { name: 'logout' };

  const handleLogout = () => {
    (dispatch as ThunkDispatch<any, any, AnyAction>)(setLogout(user));
  };

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">Zen Active</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
              {isAuth && <Flex alignItems="center">
                <Menu><MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    <Avatar size="sm" src={userData?.image} />
                    <VStack
                      display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                      <Text fontSize="large" color="gray.600">{userData?.name}</Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}><FiChevronDown /></Box>
                  </HStack>
                </MenuButton>
                  <MenuList bg={'white'} borderColor={'gray.200'}>
                    <MenuItem onClick={()=>{navigate('/profile')}}>Profile</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Rest of the navigation links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white block hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
