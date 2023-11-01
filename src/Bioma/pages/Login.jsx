import React from 'react';
import '../styles/Login.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Form, Input, Button, Checkbox, message } from "antd";
import loginImg from '../../assets/login.png';
import BiomaLogo from '../components/BiomaLogo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../hooks/useLoginStore';

import { motion } from 'framer-motion';
const FormItem = Form.Item;


export default function Login() {
const { startLogin, isAuth } = useLoginStore();


    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
      });
    const navigate = useNavigate();
      
      const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
      }

const onSubmit = async () => {
  const result = await startLogin(formValues);
   if(result.tipo == 'Administrador'){
    navigate('/users');
   }else{
    console.log('Login Incorrecto');
   }
   
}

    return (
        <motion.div
        initial={{x: 2000, transition: {duration: .1}}}
        animate={{x: 0}}
        exit={{x: 5, transition: {duration: .1}}}>
       <BiomaLogo style={{width: 280, marginBottom: -100, marginTop: 50}}/>
        <div className={"lContainer"}>
        <div className="lItem">
            <div className="loginImage">
              <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
            </div>
            <div className="loginForm">
              <h2>Login</h2>
                <Form  className="login-form" onSubmitCapture={onSubmit}>
                <FormItem>
                    <br />
                    <Input
                      prefix={<AccountCircleIcon style={{ color: "rgba(0,0,0,.25)" }} />}
                      placeholder="Username"
                      value={formValues.email}
                      onChange={onInputChanged}
                      name='email'
                    />
                 
                </FormItem>
                <FormItem>
                 
                    <Input
                      prefix={<LockIcon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                      type="password"
                      placeholder="Password"
                      value={formValues.password}
                      onChange={onInputChanged}
                      name='password'
                    />
                
                </FormItem>
                <FormItem>
                 
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{background: 'green'}}
                  >
                    Iniciar Sesión
                  </Button>
                </FormItem>
              </Form>
            </div>
        </div>
        {/* <div className="footer">
          <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">Powered by React</a>
        </div> */}
        </div>
        </motion.div>
      );
    }


  



 
    
