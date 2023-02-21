import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/SignUp.css";
import { useMutation }  from "react-query";
import axios from "axios";
import { useState } from "react";

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,250}$/;

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(
        passwordRegex,
        "Password must have at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
      )
  })
  .required();

function SignUpComponent() {
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
    axios.post('http://localhost:4000/v1/auth/register', data)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  })


  return (
    <div className="signup-page">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <input
          {...register("username")}
          placeholder="Username*"
          onChange={handleInputChange}
        />
        <p role="alert">{errors.username?.message}</p>

        <input
          {...register(
            "password")}
          placeholder="Password*"
          type="password"
          onChange={handleInputChange}
        />
        <p role="alert">{errors.password?.message}</p>

        <Button variant="primary" type="submit">
          Create Account
        </Button>

        <div className="signup-actions">
          <Link to='/login'>Already have an account? Log In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpComponent;