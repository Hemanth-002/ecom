import React, { useState } from "react";
import styled from "styled-components";
import ModalComponent from "./Modal";
import ButtonPrimary from "./ButtonPrimary";
import { CardTitle } from "./FeatureCard";
import Input from "./Input";
import useForm from "../hooks/useForm";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutation/login";
import { QUERY_USER } from "../graphql/queries/user";
import { SIGNIN_MUTATION } from "../graphql/mutation/signin.js";
import { REQUEST_RESET } from "../graphql/mutation/reset";
import { useRouter } from "next/router";

export const Form = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const Redirect = styled.a`
  cursor: pointer;
`;

export const Error = styled.p`
  color: red;
  margin: 0;
`;

const LoginForm = ({ onChange, setOpen }) => {
  const { inputs, handleChange } = useForm();
  const router = useRouter();
  const [signInerror, setsignInerror] = useState("");
  const [forgotpassword, setforgotpassword] = useState(false);
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION, {
    variables: {
      ...inputs,
    },
    refetchQueries: [{ query: QUERY_USER }],
  });

  const [reset, { loading: resetLoading }] = useMutation(REQUEST_RESET, {
    variables: {
      email: inputs.email,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (forgotpassword) {
      const res = await reset().catch(console.error);
      if (res?.data?.sendUserPasswordResetLink === true)
        router.push({ pathname: "/reset" });
      setOpen((prev) => !prev);
      return;
    }
    const response = await login();
    if (response?.data?.authenticateUserWithPassword?.message) {
      setsignInerror(response?.data?.authenticateUserWithPassword?.message);
      return;
    }
    setOpen((prev) => !prev);
  };

  if (loading || resetLoading) return <p>Loading...</p>;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {!forgotpassword ? (
          <>
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
            <Redirect onClick={() => setforgotpassword(true)}>
              Forgot Password ??
            </Redirect>
            <Redirect onClick={() => onChange(!true)}>
              NewUser click here to Signup
            </Redirect>
          </>
        ) : (
          <>
            <CardTitle>Request Password Reset</CardTitle>

            <Input
              name="email"
              title="Email"
              required
              placeHolder="Email"
              value={inputs.email}
              onChange={handleChange}
            />
            <ButtonPrimary text={"Reset Password"} type="submit" />
            <Redirect onClick={() => setforgotpassword(false)}>
              Go back to login page
            </Redirect>
          </>
        )}
      </Form>
    </>
  );
};

const SignUp = ({ onChange, setOpen }) => {
  const { inputs, handleChange } = useForm();
  const [signUpError, setsignUpError] = useState("");
  const [login, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      data: inputs,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login();
    } catch (e) {
      setsignUpError(error?.message);
      return;
    }
    alert(`Signed Up for ${inputs.email} go ahead and login`);
    onChange(!false);
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
          type="email"
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
