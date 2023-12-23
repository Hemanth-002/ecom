import React, { useState } from "react";
import styled from "styled-components";
import ModalComponent from "./Modal";
import ButtonPrimary from "./ButtonPrimary";
import { CardTitle } from "./FeatureCard";
import Input from "./Input";
import useForm from "../hooks/useForm";
import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION } from "../graphql/queries/signIn";
import { QUERY_USER } from "../graphql/queries/user";

const Form = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Redirect = styled.a`
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  margin: 0;
`;

const LoginForm = ({ onChange, setOpen }) => {
  const { inputs, handleChange } = useForm();
  const [signInerror, setsignInerror] = useState("");
  const [login, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      ...inputs,
    },
    refetchQueries: [{ query: QUERY_USER }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login();
    if (response?.data?.authenticateUserWithPassword?.message) {
      setsignInerror(response?.data?.authenticateUserWithPassword?.message);
      return;
    }
    setOpen((prev) => !prev);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CardTitle>Login</CardTitle>
        <Input
          name="email"
          title="Email"
          required
          placeHolder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          title="Password"
          type="password"
          required
          value={inputs.password}
          placeHolder="Password"
          onChange={handleChange}
        />
        {signInerror?.length ? <Error>{signInerror}</Error> : null}
        <ButtonPrimary text={"Login"} type="submit" />
        <Redirect onClick={() => onChange(!true)}>
          NewUser click here to Signup
        </Redirect>
      </Form>
    </>
  );
};

const SignUp = ({ onChange, setOpen }) => {
  const { inputs, handleChange } = useForm();
  const [signUpError, setsignUpError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CardTitle>Sign Up</CardTitle>
        <Input
          name="name"
          title="Name"
          required
          placeHolder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          title="Email"
          required
          placeHolder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          title="Password"
          type="password"
          required
          placeHolder="Password"
          value={inputs.password}
          onChange={handleChange}
        />
        {signUpError?.length ? <Error>{signUpError}</Error> : null}
        <ButtonPrimary text={"SignUp"} type="submit" />
        <Redirect onClick={() => onChange(!false)}>
          Existing User Login Here
        </Redirect>
      </Form>
    </>
  );
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);

  const form = login ? (
    <LoginForm onChange={setLogin} setOpen={setOpen} />
  ) : (
    <SignUp onChange={setLogin} setOpen={setOpen} />
  );

  return (
    <div>
      <div onClick={() => setOpen(true)}>SignIn</div>
      {open && <ModalComponent form={form} />}
    </div>
  );
};

export default Login;