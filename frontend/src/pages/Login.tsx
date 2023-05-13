import { useState, FormEvent } from 'react';
import { Input, Button, Heading, Stack, FormControl, FormLabel, Flex, Checkbox, Image, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from "../redux/Auth/actions";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootStateType } from '../redux/store';

export const Login = () => {
  const isAuth = useSelector((store:RootStateType)=>store.AuthReducer.isAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const dispatch = useDispatch();
  const comingFrom = location.state?.from?.pathname || "/";

  interface User { email: string; password: string }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>, user: User = { email, password }) => {
    e.preventDefault();
    try {
      const userType = user?.email?.includes('admin') ? 'admins' : 'users';
      const res = await (dispatch as ThunkDispatch<any, any, AnyAction>)(setLogin(user));
      console.log('res', res);
      navigate(userType === 'admins' ? '/admin' : comingFrom, { replace: true });
    } catch (err:any){
      console.log('err',err.response.data.msg)
      alert(err.response.data.msg);
    }
  };

  if (isAuth) return <Navigate to='/' />;

  return (
    <div className="login-page" style={{ color: 'black' }}>
      <Stack minH={'10vh'} marginTop='30px' direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'} flexDirection={['column', 'column', 'column', null]}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <form onSubmit={handleSubmit} >
              <FormControl id="email" color={'black'} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="email" isInvalid errorBorderColor='black' value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="password" isInvalid errorBorderColor='black' value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement h={'full'} >
                    <Text variant={'white'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Text>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox isInvalid >Remember me</Checkbox>
                  <Link to='#' color={'blue.500'}>Forgot password?</Link>
                </Stack>
                <Button type="submit" colorScheme={'blue'} variant={'solid'}>
                  Sign in
                </Button>
              </Stack>
              <Stack pt={4}>
                <Flex justifyContent='center' align={'center'}>New to Zen Active?
                <Text color='blue.400'><Link to="/signup">&nbsp;Sign Up</Link></Text >
                </Flex>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image width={'90%'} height='450px' alt={'Login Image'} objectFit={'cover'}
            src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
          />
        </Flex>
      </Stack>
    </div>
  );
};