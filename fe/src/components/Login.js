import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import "../styles/LoginComponent.css";
import { useState } from "react";
import { useMutation }  from "react-query";
import axios from "axios";


const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,250}$/;

const schema = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(passwordRegex, "password is incorrect"),
});

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({username: '', password: ''})
  const onSubmit = (data) => {
    setData({username: '', password: ''})
    mutation.mutate(data)
  }

  const handleInputChange =(event) =>{
    setData({...data, [event.target.name] : event.target.value})
  }
  const mutation = useMutation((data) => {
    axios.post('http://localhost:4000/v1/auth/login', data)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  })


  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <input
          {...register("username")}
          placeholder="Username*"
          onChange={handleInputChange}
        />

        <p>{errors.email?.message}</p>
        <input
          {...register("password")}
          placeholder="Password*"
          type="password"
          onChange={handleInputChange}
        />

        <p>{errors.password?.message}</p>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        <div className="login-actions">
          <Link to="/signup">Don&#x27;t have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;